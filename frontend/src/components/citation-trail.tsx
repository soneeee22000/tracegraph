"use client";

import type { Citation, ForceNode } from "@/types/graph";
import { ENTITY_COLORS } from "@/lib/graph-colors";
import type { EntityType } from "@/types/graph";

interface CitationTrailProps {
  citations: Citation[];
  selectedNode: ForceNode | null;
}

export default function CitationTrail({
  citations,
  selectedNode,
}: CitationTrailProps) {
  if (!selectedNode && citations.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <p className="text-center text-sm text-muted-foreground">
          Click a node in the graph or run a query to see citation trails
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 overflow-y-auto p-3">
      {/* Selected node detail */}
      {selectedNode && (
        <div className="rounded-md border border-border bg-background p-3">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{
                backgroundColor:
                  ENTITY_COLORS[selectedNode.type as EntityType] ?? "#8b5cf6",
              }}
            />
            <h3 className="font-semibold text-sm text-foreground">
              {selectedNode.label}
            </h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {selectedNode.description || "No description available"}
          </p>
          {selectedNode.source_document && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Source:
              </span>
              <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-foreground">
                {selectedNode.source_document}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Citation list */}
      {citations.length > 0 && (
        <>
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-1">
            Citation Trail ({citations.length} sources)
          </h4>
          {citations.map((citation, index) => (
            <div
              key={`${citation.source_document}-${index}`}
              className="rounded-md border border-border bg-background p-3"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-foreground">
                  {citation.source_document}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {(citation.relevance_score * 100).toFixed(0)}% match
                </span>
              </div>
              <p className="text-xs text-secondary-foreground leading-relaxed line-clamp-3">
                {citation.chunk_text}
              </p>
              {citation.entity_chain.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {citation.entity_chain.map((entity, entityIndex) => (
                    <span key={entityIndex}>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                        {entity}
                      </span>
                      {entityIndex < citation.entity_chain.length - 1 && (
                        <span className="mx-0.5 text-[10px] text-muted-foreground">
                          {" "}
                          {"->"}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
