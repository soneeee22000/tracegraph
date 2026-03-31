export type EntityType =
  | "entity"
  | "person"
  | "organization"
  | "concept"
  | "technology"
  | "regulation"
  | "disease"
  | "medication"
  | "document";

export interface GraphNode {
  id: string;
  label: string;
  type: EntityType;
  description: string;
  source_document: string;
  highlighted: boolean;
}

export interface GraphEdge {
  source: string;
  target: string;
  label: string;
  weight: number;
  highlighted: boolean;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface Citation {
  source_document: string;
  chunk_text: string;
  entity_chain: string[];
  relevance_score: number;
}

export interface QueryResponse {
  answer: string;
  mode: string;
  citations: Citation[];
  graph: GraphData | null;
  entity_count: number;
  relationship_count: number;
}

export interface ComparisonResponse {
  query: string;
  naive_answer: string;
  graphrag_answer: string;
  graph: GraphData | null;
}

export interface HealthResponse {
  status: string;
  documents_indexed: number;
  total_entities: number;
  total_relationships: number;
}

export interface ForceNode extends GraphNode {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  val?: number;
}

export interface ForceLink {
  source: string | ForceNode;
  target: string | ForceNode;
  label: string;
  weight: number;
  highlighted: boolean;
}

export interface ForceGraphData {
  nodes: ForceNode[];
  links: ForceLink[];
}
