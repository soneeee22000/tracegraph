"use client";

import { useState, useCallback, useEffect } from "react";
import GraphViewer from "@/components/graph-viewer";
import QueryPanel from "@/components/query-panel";
import CitationTrail from "@/components/citation-trail";
import AnswerPanel from "@/components/answer-panel";
import { SAMPLE_GRAPH_DATA } from "@/lib/sample-data";
import type {
  ForceNode,
  ForceGraphData,
  QueryResponse,
  ComparisonResponse,
  Citation,
} from "@/types/graph";

export default function HomePage() {
  const [graphData, setGraphData] = useState<ForceGraphData>(SAMPLE_GRAPH_DATA);
  const [selectedNode, setSelectedNode] = useState<ForceNode | null>(null);
  const [queryResult, setQueryResult] = useState<QueryResponse | null>(null);
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResponse | null>(null);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
    fetch(`${apiBase}/health`)
      .then((response) => {
        if (response.ok) {
          setApiConnected(true);
          return fetch(`${apiBase}/graph`);
        }
        return null;
      })
      .then((response) => response?.json())
      .then((data) => {
        if (data?.nodes?.length > 0) {
          const forceData: ForceGraphData = {
            nodes: data.nodes.map((node: ForceNode) => ({
              ...node,
              val: Math.max(5, (node.label?.length ?? 5) * 0.8),
            })),
            links: data.edges.map(
              (edge: {
                source: string;
                target: string;
                label: string;
                weight: number;
              }) => ({
                source: edge.source,
                target: edge.target,
                label: edge.label,
                weight: edge.weight,
                highlighted: false,
              }),
            ),
          };
          setGraphData(forceData);
        }
      })
      .catch(() => {
        setApiConnected(false);
      });
  }, []);

  const handleNodeSelect = useCallback((node: ForceNode) => {
    setSelectedNode(node);
  }, []);

  const handleQueryResult = useCallback((result: QueryResponse) => {
    setQueryResult(result);
    setComparisonResult(null);
    setCitations(result.citations);

    if (result.graph && result.graph.nodes.length > 0) {
      const forceData: ForceGraphData = {
        nodes: result.graph.nodes.map((node) => ({
          ...node,
          val: Math.max(5, (node.label?.length ?? 5) * 0.8),
        })),
        links: result.graph.edges.map((edge) => ({
          source: edge.source,
          target: edge.target,
          label: edge.label,
          weight: edge.weight,
          highlighted: edge.highlighted,
        })),
      };
      setGraphData(forceData);
    }
  }, []);

  const handleComparisonResult = useCallback((result: ComparisonResponse) => {
    setComparisonResult(result);
    setQueryResult(null);
    setCitations([]);

    if (result.graph && result.graph.nodes.length > 0) {
      const forceData: ForceGraphData = {
        nodes: result.graph.nodes.map((node) => ({
          ...node,
          val: Math.max(5, (node.label?.length ?? 5) * 0.8),
        })),
        links: result.graph.edges.map((edge) => ({
          source: edge.source,
          target: edge.target,
          label: edge.label,
          weight: edge.weight,
          highlighted: edge.highlighted,
        })),
      };
      setGraphData(forceData);
    }
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-primary-foreground"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <circle cx="5" cy="6" r="2" />
              <circle cx="19" cy="6" r="2" />
              <circle cx="5" cy="18" r="2" />
              <circle cx="19" cy="18" r="2" />
              <line x1="9.5" y1="10.5" x2="6.5" y2="7.5" />
              <line x1="14.5" y1="10.5" x2="17.5" y2="7.5" />
              <line x1="9.5" y1="13.5" x2="6.5" y2="16.5" />
              <line x1="14.5" y1="13.5" x2="17.5" y2="16.5" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">
              TraceGraph
            </h1>
            <p className="text-[10px] text-muted-foreground">
              GraphRAG Citation Explorer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div
              className={`h-2 w-2 rounded-full ${
                apiConnected ? "bg-green-500" : "bg-muted-foreground"
              }`}
            />
            <span className="text-[10px] text-muted-foreground">
              {apiConnected ? "API Connected" : "Demo Mode"}
            </span>
          </div>
        </div>
      </header>

      {/* Query bar */}
      <div className="border-b border-border px-6 py-3">
        <QueryPanel
          onQueryResult={handleQueryResult}
          onComparisonResult={handleComparisonResult}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          apiConnected={apiConnected}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Graph visualization */}
        <div className="flex-1 p-3">
          <GraphViewer data={graphData} onNodeSelect={handleNodeSelect} />
        </div>

        {/* Right sidebar */}
        <div className="flex w-96 flex-col border-l border-border">
          <div className="flex-1 overflow-y-auto border-b border-border">
            <div className="px-3 pt-3">
              <h2 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                AI Response
              </h2>
            </div>
            <AnswerPanel
              queryResult={queryResult}
              comparisonResult={comparisonResult}
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="px-3 pt-3">
              <h2 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Citation Trail
              </h2>
            </div>
            <CitationTrail citations={citations} selectedNode={selectedNode} />
          </div>
        </div>
      </div>
    </div>
  );
}
