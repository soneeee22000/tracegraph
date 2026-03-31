"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect, useCallback } from "react";
import type { ForceGraphData, ForceNode } from "@/types/graph";
import { ENTITY_COLORS } from "@/lib/graph-colors";
import type { EntityType } from "@/types/graph";

const ForceGraphCanvas = dynamic(() => import("./force-graph-canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="text-muted-foreground font-mono text-sm">
        Loading graph...
      </span>
    </div>
  ),
});

interface GraphViewerProps {
  data: ForceGraphData;
  onNodeSelect?: (node: ForceNode) => void;
}

const ENTITY_TYPE_LABELS: [EntityType, string][] = [
  ["concept", "Concept"],
  ["technology", "Technology"],
  ["organization", "Organization"],
  ["regulation", "Regulation"],
  ["person", "Person"],
  ["document", "Document"],
];

export default function GraphViewer({ data, onNodeSelect }: GraphViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [highlightedPath, setHighlightedPath] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleNodeClick = useCallback(
    (node: ForceNode) => {
      const connectedIds = new Set<string>([node.id]);
      for (const link of data.links) {
        const sourceId =
          typeof link.source === "string" ? link.source : link.source.id;
        const targetId =
          typeof link.target === "string" ? link.target : link.target.id;
        if (sourceId === node.id) connectedIds.add(targetId);
        if (targetId === node.id) connectedIds.add(sourceId);
      }
      setHighlightedPath(connectedIds);
      onNodeSelect?.(node);
    },
    [data.links, onNodeSelect],
  );

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-lg border border-border bg-card"
    >
      {/* Legend */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1 rounded-md border border-border bg-card/90 p-2.5 backdrop-blur-sm">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Entity Types
        </span>
        {ENTITY_TYPE_LABELS.map(([type, label]) => (
          <div
            key={type}
            className="flex items-center gap-2 text-xs text-foreground"
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: ENTITY_COLORS[type] }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="absolute right-3 top-3 z-10 flex gap-3 rounded-md border border-border bg-card/90 px-3 py-2 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-lg font-bold text-primary">
            {data.nodes.length}
          </div>
          <div className="text-[10px] text-muted-foreground">Entities</div>
        </div>
        <div className="h-auto w-px bg-border" />
        <div className="text-center">
          <div className="text-lg font-bold text-primary">
            {data.links.length}
          </div>
          <div className="text-[10px] text-muted-foreground">Relations</div>
        </div>
      </div>

      {/* Clear highlight */}
      {highlightedPath.size > 0 && (
        <button
          type="button"
          onClick={() => setHighlightedPath(new Set())}
          className="absolute bottom-3 right-3 z-10 rounded-md border border-border bg-card/90 px-3 py-1.5 text-xs text-foreground backdrop-blur-sm transition-colors hover:bg-secondary"
        >
          Clear selection
        </button>
      )}

      <ForceGraphCanvas
        data={data}
        width={dimensions.width}
        height={dimensions.height}
        onNodeClick={handleNodeClick}
        highlightedPath={highlightedPath}
      />
    </div>
  );
}
