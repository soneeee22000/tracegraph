"use client";

import { useEffect, useRef, useCallback } from "react";

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
  label: string;
  type: string;
}

interface Edge {
  source: string;
  target: string;
}

const nodeColors: Record<string, string> = {
  concept: "#6366f1", // Indigo - accent
  technology: "#3b82f6", // Blue
  organization: "#10b981", // Green
  regulation: "#ef4444", // Red
  method: "#8b5cf6", // Violet
  document: "#f59e0b", // Amber
};

const sampleNodes: Omit<Node, "x" | "y" | "vx" | "vy">[] = [
  {
    id: "1",
    color: nodeColors.concept,
    radius: 20,
    label: "GraphRAG",
    type: "concept",
  },
  {
    id: "2",
    color: nodeColors.concept,
    radius: 16,
    label: "Knowledge Graph",
    type: "concept",
  },
  {
    id: "3",
    color: nodeColors.technology,
    radius: 14,
    label: "LightRAG",
    type: "technology",
  },
  {
    id: "4",
    color: nodeColors.technology,
    radius: 12,
    label: "FastAPI",
    type: "technology",
  },
  {
    id: "5",
    color: nodeColors.technology,
    radius: 14,
    label: "Next.js",
    type: "technology",
  },
  {
    id: "6",
    color: nodeColors.organization,
    radius: 12,
    label: "OpenAI",
    type: "organization",
  },
  {
    id: "7",
    color: nodeColors.method,
    radius: 14,
    label: "Entity Extraction",
    type: "method",
  },
  {
    id: "8",
    color: nodeColors.method,
    radius: 12,
    label: "Citation Trail",
    type: "method",
  },
  {
    id: "9",
    color: nodeColors.concept,
    radius: 14,
    label: "Traceability",
    type: "concept",
  },
  {
    id: "10",
    color: nodeColors.regulation,
    radius: 12,
    label: "EU AI Act",
    type: "regulation",
  },
  {
    id: "11",
    color: nodeColors.document,
    radius: 10,
    label: "Source Doc",
    type: "document",
  },
  {
    id: "12",
    color: nodeColors.concept,
    radius: 12,
    label: "Explainability",
    type: "concept",
  },
  {
    id: "13",
    color: nodeColors.technology,
    radius: 10,
    label: "Vector DB",
    type: "technology",
  },
  {
    id: "14",
    color: nodeColors.method,
    radius: 10,
    label: "Hybrid Search",
    type: "method",
  },
  {
    id: "15",
    color: nodeColors.organization,
    radius: 10,
    label: "Healthcare AI",
    type: "organization",
  },
  {
    id: "16",
    color: nodeColors.concept,
    radius: 12,
    label: "RAG",
    type: "concept",
  },
  {
    id: "17",
    color: nodeColors.document,
    radius: 8,
    label: "Clinical Data",
    type: "document",
  },
  {
    id: "18",
    color: nodeColors.method,
    radius: 10,
    label: "Community Detection",
    type: "method",
  },
];

const sampleEdges: Edge[] = [
  { source: "1", target: "2" },
  { source: "1", target: "3" },
  { source: "1", target: "9" },
  { source: "2", target: "7" },
  { source: "2", target: "8" },
  { source: "3", target: "4" },
  { source: "3", target: "6" },
  { source: "4", target: "5" },
  { source: "7", target: "11" },
  { source: "8", target: "11" },
  { source: "9", target: "10" },
  { source: "9", target: "12" },
  { source: "12", target: "10" },
  { source: "13", target: "14" },
  { source: "14", target: "1" },
  { source: "15", target: "17" },
  { source: "15", target: "10" },
  { source: "16", target: "1" },
  { source: "16", target: "13" },
  { source: "18", target: "2" },
  { source: "6", target: "7" },
];

export function HeroGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | null>(null);
  const pulseNodeRef = useRef<string | null>(null);
  const pulseTimeRef = useRef<number>(0);

  const initializeNodes = useCallback((width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;

    nodesRef.current = sampleNodes.map((node, i) => {
      const angle = (i / sampleNodes.length) * Math.PI * 2;
      const radius = 100 + Math.random() * 150;
      return {
        ...node,
        x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 100,
        y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 100,
        vx: 0,
        vy: 0,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        initializeNodes(rect.width, rect.height);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Pulse animation interval
    const pulseInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * nodesRef.current.length);
      pulseNodeRef.current = nodesRef.current[randomIndex]?.id ?? null;
      pulseTimeRef.current = 0;
    }, 3000);

    const simulate = () => {
      const nodes = nodesRef.current;
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Force simulation
      const centerX = width / 2;
      const centerY = height / 2;
      // Apply forces
      nodes.forEach((node) => {
        // Center gravity
        node.vx += (centerX - node.x) * 0.0001;
        node.vy += (centerY - node.y) * 0.0001;

        // Repulsion between nodes
        nodes.forEach((other) => {
          if (node.id !== other.id) {
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const minDist = node.radius + other.radius + 30;
            if (dist < minDist) {
              const force = ((minDist - dist) / dist) * 0.05;
              node.vx += dx * force;
              node.vy += dy * force;
            }
          }
        });
      });

      // Apply edge forces (spring)
      sampleEdges.forEach((edge) => {
        const source = nodes.find((n) => n.id === edge.source);
        const target = nodes.find((n) => n.id === edge.target);
        if (source && target) {
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const targetDist = 80;
          const force = (dist - targetDist) * 0.001;
          source.vx += (dx / dist) * force;
          source.vy += (dy / dist) * force;
          target.vx -= (dx / dist) * force;
          target.vy -= (dy / dist) * force;
        }
      });

      // Update positions with damping
      nodes.forEach((node) => {
        node.vx *= 0.9;
        node.vy *= 0.9;
        node.x += node.vx;
        node.y += node.vy;

        // Boundary constraints
        const padding = 40;
        node.x = Math.max(padding, Math.min(width - padding, node.x));
        node.y = Math.max(padding, Math.min(height - padding, node.y));
      });

      // Clear and draw
      ctx.clearRect(0, 0, width, height);

      // Draw edges
      sampleEdges.forEach((edge) => {
        const source = nodes.find((n) => n.id === edge.source);
        const target = nodes.find((n) => n.id === edge.target);
        if (source && target) {
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Draw nodes
      pulseTimeRef.current += 0.05;
      nodes.forEach((node) => {
        const isPulsing =
          node.id === pulseNodeRef.current && pulseTimeRef.current < 1;
        const pulseScale = isPulsing
          ? 1 + Math.sin(pulseTimeRef.current * Math.PI) * 0.3
          : 1;
        const radius = node.radius * pulseScale;

        // Glow effect
        if (isPulsing) {
          const gradient = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            radius * 2,
          );
          gradient.addColorStop(0, node.color + "40");
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(
          node.x - radius * 0.2,
          node.y - radius * 0.2,
          radius * 0.3,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(simulate);
    };

    simulate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(pulseInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initializeNodes]);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[#111113]">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Edge fade gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#09090b] via-transparent to-transparent opacity-30" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#09090b] via-transparent to-[#09090b] opacity-40" />
    </div>
  );
}
