import type {
  ChatMessage,
  ChatContext,
  Standard,
  BISService,
} from '@/types/khojai';
import { searchStandards, getStandardById } from './standardsService';
import { listServices } from './bisService';
import { analyzeProduct } from './productAnalysisService';
import { BIS_LINKS } from '@/data/prototype-data';

export interface ChatResult {
  message: ChatMessage;
  updatedContext: ChatContext;
}

const GUIDANCE_PREFIX =
  'KHOJAI provides guidance to help you understand BIS requirements. Always verify the latest standard, amendments and certification requirements on the official BIS website.';

function makeId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const CLARIFICATION_QUESTIONS = [
  'What type of product are you building?',
  'What material is it made of?',
  'What is the intended use?',
  'Who is the target user?',
  'What stage of manufacturing are you at?',
];

export function createInitialContext(): ChatContext {
  return { history: [] };
}

export async function sendMessage(
  text: string,
  context: ChatContext
): Promise<ChatResult> {
  const userMessage: ChatMessage = {
    id: makeId(),
    role: 'user',
    content: text,
    timestamp: new Date().toISOString(),
  };

  const assistantMessage = await respond(text, context);
  const updatedContext: ChatContext = {
    ...context,
    productDescription: context.productDescription ?? text,
    history: [...context.history, userMessage, assistantMessage],
  };

  return { message: assistantMessage, updatedContext };
}

async function respond(text: string, context: ChatContext): Promise<ChatMessage> {
  const q = text.toLowerCase().trim();

  // Intent: find standards for a product
  if (
    q.includes('what standards') ||
    q.includes('which standards') ||
    q.includes('standards apply') ||
    q.includes('relevant standards')
  ) {
    const standards = searchStandards(text);
    if (standards.length === 0) {
      return clarificationResponse(text, context);
    }
    return standardsResponse(text, standards);
  }

  // Intent: how does BIS certification work
  if (q.includes('bis certification') || q.includes('how does bis') || q.includes('certification work')) {
    return bisCertResponse();
  }

  // Intent: what to check before manufacturing
  if (q.includes('before manufacturing') || q.includes('before i manufacture') || q.includes('what should i check')) {
    return preManufacturingResponse();
  }

  // Intent: find a testing laboratory
  if (q.includes('laboratory') || q.includes('testing lab') || q.includes('find a lab') || q.includes('find a testing')) {
    return labResponse();
  }

  // Intent: explain a standard simply
  if (q.includes('explain this standard') || q.includes('explain this') || q.includes('simply')) {
    return explainStandardResponse(text, context);
  }

  // Intent: looks like a product description — run analysis
  if (q.length > 10 && (q.includes('manufacture') || q.includes('build') || q.includes('product') || q.includes('make'))) {
    const analysis = analyzeProduct({
      name: 'Described product',
      description: text,
    });
    return analysisResponse(analysis.standards, analysis.services);
  }

  // Default: try a standards search, else clarify
  const standards = searchStandards(text);
  if (standards.length > 0) {
    return standardsResponse(text, standards);
  }

  return clarificationResponse(text, context);
}

function standardsResponse(text: string, standards: Standard[]): ChatMessage {
  const lines = standards.map(
    (s) => `• ${s.title} (${s.code}) — ${s.summary}`
  );
  return {
    id: makeId(),
    role: 'assistant',
    content: `${GUIDANCE_PREFIX}\n\nPotentially relevant standards for "${text}":\n\n${lines.join('\n')}\n\nThese are guidance suggestions. Always verify applicability with BIS.`,
    timestamp: new Date().toISOString(),
    confidence: 'medium',
    sources: standards.flatMap((s) => s.sources),
    verification: 'verify-with-bis',
    isGuidance: true,
  };
}

function bisCertResponse(): ChatMessage {
  return {
    id: makeId(),
    role: 'assistant',
    content: `${GUIDANCE_PREFIX}\n\nHow BIS certification generally works:\n\n1. Identify applicable standards for your product.\n2. Prepare your product and documentation.\n3. Submit your product for testing at a BIS-recognised laboratory.\n4. Review the test report.\n5. Apply for certification through the official BIS portal.\n6. If granted, use the certification mark as per BIS guidelines.\n\nAlways verify the exact process on the official BIS website: ${BIS_LINKS.productCertificationProcess}`,
    timestamp: new Date().toISOString(),
    confidence: 'medium',
    sources: listServices().filter((s) => s.category === 'Certification').flatMap((s) => s.sources),
    verification: 'verify-with-bis',
    isGuidance: true,
  };
}

function preManufacturingResponse(): ChatMessage {
  return {
    id: makeId(),
    role: 'assistant',
    content: `${GUIDANCE_PREFIX}\n\nThings to check before manufacturing:\n\n• Identify the product category and intended use.\n• Find potentially relevant Indian Standards.\n• Review material and safety requirements.\n• Understand target-user safety considerations.\n• Identify a BIS-recognised testing laboratory.\n• Plan documentation and labelling.\n\nAlways verify requirements on the official BIS website.`,
    timestamp: new Date().toISOString(),
    confidence: 'medium',
    verification: 'verify-with-bis',
    isGuidance: true,
  };
}

function labResponse(): ChatMessage {
  return {
    id: makeId(),
    role: 'assistant',
    content: `${GUIDANCE_PREFIX}\n\nTo find BIS-recognised laboratories, visit the official BIS Directory page:\n\n${BIS_LINKS.directory}\n\nKHOJAI does not maintain its own laboratory database. Always verify laboratory recognition status directly with BIS.`,
    timestamp: new Date().toISOString(),
    confidence: 'high',
    sources: listServices().filter((s) => s.id === 'svc-bis-directory').flatMap((s) => s.sources),
    verification: 'verified',
    isGuidance: true,
  };
}

function explainStandardResponse(text: string, context: ChatContext): ChatMessage {
  const allStandards = [...searchStandards(text), ...context.standardIds?.map((id) => getStandardById(id)).filter(Boolean) as Standard[]];
  if (allStandards.length === 0) {
    return clarificationResponse(text, context);
  }
  const s = allStandards[0];
  return {
    id: makeId(),
    role: 'assistant',
    content: `${GUIDANCE_PREFIX}\n\n${s.title} (${s.code}) explained simply:\n\n${s.plainLanguageExplanation}`,
    timestamp: new Date().toISOString(),
    confidence: s.confidence,
    sources: s.sources,
    verification: 'verify-with-bis',
    isGuidance: true,
  };
}

function analysisResponse(
  standards: Standard[],
  services: BISService[]
): ChatMessage {
  const stdLines = standards.map((s) => `• ${s.title} (${s.code})`);
  const svcLines = services.map((s) => `• ${s.name}`);
  return {
    id: makeId(),
    role: 'assistant',
    content: `${GUIDANCE_PREFIX}\n\nGuidance analysis result:\n\nPotentially relevant standards:\n${stdLines.join('\n') || '• None found. Try a more specific description.'}\n\nRelevant BIS resources:\n${svcLines.join('\n') || '• None found.'}\n\nAlways verify applicability with BIS before making compliance decisions.`,
    timestamp: new Date().toISOString(),
    confidence: 'medium',
    sources: [...standards, ...services].flatMap((x) => x.sources),
    verification: 'verify-with-bis',
    isGuidance: true,
  };
}

function clarificationResponse(_text: string, _context: ChatContext): ChatMessage {
  return {
    id: makeId(),
    role: 'assistant',
    content: `${GUIDANCE_PREFIX}\n\nI need more information to narrow this down. Could you tell me a bit more about your product?`,
    timestamp: new Date().toISOString(),
    confidence: 'unknown',
    verification: 'verify-with-bis',
    isGuidance: true,
    clarificationQuestions: CLARIFICATION_QUESTIONS,
  };
}

export const QUICK_QUESTIONS = [
  'What standards may apply to my product?',
  'How does BIS certification work?',
  'What should I check before manufacturing?',
  'How can I find a testing laboratory?',
  'Explain this standard simply.',
];
