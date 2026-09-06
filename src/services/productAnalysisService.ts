import { dataSource } from '@/data/prototype-data-source';
import type {
  ProductAnalysis,
  ProductProfile,
  Standard,
  BISService,
  Laboratory,
  ComplianceStep,
  ConfidenceLevel,
} from '@/types/khojai';
import { searchStandards } from './standardsService';
import { listServices } from './bisService';
import { listLaboratories } from './laboratoryService';

export interface ProductAnalysisInput {
  name: string;
  description: string;
  material?: string;
  intendedUse?: string;
  targetUsers?: string;
  manufacturingStage?: string;
}

export function analyzeProduct(input: ProductAnalysisInput): ProductAnalysis {
  const standards = searchStandards(`${input.name} ${input.description}`);
  const standardIds = standards.map((s) => s.id);

  // All BIS resource services are relevant to any product
  const services = listServices();
  const labs = listLaboratories().filter((l) =>
    l.relatedStandardIds.some((rid) => standardIds.includes(rid))
  );

  const profile: ProductProfile = {
    id: `prod-analysis-${Date.now()}`,
    name: input.name,
    description: input.description,
    material: input.material,
    intendedUse: input.intendedUse,
    targetUsers: input.targetUsers,
    manufacturingStage: input.manufacturingStage,
    interpretedCategory: standards[0]?.category ?? 'General consumer product',
    characteristics: deriveCharacteristics(input, standards),
    relatedStandardIds: standardIds,
    relatedServiceIds: services.map((s) => s.id),
    relatedLabIds: labs.map((l) => l.id),
    confidence: confidenceFor(standards),
    isGuidance: true,
  };

  const testingPath = buildTestingPath(standards);
  const complianceSteps = buildComplianceSteps(standards, input);

  return {
    productProfile: profile,
    standards,
    services,
    laboratories: labs,
    testingPath,
    complianceSteps,
    confidence: profile.confidence,
    provenance: dataSource.getProvenance(),
    isGuidance: true,
  };
}

function deriveCharacteristics(input: ProductAnalysisInput, standards: Standard[]): string[] {
  const chars = new Set<string>();
  const text = `${input.name} ${input.description} ${input.material ?? ''} ${input.intendedUse ?? ''} ${input.targetUsers ?? ''}`.toLowerCase();

  if (text.includes('toy') || text.includes('children')) chars.add('Designed for children');
  if (text.includes('educational')) chars.add('Educational purpose');
  if (text.includes('wood') || text.includes('wooden')) chars.add('Wooden material');
  if (text.includes('plastic')) chars.add('Plastic material');
  if (text.includes('electronic') || text.includes('electrical') || text.includes('appliance'))
    chars.add('Electrical/electronic product');
  if (text.includes('food') || text.includes('packaged')) chars.add('Food product');
  if (text.includes('textile') || text.includes('garment') || text.includes('clothing'))
    chars.add('Textile product');
  if (text.includes('water')) chars.add('Water-related product');
  if (text.includes('paint') || text.includes('coating')) chars.add('Paint/coating product');
  if (input.targetUsers) chars.add(`Target users: ${input.targetUsers}`);
  if (input.intendedUse) chars.add(`Intended use: ${input.intendedUse}`);

  if (chars.size === 0) chars.add('General consumer product');

  return Array.from(chars);
}

function confidenceFor(standards: Standard[]): ConfidenceLevel {
  if (standards.length === 0) return 'low';
  if (standards.some((s) => s.confidence === 'high')) return 'high';
  if (standards.some((s) => s.confidence === 'medium')) return 'medium';
  return 'low';
}

function buildTestingPath(standards: Standard[]): string[] {
  return [
    'Identify applicable standard',
    'Identify required test parameters',
    'Find an appropriate BIS-recognised/empanelled laboratory where applicable',
    'Conduct required testing according to the applicable procedure',
    'Obtain and retain test evidence/report',
    'Review conformity and address gaps',
  ];
}

function buildComplianceSteps(
  standards: Standard[],
  input: ProductAnalysisInput
): ComplianceStep[] {
  const productType = input.name || input.description || 'your product';
  const category = standards[0]?.category;
  const standardsFound = standards.length > 0;

  const steps: ComplianceStep[] = [
    {
      id: 'step-1',
      order: 1,
      title: 'Define your product',
      description: `Identify product type, intended use, materials, target users and manufacturing stage for ${productType}.`,
      status: 'complete',
      sourceIds: [],
      isGuidance: true,
    },
    {
      id: 'step-2',
      order: 2,
      title: 'Identify applicable Indian Standards',
      description: standardsFound
        ? `KHOJAI identified ${standards.length} potentially relevant Indian Standard(s)${category ? ` in the ${category} category` : ''}. Potentially relevant — verify applicability with BIS.`
        : 'KHOJAI could not identify specific standards from the description. Try a more detailed product description, or search the BIS Know Your Standard portal.',
      status: standardsFound ? 'complete' : 'pending',
      sourceIds: standards.flatMap((s) => s.sources.map((src) => src.id)),
      isGuidance: true,
    },
    {
      id: 'step-3',
      order: 3,
      title: 'Check applicability & mandatory requirements',
      description:
        'Check whether the product is covered by applicable BIS requirements, including compulsory certification/QCO requirements where relevant. Verify on the official BIS compulsory certification page.',
      status: standardsFound ? 'in-progress' : 'pending',
      sourceIds: [],
      isGuidance: true,
    },
    {
      id: 'step-4',
      order: 4,
      title: 'Review testing & conformity requirements',
      description:
        'Identify relevant testing, inspection, quality-control and conformity-assessment requirements based on the applicable standard/scheme. Always verify the exact requirements with BIS.',
      status: 'pending',
      sourceIds: [],
      isGuidance: true,
    },
    {
      id: 'step-5',
      order: 5,
      title: 'Prepare documents & product information',
      description:
        'Prepare technical information, manufacturing/process details, test evidence, labelling and other required documentation as applicable.',
      status: 'pending',
      sourceIds: [],
      isGuidance: true,
    },
    {
      id: 'step-6',
      order: 6,
      title: 'Apply through the appropriate BIS process',
      description:
        'Use the official BIS application/service portal (manakonline.in) to apply. KHOJAI does not process applications — always apply through official BIS channels.',
      status: 'pending',
      sourceIds: [],
      isGuidance: true,
    },
    {
      id: 'step-7',
      order: 7,
      title: 'Verify before compliance decision',
      description:
        'Confirm the latest standard, amendments, QCOs, scheme requirements and official BIS procedure before taking real-world action.',
      status: 'pending',
      sourceIds: [],
      isGuidance: true,
    },
  ];
  return steps;
}
