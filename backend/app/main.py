from contextlib import asynccontextmanager
from collections.abc import AsyncGenerator

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.graphrag import engine
from app.models import (
    ComparisonResponse,
    GraphData,
    HealthResponse,
    IngestRequest,
    IngestResponse,
    QueryRequest,
    QueryResponse,
)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Lazy initialization — engine initializes on first use."""
    yield


app = FastAPI(
    title="TraceGraph API",
    description="GraphRAG Citation Explorer — traceable AI with knowledge graph provenance",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Return service health and graph statistics."""
    health = await engine.get_health()
    return HealthResponse(**health)


@app.post("/query", response_model=QueryResponse)
async def query_graph(request: QueryRequest) -> QueryResponse:
    """Query the knowledge graph with citation tracing."""
    try:
        return await engine.query(request.query, request.mode)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.post("/compare", response_model=ComparisonResponse)
async def compare_rag(request: QueryRequest) -> ComparisonResponse:
    """Compare naive RAG vs GraphRAG side-by-side."""
    try:
        return await engine.compare(request.query)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/graph", response_model=GraphData)
async def get_full_graph() -> GraphData:
    """Return the complete knowledge graph for visualization."""
    return await engine._get_graph_data()


@app.post("/ingest", response_model=IngestResponse)
async def ingest_document(request: IngestRequest) -> IngestResponse:
    """Ingest a single document into the knowledge graph."""
    try:
        result = await engine.ingest_document(request.content, request.filename)
        return IngestResponse(**result)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.post("/ingest-corpus", response_model=list[IngestResponse])
async def ingest_corpus() -> list[IngestResponse]:
    """Ingest all .txt files from the corpus directory."""
    try:
        results = await engine.ingest_corpus(settings.corpus_dir)
        return [IngestResponse(**r) for r in results]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
