import type { EntityType } from "@/types/graph";

export const ENTITY_COLORS: Record<EntityType, string> = {
  entity: "#8b5cf6",
  person: "#f59e0b",
  organization: "#10b981",
  concept: "#6366f1",
  technology: "#3b82f6",
  regulation: "#ef4444",
  disease: "#f97316",
  medication: "#14b8a6",
  document: "#64748b",
};

export const HIGHLIGHT_COLOR = "#facc15";
export const LINK_DEFAULT_COLOR = "rgba(148, 163, 184, 0.12)";
export const LINK_HIGHLIGHT_COLOR = "rgba(250, 204, 21, 0.7)";
