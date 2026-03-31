import type {
  QueryResponse,
  ComparisonResponse,
  GraphData,
  HealthResponse,
} from "@/types/graph";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API error ${response.status}: ${errorBody}`);
  }

  return response.json() as Promise<T>;
}

export async function queryGraph(
  query: string,
  mode: string = "hybrid",
): Promise<QueryResponse> {
  return fetchApi<QueryResponse>("/query", {
    method: "POST",
    body: JSON.stringify({ query, mode, include_graph: true }),
  });
}

export async function compareRag(query: string): Promise<ComparisonResponse> {
  return fetchApi<ComparisonResponse>("/compare", {
    method: "POST",
    body: JSON.stringify({ query, mode: "hybrid" }),
  });
}

export async function getFullGraph(): Promise<GraphData> {
  return fetchApi<GraphData>("/graph");
}

export async function getHealth(): Promise<HealthResponse> {
  return fetchApi<HealthResponse>("/health");
}

export async function ingestCorpus(): Promise<unknown> {
  return fetchApi("/ingest-corpus", { method: "POST" });
}
