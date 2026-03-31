from pydantic import BaseModel, Field


class QueryRequest(BaseModel):
    """Request schema for querying the knowledge graph."""

    query: str = Field(..., min_length=1, max_length=2000)
    mode: str = Field(default="hybrid")
    include_graph: bool = Field(default=True)


class Citation(BaseModel):
    """A single citation linking an answer segment to its source."""

    source_document: str
    chunk_text: str
    entity_chain: list[str] = Field(default_factory=list)
    relevance_score: float = 0.0


class GraphNode(BaseModel):
    """A node in the knowledge graph."""

    id: str
    label: str
    type: str = "entity"
    description: str = ""
    source_document: str = ""
    highlighted: bool = False


class GraphEdge(BaseModel):
    """An edge in the knowledge graph."""

    source: str
    target: str
    label: str = ""
    weight: float = 1.0
    highlighted: bool = False


class GraphData(BaseModel):
    """Full knowledge graph data for visualization."""

    nodes: list[GraphNode] = Field(default_factory=list)
    edges: list[GraphEdge] = Field(default_factory=list)


class QueryResponse(BaseModel):
    """Response schema for a GraphRAG query."""

    answer: str
    mode: str
    citations: list[Citation] = Field(default_factory=list)
    graph: GraphData | None = None
    entity_count: int = 0
    relationship_count: int = 0


class ComparisonResponse(BaseModel):
    """Side-by-side comparison of naive RAG vs GraphRAG."""

    query: str
    naive_answer: str
    graphrag_answer: str
    graph: GraphData | None = None


class IngestRequest(BaseModel):
    """Request to ingest a document into the knowledge graph."""

    content: str = Field(..., min_length=1)
    filename: str


class IngestResponse(BaseModel):
    """Response after document ingestion."""

    filename: str
    status: str = "indexed"


class HealthResponse(BaseModel):
    """Health check response."""

    status: str = "ok"
    documents_indexed: int = 0
    total_entities: int = 0
    total_relationships: int = 0
