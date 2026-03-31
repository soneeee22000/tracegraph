# TraceGraph — GraphRAG Citation Explorer

Interactive knowledge graph visualization with citation-grounded AI.
Trace every answer back to its source through the knowledge graph.

## What it does

TraceGraph demonstrates how GraphRAG (Graph-based Retrieval Augmented Generation) improves upon traditional vector RAG by:

1. **Building a knowledge graph** from documents — extracting entities and relationships
2. **Querying with graph traversal** — following entity chains instead of just vector similarity
3. **Visualizing citation trails** — showing exactly which entities and relationships contributed to each answer
4. **Comparing RAG vs GraphRAG** — side-by-side answers from naive vector search vs graph-enhanced retrieval

## Architecture

```
┌─────────────────┐     ┌──────────────────────┐
│  Next.js 16     │────>│  FastAPI Backend      │
│  + Force Graph  │<────│  + LightRAG Engine    │
│  Visualization  │     │  + Knowledge Graph    │
└─────────────────┘     └──────────────────────┘
     :3000                    :8000
```

**Backend:** Python 3.11, FastAPI, LightRAG (entity extraction + graph construction + hybrid retrieval)
**Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, react-force-graph-2d

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 20+
- OpenAI API key (for embeddings)
- Anthropic or OpenAI API key (for LLM)

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your API keys

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Then ingest the corpus:

```bash
curl -X POST http://localhost:8000/ingest-corpus
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

### Docker

```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your API keys

docker compose up
```

## Corpus

The `backend/corpus/` directory contains 12 documents covering:

- GraphRAG architecture and retrieval patterns
- Knowledge graphs in healthcare decision support
- Vaccine safety monitoring and pharmacovigilance
- Entity extraction and NLP pipelines
- Citation-grounded AI and traceability
- EU AI Act compliance requirements
- Clinical trial analysis with AI

## API Endpoints

| Method | Path             | Description                              |
| ------ | ---------------- | ---------------------------------------- |
| GET    | `/health`        | Service health + graph stats             |
| GET    | `/graph`         | Full knowledge graph (for visualization) |
| POST   | `/query`         | Query with citation tracing              |
| POST   | `/compare`       | Naive RAG vs GraphRAG side-by-side       |
| POST   | `/ingest`        | Ingest a single document                 |
| POST   | `/ingest-corpus` | Ingest all corpus/\*.txt files           |

## Demo Mode

The frontend includes sample graph data and works without a backend connection (Demo Mode). Connect the backend for full query capabilities.
