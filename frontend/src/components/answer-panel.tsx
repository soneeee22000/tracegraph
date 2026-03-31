"use client";

import type { QueryResponse, ComparisonResponse } from "@/types/graph";

interface AnswerPanelProps {
  queryResult: QueryResponse | null;
  comparisonResult: ComparisonResponse | null;
}

export default function AnswerPanel({
  queryResult,
  comparisonResult,
}: AnswerPanelProps) {
  if (comparisonResult) {
    return (
      <div className="flex flex-col gap-3 overflow-y-auto p-3">
        <div className="flex items-center gap-2">
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Side-by-Side Comparison
          </h4>
          <span className="rounded-full bg-[#f59e0b]/10 px-2 py-0.5 text-[10px] font-semibold text-[#f59e0b]">
            Compare Mode
          </span>
        </div>

        {/* Naive/Vector RAG — visually weaker */}
        <div className="rounded-md border border-[#ef4444]/20 bg-[#ef4444]/5 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="rounded bg-[#ef4444]/20 px-2 py-0.5 text-[10px] font-semibold text-[#ef4444]">
              Naive RAG (Vector Only)
            </span>
            <span className="text-[9px] text-muted-foreground">
              No graph traversal
            </span>
          </div>
          <p className="text-xs text-secondary-foreground leading-relaxed whitespace-pre-wrap opacity-80">
            {comparisonResult.naive_answer}
          </p>
        </div>

        {/* GraphRAG — visually stronger */}
        <div className="rounded-md border border-[#10b981]/30 bg-[#10b981]/5 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="rounded bg-[#10b981]/20 px-2 py-0.5 text-[10px] font-semibold text-[#10b981]">
              GraphRAG (Hybrid)
            </span>
            <span className="text-[9px] text-muted-foreground">
              Graph + Vector + Communities
            </span>
          </div>
          <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
            {comparisonResult.graphrag_answer}
          </p>
        </div>
      </div>
    );
  }

  if (queryResult) {
    return (
      <div className="flex flex-col gap-3 overflow-y-auto p-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Answer
          </h4>
          <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
            {queryResult.mode} search
          </span>
        </div>

        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {queryResult.answer}
          </p>
        </div>

        <div className="flex gap-4 px-1">
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              {queryResult.entity_count}
            </span>{" "}
            entities
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              {queryResult.relationship_count}
            </span>{" "}
            relationships
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              {queryResult.citations.length}
            </span>{" "}
            citations
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center p-4">
      <p className="text-center text-sm text-muted-foreground">
        Run a query to see AI-generated answers with citation trails
      </p>
    </div>
  );
}
