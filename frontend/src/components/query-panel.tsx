"use client";

import { useState, useCallback } from "react";
import type { QueryResponse, ComparisonResponse } from "@/types/graph";

interface QueryPanelProps {
  onQueryResult?: (result: QueryResponse) => void;
  onComparisonResult?: (result: ComparisonResponse) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  apiConnected: boolean;
}

const SEARCH_MODES = [
  {
    value: "hybrid",
    label: "Hybrid",
    description: "Graph + Vector (recommended)",
  },
  { value: "local", label: "Local", description: "Entity-focused search" },
  { value: "global", label: "Global", description: "Community summaries" },
  { value: "naive", label: "Naive", description: "Vector-only (baseline)" },
] as const;

const EXAMPLE_QUERIES = [
  "How does GraphRAG reduce hallucinations in enterprise AI?",
  "What role do knowledge graphs play in vaccine safety monitoring?",
  "How does the EU AI Act affect AI deployment in healthcare?",
  "Compare vector RAG and GraphRAG retrieval approaches",
  "What is the Leiden algorithm used for in GraphRAG?",
];

export default function QueryPanel({
  onQueryResult,
  onComparisonResult,
  isLoading,
  setIsLoading,
  apiConnected,
}: QueryPanelProps) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("hybrid");
  const [compareMode, setCompareMode] = useState(false);

  const handleQuery = useCallback(async () => {
    if (!query.trim() || isLoading || !apiConnected) return;
    setIsLoading(true);

    try {
      const apiBase =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
      const endpoint = compareMode ? "/compare" : "/query";
      const response = await fetch(`${apiBase}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), mode }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      if (compareMode) {
        onComparisonResult?.(data as ComparisonResponse);
      } else {
        onQueryResult?.(data as QueryResponse);
      }
    } catch (error) {
      console.error("Query failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    query,
    mode,
    compareMode,
    isLoading,
    apiConnected,
    setIsLoading,
    onQueryResult,
    onComparisonResult,
  ]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleQuery();
      }
    },
    [handleQuery],
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Search modes */}
      <div className="flex gap-1.5">
        {SEARCH_MODES.map((searchMode) => (
          <button
            key={searchMode.value}
            type="button"
            onClick={() => setMode(searchMode.value)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === searchMode.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
            title={searchMode.description}
          >
            {searchMode.label}
          </button>
        ))}
        <div className="mx-1 h-auto w-px bg-border" />
        <button
          type="button"
          onClick={() => setCompareMode(!compareMode)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
            compareMode
              ? "bg-[#f59e0b] text-[#09090b] ring-1 ring-[#f59e0b]/50"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {compareMode ? "Compare ON" : "Compare"}
        </button>
      </div>

      {/* Query input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            apiConnected
              ? "Ask a question about the knowledge graph..."
              : "Backend not connected — viewing demo data"
          }
          disabled={!apiConnected}
          className="flex-1 rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
        />
        <button
          type="button"
          onClick={handleQuery}
          disabled={!query.trim() || isLoading || !apiConnected}
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? "..." : "Query"}
        </button>
      </div>

      {/* Example queries */}
      {!query && (
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] text-muted-foreground self-center mr-1">
            Try:
          </span>
          {EXAMPLE_QUERIES.map((exampleQuery) => (
            <button
              key={exampleQuery}
              type="button"
              onClick={() => setQuery(exampleQuery)}
              className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {exampleQuery.length > 50
                ? exampleQuery.slice(0, 50) + "..."
                : exampleQuery}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
