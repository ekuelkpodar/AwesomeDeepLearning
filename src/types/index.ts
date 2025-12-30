// Core architecture types
export interface Architecture {
  id: string;
  name: string;
  category: ArchitectureCategory;
  subcategory: string;
  year: number;
  authors: string[];
  paper: string;
  paperUrl: string;
  description: string;
  plainEnglish: string;
  keyInnovation: string;
  architecture: ArchitectureDetails;
  mathematics: MathematicsSection;
  code: CodeExamples;
  useCases: UseCase[];
  benchmarks: Benchmarks;
  trainingTips: TrainingTips;
  comparisons: string[];
  resources: Resource[];
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  computationalRequirements: ComputationalRequirements;
}

export type ArchitectureCategory =
  | 'feedforward'
  | 'cnn'
  | 'rnn'
  | 'transformer'
  | 'autoencoder'
  | 'generative'
  | 'gnn'
  | 'reinforcement'
  | 'energy-based'
  | 'spiking'
  | 'hybrid'
  | 'self-supervised';

export interface ArchitectureDetails {
  layers: Layer[];
  parameters: number;
  depth: number;
  inputShape?: number[];
  outputShape?: number[];
  visualization?: VisualizationConfig;
}

export interface Layer {
  type: string;
  name: string;
  params?: Record<string, any>;
  outputShape?: number[];
  description?: string;
}

export interface VisualizationConfig {
  type: 'sequential' | 'dag' | 'custom';
  nodes: VisualizationNode[];
  edges: VisualizationEdge[];
}

export interface VisualizationNode {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface VisualizationEdge {
  source: string;
  target: string;
  animated?: boolean;
}

export interface MathematicsSection {
  equations: Equation[];
  forwardPass: string[];
  backpropagation?: string[];
  lossFunction?: string;
}

export interface Equation {
  name: string;
  latex: string;
  description: string;
}

export interface CodeExamples {
  pytorch: string;
  tensorflow?: string;
  jax?: string;
}

export interface UseCase {
  title: string;
  description: string;
  examples: string[];
  industry?: string;
}

export interface Benchmarks {
  datasets: DatasetBenchmark[];
  performance: PerformanceMetrics;
}

export interface DatasetBenchmark {
  name: string;
  accuracy?: number;
  otherMetrics?: Record<string, number>;
}

export interface PerformanceMetrics {
  speed: string;
  memory: string;
  accuracy: string;
}

export interface TrainingTips {
  hyperparameters: Record<string, any>;
  commonIssues: Issue[];
  dataRequirements: string;
  trainingTime: string;
}

export interface Issue {
  problem: string;
  solution: string;
}

export interface Resource {
  type: 'paper' | 'tutorial' | 'implementation' | 'video' | 'blog';
  title: string;
  url: string;
  author?: string;
}

export interface ComputationalRequirements {
  minGPU?: string;
  minRAM: string;
  recommendedGPU?: string;
  recommendedRAM: string;
}

// Category structure
export interface CategoryInfo {
  id: ArchitectureCategory;
  name: string;
  description: string;
  icon: string;
  subcategories: SubcategoryInfo[];
}

export interface SubcategoryInfo {
  id: string;
  name: string;
  description: string;
}

// Learning paths
export interface LearningPath {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  architectures: string[];
  prerequisites?: string[];
}

// User progress
export interface UserProgress {
  learnedArchitectures: string[];
  bookmarkedArchitectures: string[];
  notes: Record<string, string>;
  timeSpent: Record<string, number>;
  quizScores: Record<string, number>;
}

// Search and filter
export interface SearchFilters {
  query?: string;
  categories?: ArchitectureCategory[];
  years?: [number, number];
  difficulty?: ('Beginner' | 'Intermediate' | 'Advanced')[];
  tags?: string[];
}
