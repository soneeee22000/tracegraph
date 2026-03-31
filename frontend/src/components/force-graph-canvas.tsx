"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import type { ForceGraphData, ForceNode, ForceLink } from "@/types/graph";
import {
  ENTITY_COLORS,
  HIGHLIGHT_COLOR,
  LINK_DEFAULT_COLOR,
  LINK_HIGHLIGHT_COLOR,
} from "@/lib/graph-colors";
import type { EntityType } from "@/types/graph";

interface ForceGraphCanvasProps {
  data: ForceGraphData;
  width: number;
  height: number;
  onNodeClick?: (node: ForceNode) => void;
  highlightedPath: Set<string>;
}

export default function ForceGraphCanvas({
  data,
  width,
  height,
  onNodeClick,
  highlightedPath,
}: ForceGraphCanvasProps) {
  const fgRef = useRef<ReturnType<
    typeof import("react-force-graph-2d").default
  > | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ForceGraph2D, setForceGraph2D] = useState<any>(null);

  useEffect(() => {
    import("react-force-graph-2d").then((mod) => {
      setForceGraph2D(() => mod.default);
    });
  }, []);

  const isHighlighted = useCallback(
    (nodeId: string): boolean => highlightedPath.has(nodeId),
    [highlightedPath],
  );

  const isLinkHighlighted = useCallback(
    (link: ForceLink): boolean => {
      if (highlightedPath.size === 0) return false;
      const sourceId =
        typeof link.source === "string" ? link.source : link.source.id;
      const targetId =
        typeof link.target === "string" ? link.target : link.target.id;
      return highlightedPath.has(sourceId) && highlightedPath.has(targetId);
    },
    [highlightedPath],
  );

  const paintNode = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const forceNode = node as ForceNode;
      const label = forceNode.label;
      const fontSize = Math.max(12 / globalScale, 1.5);
      const nodeRadius = Math.sqrt(forceNode.val ?? 5) * 2;
      const highlighted = isHighlighted(forceNode.id);
      const nodeX = forceNode.x ?? 0;
      const nodeY = forceNode.y ?? 0;

      if (highlighted) {
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, nodeRadius + 4, 0, 2 * Math.PI);
        ctx.fillStyle = HIGHLIGHT_COLOR;
        ctx.globalAlpha = 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.beginPath();
      ctx.arc(nodeX, nodeY, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = ENTITY_COLORS[forceNode.type as EntityType] ?? "#8b5cf6";
      ctx.fill();

      if (highlighted) {
        ctx.strokeStyle = HIGHLIGHT_COLOR;
        ctx.lineWidth = 2 / globalScale;
        ctx.stroke();
      }

      if (globalScale > 1.2 || highlighted) {
        ctx.font = `${fontSize}px 'Geist', Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#e2e8f0";
        ctx.fillText(label, nodeX, nodeY + nodeRadius + 2);
      }
    },
    [isHighlighted],
  );

  const handleNodeClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (node: any) => {
      onNodeClick?.(node as ForceNode);
    },
    [onNodeClick],
  );

  if (!ForceGraph2D) {
    return (
      <div
        style={{ width, height }}
        className="flex items-center justify-center"
      >
        <div className="text-muted-foreground font-mono text-sm">
          Initializing graph engine...
        </div>
      </div>
    );
  }

  const FG = ForceGraph2D;

  return (
    <FG
      ref={fgRef}
      graphData={data}
      width={width}
      height={height}
      nodeCanvasObject={paintNode}
      nodeCanvasObjectMode={() => "replace"}
      linkColor={(link: ForceLink) =>
        isLinkHighlighted(link) ? LINK_HIGHLIGHT_COLOR : LINK_DEFAULT_COLOR
      }
      linkWidth={(link: ForceLink) => (isLinkHighlighted(link) ? 2.5 : 0.5)}
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      linkLabel={(link: ForceLink) => link.label ?? ""}
      onNodeClick={handleNodeClick}
      cooldownTicks={100}
      warmupTicks={50}
      d3AlphaDecay={0.03}
      d3VelocityDecay={0.4}
      enableNodeDrag={true}
      enableZoomInteraction={true}
      backgroundColor="transparent"
    />
  );
}
