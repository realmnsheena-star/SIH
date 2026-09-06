// KHOJAI domain types

export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'unknown';

export type SourceType =
  | 'official-bis'
  | 'rag'
  | 'external'
  | 'user-provided';

export type VerificationStatus =
  | 'verified'
  | 'verify-with-bis'
  | 'guidance'
  | 'source-unavailable';

export interface StandardSource {
  id: string;
  title: string;
  type: SourceType;
  reference: string;
  url?: string;
  section?: string;
  notes?: string;
}

export interface StandardClause {
  id: string;
  title: string;
  summary: string;
  notes?: string;
}

export interface Citation {
  sourceId: string;
  quote?: string;
  section?: string;
}

export interface Standard {
  id: string;
  code: string; // real IS number
  title: string;
  summary: string;
  plainLanguageExplanation: string;
  applicability: string;
  category: string;
  tags: string[];
  clauses: StandardClause[];
  sources: StandardSource[];
  citations: Citation[];
  confidence: ConfidenceLevel;
  verification: VerificationStatus;
  relatedStandardIds: string[];
  bisUrl?: string; // official BIS page for this standard
  isGuidance: boolean;
}

export interface BISService {
  id: string;
  name: string;
  description: string;
  category: string;
  whoItHelps: string[];
  processInfo: string[];
  relatedStandardIds: string[];
  sources: StandardSource[];
  confidence: ConfidenceLevel;
  verification: VerificationStatus;
  actionLabel: string;
  actionUrl: string;
  isGuidance: boolean;
}

export interface Laboratory {
  id: string;
  name: string;
  city: string;
  state: string;
  testingCapabilities: string[];
  testingAreas: string[];
  productCategories: string[];
  relatedStandardIds: string[];
  sources: StandardSource[];
  confidence: ConfidenceLevel;
  verification: VerificationStatus;
  isGuidance: boolean;
}

export interface ProductProfile {
  id: string;
  name: string;
  description: string;
  material?: string;
  intendedUse?: string;
  targetUsers?: string;
  manufacturingStage?: string;
  interpretedCategory: string;
  characteristics: string[];
  relatedStandardIds: string[];
  relatedServiceIds: string[];
  relatedLabIds: string[];
  confidence: ConfidenceLevel;
  isGuidance: boolean;
}

export interface ComplianceStep {
  id: string;
  order: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'complete' | 'unknown';
  sourceIds: string[];
  isGuidance: boolean;
}

export interface DataProvenance {
  provider: 'official' | 'rag';
  label: string;
  generatedAt: string;
  verification: VerificationStatus;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  confidence?: ConfidenceLevel;
  citations?: Citation[];
  sources?: StandardSource[];
  verification?: VerificationStatus;
  isGuidance?: boolean;
  clarificationQuestions?: string[];
}

export interface ChatContext {
  productDescription?: string;
  productProfileId?: string;
  standardIds?: string[];
  history: ChatMessage[];
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  query: string;
  isGuidance: boolean;
  provenance: DataProvenance;
}

export interface ProductAnalysis {
  productProfile: ProductProfile;
  standards: Standard[];
  services: BISService[];
  laboratories: Laboratory[];
  testingPath: string[];
  complianceSteps: ComplianceStep[];
  confidence: ConfidenceLevel;
  provenance: DataProvenance;
  isGuidance: boolean;
}

export interface ProductVisualization {
  productProfileId: string;
  imageUrl: string;
  label: string;
  disclaimer: string;
  isGuidance: boolean;
}

export type VoiceState =
  | 'idle'
  | 'listening'
  | 'processing'
  | 'unsupported'
  | 'permission-denied';

export type Language = 'en' | 'hi' | 'kn';
