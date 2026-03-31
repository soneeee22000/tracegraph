import asyncio
import json
import os
from pathlib import Path
from typing import Any

from lightrag import LightRAG, QueryParam
from lightrag.llm.openai import openai_complete_if_cache, openai_embed

from app.config import settings
from app.models import (
    Citation,
    ComparisonResponse,
    GraphData,
    GraphEdge,
    GraphNode,
    QueryResponse,
)


class GraphRAGEngine:
    """Wrapper around LightRAG providing query, graph export, and comparison."""

    def __init__(self) -> None:
        self._rag: LightRAG | None = None
        self._initialized = False

    async def initialize(self) -> None:
        """Initialize the LightRAG instance with configured LLM and embeddings."""
        if self._initialized:
            return

        working_dir = settings.working_dir
        os.makedirs(working_dir, exist_ok=True)

        os.environ["OPENAI_API_KEY"] = settings.llm_api_key

        async def llm_func(
            prompt: str, system_prompt: str | None = None, **kwargs: Any
        ) -> str:
            return await openai_complete_if_cache(
                model=settings.llm_model,
                prompt=prompt,
                system_prompt=system_prompt,
                api_key=settings.llm_api_key,
                base_url=settings.llm_api_base,
                **kwargs,
            )

        self._rag = LightRAG(
            working_dir=working_dir,
            llm_model_func=llm_func,
            llm_model_name=settings.llm_model,
            embedding_func=openai_embed,
        )
        await self._rag.initialize_storages()
        self._initialized = True

    async def ingest_document(self, content: str, filename: str) -> dict[str, Any]:
        """Ingest a single document into the knowledge graph."""
        if not self._rag:
            await self.initialize()

        tagged_content = f"[Source: {filename}]\n\n{content}"
        await self._rag.ainsert(tagged_content)

        return {"filename": filename, "status": "indexed"}

    async def ingest_corpus(self, corpus_dir: str) -> list[dict[str, Any]]:
        """Ingest all .txt files from the corpus directory."""
        results = []
        corpus_path = Path(corpus_dir)

        if not corpus_path.exists():
            return results

        for txt_file in sorted(corpus_path.glob("*.txt")):
            content = txt_file.read_text(encoding="utf-8")
            if content.strip():
                result = await self.ingest_document(content, txt_file.name)
                results.append(result)

        return results

    async def query(self, query_text: str, mode: str = "hybrid") -> QueryResponse:
        """Query the knowledge graph and return structured response."""
        if not self._rag:
            await self.initialize()

        mode_map = {
            "naive": "naive",
            "local": "local",
            "global": "global",
            "hybrid": "hybrid",
        }
        search_mode = mode_map.get(mode, "hybrid")

        answer = await self._rag.aquery(
            query_text,
            param=QueryParam(mode=search_mode),
        )

        graph_data = await self._get_graph_data()
        citations = self._extract_citations(answer, graph_data)

        return QueryResponse(
            answer=answer,
            mode=mode,
            citations=citations,
            graph=graph_data,
            entity_count=len(graph_data.nodes),
            relationship_count=len(graph_data.edges),
        )

    async def compare(self, query_text: str) -> ComparisonResponse:
        """Run both naive and hybrid queries for side-by-side comparison."""
        if not self._rag:
            await self.initialize()

        naive_task = self._rag.aquery(
            query_text, param=QueryParam(mode="naive")
        )
        hybrid_task = self._rag.aquery(
            query_text, param=QueryParam(mode="hybrid")
        )

        naive_answer, hybrid_answer = await asyncio.gather(naive_task, hybrid_task)
        graph_data = await self._get_graph_data()

        return ComparisonResponse(
            query=query_text,
            naive_answer=naive_answer,
            graphrag_answer=hybrid_answer,
            graph=graph_data,
        )

    async def _get_graph_data(self) -> GraphData:
        """Extract the full knowledge graph for visualization."""
        if not self._rag:
            return await self._get_graph_from_storage()

        nodes: list[GraphNode] = []
        edges: list[GraphEdge] = []

        try:
            graph_storage = self._rag.chunk_entity_relation_graph
            if hasattr(graph_storage, "_graph"):
                nx_graph = graph_storage._graph
            elif hasattr(graph_storage, "graph"):
                nx_graph = graph_storage.graph
            else:
                return await self._get_graph_from_storage()

            for node_id, node_data in nx_graph.nodes(data=True):
                nodes.append(
                    GraphNode(
                        id=str(node_id),
                        label=str(node_data.get("entity_name", node_id)),
                        type=str(node_data.get("entity_type", "entity")).lower(),
                        description=str(node_data.get("description", "")),
                        source_document=str(node_data.get("source_id", "")),
                    )
                )

            for source, target, edge_data in nx_graph.edges(data=True):
                edges.append(
                    GraphEdge(
                        source=str(source),
                        target=str(target),
                        label=str(edge_data.get("description", "")),
                        weight=float(edge_data.get("weight", 1.0)),
                    )
                )

        except Exception:
            return await self._get_graph_from_storage()

        return GraphData(nodes=nodes, edges=edges)

    async def _get_graph_from_storage(self) -> GraphData:
        """Fallback: read graph data from LightRAG's JSON storage files."""
        nodes: list[GraphNode] = []
        edges: list[GraphEdge] = []
        working_dir = Path(settings.working_dir)

        entities_file = working_dir / "graph_chunk_entity_relation.graphml"
        if not entities_file.exists():
            kv_entities = working_dir / "kv_store_full_docs.json"
            kv_relations = working_dir / "kv_store_text_chunks.json"

            if kv_entities.exists():
                try:
                    data = json.loads(kv_entities.read_text(encoding="utf-8"))
                    for key, val in data.items():
                        nodes.append(
                            GraphNode(
                                id=key,
                                label=key[:50],
                                type="document",
                                description=str(val)[:200] if val else "",
                            )
                        )
                except (json.JSONDecodeError, KeyError):
                    pass

            return GraphData(nodes=nodes, edges=edges)

        try:
            import networkx as nx

            nx_graph = nx.read_graphml(str(entities_file))

            for node_id, node_data in nx_graph.nodes(data=True):
                nodes.append(
                    GraphNode(
                        id=str(node_id),
                        label=str(node_data.get("entity_name", node_id)),
                        type=str(node_data.get("entity_type", "entity")).lower(),
                        description=str(node_data.get("description", "")),
                        source_document=str(node_data.get("source_id", "")),
                    )
                )

            for source, target, edge_data in nx_graph.edges(data=True):
                edges.append(
                    GraphEdge(
                        source=str(source),
                        target=str(target),
                        label=str(edge_data.get("description", "")),
                        weight=float(edge_data.get("weight", 1.0)),
                    )
                )
        except Exception:
            pass

        return GraphData(nodes=nodes, edges=edges)

    def _extract_citations(
        self, answer: str, graph_data: GraphData
    ) -> list[Citation]:
        """Extract citation references from answer by matching entity names."""
        citations: list[Citation] = []
        answer_lower = answer.lower()

        for node in graph_data.nodes:
            if node.label.lower() in answer_lower and len(node.label) > 2:
                connected_entities = []
                for edge in graph_data.edges:
                    if edge.source == node.id:
                        connected_entities.append(edge.target)
                    elif edge.target == node.id:
                        connected_entities.append(edge.source)

                citations.append(
                    Citation(
                        source_document=node.source_document or "knowledge_graph",
                        chunk_text=node.description[:300] if node.description else node.label,
                        entity_chain=[node.label, *connected_entities[:5]],
                        relevance_score=1.0 if node.label.lower() in answer_lower else 0.5,
                    )
                )

        seen = set()
        unique_citations = []
        for citation in citations:
            key = citation.source_document + citation.chunk_text[:50]
            if key not in seen:
                seen.add(key)
                unique_citations.append(citation)

        return unique_citations[:10]

    async def get_health(self) -> dict[str, Any]:
        """Return health status with graph statistics."""
        graph_data = await self._get_graph_data()
        return {
            "status": "ok",
            "documents_indexed": len(
                [n for n in graph_data.nodes if n.type == "document"]
            ),
            "total_entities": len(graph_data.nodes),
            "total_relationships": len(graph_data.edges),
        }


engine = GraphRAGEngine()
