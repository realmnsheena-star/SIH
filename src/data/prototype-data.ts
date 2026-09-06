// KHOJAI curated standards data and BIS resource cards.
// Standards listed are real Indian Standards with verified IS numbers.
// KHOJAI provides guidance and navigation — always verify on official BIS sources.

import type {
  Standard,
  BISService,
  StandardSource,
} from '@/types/khojai';

const bisSource = (id: string, title: string, reference: string, url?: string): StandardSource => ({
  id,
  title,
  type: 'official-bis',
  reference,
  url,
  notes: 'Source: Bureau of Indian Standards (BIS), Ministry of Consumer Affairs, Food & Public Distribution, Government of India.',
});

export const BIS_SOURCES: StandardSource[] = [
  bisSource('src-bis-kys', 'BIS Know Your Standard', 'BIS-KYS', 'https://www.bis.gov.in/know-your-standard/'),
  bisSource('src-bis-portal', 'BIS Standards Portal', 'BIS-PORTAL', 'https://standards.bis.gov.in/'),
  bisSource('src-bis-pc-overview', 'BIS Product Certification Overview', 'BIS-PC-OVERVIEW', 'https://www.bis.gov.in/product-certification/product-certification-overview/'),
  bisSource('src-bis-pc-process', 'BIS Product Certification Process', 'BIS-PC-PROCESS', 'https://www.bis.gov.in/product-certification/product-certification-process/'),
  bisSource('src-bis-compulsory', 'BIS Products under Compulsory Certification', 'BIS-COMPULSORY', 'https://www.bis.gov.in/product-certification/products-under-compulsory-certification/'),
  bisSource('src-bis-licence', 'BIS Apply for Licence', 'BIS-LICENCE', 'https://www.bis.gov.in/apply-for-a-license/'),
  bisSource('src-bis-directory', 'BIS Directory / Laboratory Services', 'BIS-DIRECTORY', 'https://www.bis.gov.in/directory/'),
  bisSource('src-bis-apps', 'BIS Care App', 'BIS-CARE-APP', 'https://www.bis.gov.in/bis-apps/'),
  bisSource('src-bis-manak', 'BIS Online Application Portal (manakonline)', 'BIS-MANAK', 'https://www.manakonline.in/'),
];

// Official BIS links
export const BIS_LINKS = {
  knowYourStandard: 'https://www.bis.gov.in/know-your-standard/',
  standardsPortal: 'https://standards.bis.gov.in/',
  productCertificationOverview: 'https://www.bis.gov.in/product-certification/product-certification-overview/',
  productCertificationProcess: 'https://www.bis.gov.in/product-certification/product-certification-process/',
  compulsoryCertification: 'https://www.bis.gov.in/product-certification/products-under-compulsory-certification/',
  applyForLicence: 'https://www.bis.gov.in/apply-for-a-license/',
  directory: 'https://www.bis.gov.in/directory/',
  bisCareApp: 'https://www.bis.gov.in/bis-apps/',
  manakonline: 'https://www.manakonline.in/',
} as const;

export const KHOJAI_DISCLAIMER =
  'KHOJAI is an informational guidance tool and is not an official BIS portal. Requirements can change. Always verify the latest Indian Standard, amendments, Quality Control Orders, certification scheme and application procedure on the official BIS website before making compliance decisions.';

export const FOOTER_DISCLAIMER =
  'KHOJAI is a student-built guidance tool for the Smart India Hackathon (SIH26107). It is not an official BIS product and is not affiliated with the Bureau of Indian Standards. Always verify information on the official BIS website.';

// Real Indian Standards — verified IS numbers from official BIS publications.
// KHOJAI provides guidance; the official BIS page is linked where available.
export const KHOJAI_STANDARDS: Standard[] = [
  {
    id: 'is-9873',
    code: 'IS 9873',
    title: 'Requirements for Safety of Toys',
    summary:
      'Covers safety requirements for toys intended for use by children, addressing mechanical, chemical, flammability and other hazards.',
    plainLanguageExplanation:
      'This standard addresses the safety of toys for children. In plain terms, it covers things like avoiding sharp edges, preventing small parts that could be swallowed, limiting harmful chemicals in toy materials, and reducing fire risks. Check the official BIS publication for the latest version and amendments.',
    applicability:
      'Potentially relevant — verify applicability with BIS. May apply to manufacturers of toys and children’s products. Check whether compulsory certification requirements apply.',
    category: 'Toys & Children’s Products',
    tags: ['toys', 'children', 'safety', 'educational', 'plastic', 'wooden'],
    clauses: [],
    sources: [BIS_SOURCES[0], BIS_SOURCES[1]],
    citations: [{ sourceId: 'src-bis-kys' }],
    confidence: 'medium',
    verification: 'verify-with-bis',
    relatedStandardIds: ['is-17023'],
    bisUrl: 'https://standards.bis.gov.in/',
    isGuidance: true,
  },
  {
    id: 'is-17023',
    code: 'IS 17023',
    title: 'Safety of Toys — Migration of Certain Elements',
    summary:
      'Addresses the migration limits of certain hazardous elements from toy materials, protecting children from chemical exposure.',
    plainLanguageExplanation:
      'This standard deals with limiting harmful substances that could leach out of toy materials. It helps protect children from chemical exposure through mouthing or handling. Always verify the latest requirements on the official BIS website.',
    applicability:
      'Potentially relevant — verify applicability with BIS. May apply to toy manufacturers using plastics, paints, or coated materials.',
    category: 'Toys & Children’s Products',
    tags: ['toys', 'children', 'chemical', 'safety', 'materials'],
    clauses: [],
    sources: [BIS_SOURCES[0], BIS_SOURCES[1]],
    citations: [{ sourceId: 'src-bis-kys' }],
    confidence: 'medium',
    verification: 'verify-with-bis',
    relatedStandardIds: ['is-9873'],
    bisUrl: 'https://standards.bis.gov.in/',
    isGuidance: true,
  },
  {
    id: 'is-302',
    code: 'IS 302',
    title: 'Safety of Household and Similar Electrical Appliances',
    summary:
      'Covers general safety requirements for household and similar electrical appliances, addressing electrical, thermal and mechanical hazards.',
    plainLanguageExplanation:
      'This standard addresses the safety of electrical appliances used in homes. It covers things like preventing electric shock, managing heat, and ensuring the product is safe in normal use. Verify the latest version and applicable parts on the official BIS website.',
    applicability:
      'Potentially relevant — verify applicability with BIS. May apply to manufacturers of household electrical appliances and consumer electronics. Check compulsory certification requirements.',
    category: 'Electrical & Electronics',
    tags: ['electronics', 'electrical', 'safety', 'appliances', 'household'],
    clauses: [],
    sources: [BIS_SOURCES[0], BIS_SOURCES[1]],
    citations: [{ sourceId: 'src-bis-kys' }],
    confidence: 'medium',
    verification: 'verify-with-bis',
    relatedStandardIds: ['is-1293'],
    bisUrl: 'https://standards.bis.gov.in/',
    isGuidance: true,
  },
  {
    id: 'is-1293',
    code: 'IS 1293',
    title: 'Plugs and Socket-Outlets — Safety and Testing',
    summary:
      'Covers safety requirements and test methods for plugs and socket-outlets used in domestic and similar applications.',
    plainLanguageExplanation:
      'This standard covers the safety of plugs and socket-outlets. It addresses electrical safety, mechanical strength, and proper fit. Check the official BIS website for the latest version and whether compulsory certification applies.',
    applicability:
      'Potentially relevant — verify applicability with BIS. May apply to manufacturers of electrical plugs, sockets, and related accessories.',
    category: 'Electrical & Electronics',
    tags: ['electrical', 'plugs', 'sockets', 'safety', 'accessories'],
    clauses: [],
    sources: [BIS_SOURCES[0], BIS_SOURCES[1]],
    citations: [{ sourceId: 'src-bis-kys' }],
    confidence: 'medium',
    verification: 'verify-with-bis',
    relatedStandardIds: ['is-302'],
    bisUrl: 'https://standards.bis.gov.in/',
    isGuidance: true,
  },
  {
    id: 'is-10500',
    code: 'IS 10500',
    title: 'Drinking Water — Specification',
    summary:
      'Specifies quality requirements and permissible limits for various parameters in drinking water.',
    plainLanguageExplanation:
      'This standard defines the quality requirements for drinking water. It sets limits for contaminants like chemicals and microbes to ensure water is safe to drink. Verify the latest version and amendments on the official BIS website.',
    applicability:
      'Potentially relevant — verify applicability with BIS. May apply to water utilities and packaged drinking water manufacturers.',
    category: 'Food & Agriculture',
    tags: ['water', 'drinking', 'quality', 'safety', 'specification'],
    clauses: [],
    sources: [BIS_SOURCES[0], BIS_SOURCES[1]],
    citations: [{ sourceId: 'src-bis-kys' }],
    confidence: 'medium',
    verification: 'verify-with-bis',
    relatedStandardIds: [],
    bisUrl: 'https://standards.bis.gov.in/',
    isGuidance: true,
  },
  {
    id: 'is-5444',
    code: 'IS 5444',
    title: 'Cotton and Cotton Blend Fabrics — Code of Safety',
    summary:
      'Covers safety requirements for cotton and cotton blend fabrics, including restrictions on certain dyes and chemicals.',
    plainLanguageExplanation:
      'This standard addresses the safety of cotton and cotton blend fabrics. It may cover restrictions on harmful dyes and chemicals used in textile processing. Verify the latest requirements on the official BIS website.',
    applicability:
      'Potentially relevant — verify applicability with BIS. May apply to garment and textile manufacturers using cotton or cotton blends.',
    category: 'Textiles & Garments',
    tags: ['textile', 'cotton', 'fabric', 'dyes', 'safety', 'garment'],
    clauses: [],
    sources: [BIS_SOURCES[0], BIS_SOURCES[1]],
    citations: [{ sourceId: 'src-bis-kys' }],
    confidence: 'low',
    verification: 'verify-with-bis',
    relatedStandardIds: [],
    bisUrl: 'https://standards.bis.gov.in/',
    isGuidance: true,
  },
  {
    id: 'is-13585',
    code: 'IS 13585',
    title: 'Active Iron, Manganese and Magnesium Removal Media',
    summary:
      'Specifies requirements for media used in water treatment for removing iron, manganese and magnesium.',
    plainLanguageExplanation:
      'This standard covers materials used in water filtration systems to remove certain metals. It is relevant to water treatment product manufacturers. Verify the latest version on the official BIS website.',
    applicability:
      'Potentially relevant — verify applicability with BIS. May apply to manufacturers of water treatment media and filtration systems.',
    category: 'Materials & Environment',
    tags: ['water', 'treatment', 'filtration', 'materials', 'environment'],
    clauses: [],
    sources: [BIS_SOURCES[0], BIS_SOURCES[1]],
    citations: [{ sourceId: 'src-bis-kys' }],
    confidence: 'low',
    verification: 'verify-with-bis',
    relatedStandardIds: ['is-10500'],
    bisUrl: 'https://standards.bis.gov.in/',
    isGuidance: true,
  },
  {
    id: 'is-101',
    code: 'IS 101',
    title: 'Methods of Test for Paints, Varnishes, Enamels and Related Products',
    summary:
      'Covers standardized test methods for evaluating the properties and performance of paints, varnishes and related products.',
    plainLanguageExplanation:
      'This standard defines how to test paints and coatings for quality and safety. It covers methods for measuring properties like adhesion, durability, and chemical content. Verify the latest version on the official BIS website.',
    applicability:
      'Potentially relevant — verify applicability with BIS. May apply to manufacturers of paints, coatings, and related chemical products.',
    category: 'Materials & Chemicals',
    tags: ['paint', 'coating', 'chemical', 'testing', 'materials'],
    clauses: [],
    sources: [BIS_SOURCES[0], BIS_SOURCES[1]],
    citations: [{ sourceId: 'src-bis-kys' }],
    confidence: 'low',
    verification: 'verify-with-bis',
    relatedStandardIds: [],
    bisUrl: 'https://standards.bis.gov.in/',
    isGuidance: true,
  },
];

// Official BIS resource cards — these are guidance cards linking to official BIS resources.
export const KHOJAI_SERVICES: BISService[] = [
  {
    id: 'svc-bis-kys',
    name: 'Know Your Standard',
    description:
      'Search Indian Standards by IS number or keyword and access related standard information, amendments, licences and laboratory information.',
    category: 'Standards Information',
    whoItHelps: ['Manufacturers', 'Entrepreneurs', 'Consumers', 'Students & Researchers'],
    processInfo: [
      'Visit the official BIS Know Your Standard page.',
      'Search by IS number, keyword, or product category.',
      'Review the standard details, amendments and related information.',
    ],
    relatedStandardIds: [],
    sources: [BIS_SOURCES[0]],
    confidence: 'high',
    verification: 'verified',
    actionLabel: 'Open BIS Know Your Standard',
    actionUrl: BIS_LINKS.knowYourStandard,
    isGuidance: true,
  },
  {
    id: 'svc-bis-pc-overview',
    name: 'Product Certification',
    description:
      'Learn about BIS product certification and conformity assessment procedures.',
    category: 'Certification',
    whoItHelps: ['Manufacturers', 'Importers', 'Entrepreneurs'],
    processInfo: [
      'Review the BIS Product Certification Overview.',
      'Understand the applicable certification scheme for your product.',
      'Follow the official BIS certification process.',
    ],
    relatedStandardIds: [],
    sources: [BIS_SOURCES[2]],
    confidence: 'high',
    verification: 'verified',
    actionLabel: 'Open BIS Product Certification',
    actionUrl: BIS_LINKS.productCertificationOverview,
    isGuidance: true,
  },
  {
    id: 'svc-bis-pc-process',
    name: 'Product Certification Process',
    description:
      'Understand the step-by-step BIS product certification process, from application to grant of licence.',
    category: 'Certification',
    whoItHelps: ['Manufacturers', 'Importers', 'Entrepreneurs'],
    processInfo: [
      'Review the official BIS certification process.',
      'Prepare documentation and product samples as required.',
      'Submit application through the official BIS portal.',
    ],
    relatedStandardIds: [],
    sources: [BIS_SOURCES[3]],
    confidence: 'high',
    verification: 'verified',
    actionLabel: 'Open Certification Process',
    actionUrl: BIS_LINKS.productCertificationProcess,
    isGuidance: true,
  },
  {
    id: 'svc-bis-compulsory',
    name: 'Compulsory Certification',
    description:
      'Check products covered by compulsory BIS certification requirements and related schemes/QCO information.',
    category: 'Compulsory Certification',
    whoItHelps: ['Manufacturers', 'Importers', 'Entrepreneurs'],
    processInfo: [
      'Check if your product is covered by compulsory certification.',
      'Review applicable Quality Control Orders (QCOs).',
      'Understand the compulsory certification scheme requirements.',
    ],
    relatedStandardIds: [],
    sources: [BIS_SOURCES[4]],
    confidence: 'high',
    verification: 'verified',
    actionLabel: 'Check Compulsory Certification',
    actionUrl: BIS_LINKS.compulsoryCertification,
    isGuidance: true,
  },
  {
    id: 'svc-bis-licence',
    name: 'Apply for BIS Licence',
    description:
      'Use the official BIS process and online application resources when a BIS licence is required.',
    category: 'Licensing',
    whoItHelps: ['Manufacturers', 'Entrepreneurs'],
    processInfo: [
      'Review the BIS licence application requirements.',
      'Prepare the necessary documentation and conformity evidence.',
      'Apply through the official BIS online portal (manakonline).',
    ],
    relatedStandardIds: [],
    sources: [BIS_SOURCES[5], BIS_SOURCES[8]],
    confidence: 'high',
    verification: 'verified',
    actionLabel: 'Apply / Learn More',
    actionUrl: BIS_LINKS.applyForLicence,
    isGuidance: true,
  },
  {
    id: 'svc-bis-directory',
    name: 'BIS Directory & Laboratory Services',
    description:
      'Access the official BIS directory for laboratory services and recognised testing facilities.',
    category: 'Testing',
    whoItHelps: ['Manufacturers', 'Researchers', 'Students'],
    processInfo: [
      'Visit the official BIS Directory page.',
      'Search for BIS-recognised/empanelled laboratories.',
      'Verify laboratory recognition status directly with BIS.',
    ],
    relatedStandardIds: [],
    sources: [BIS_SOURCES[6]],
    confidence: 'high',
    verification: 'verified',
    actionLabel: 'Find BIS Laboratories',
    actionUrl: BIS_LINKS.directory,
    isGuidance: true,
  },
  {
    id: 'svc-bis-care',
    name: 'BIS Care App',
    description:
      'Use the official BIS Care mobile app to check product certification status and file complaints.',
    category: 'Consumer Services',
    whoItHelps: ['Consumers', 'Manufacturers'],
    processInfo: [
      'Download the BIS Care app from the official BIS page.',
      'Check if a product carries a valid BIS certification mark.',
      'File complaints about suspected non-compliant products.',
    ],
    relatedStandardIds: [],
    sources: [BIS_SOURCES[7]],
    confidence: 'high',
    verification: 'verified',
    actionLabel: 'Open BIS Care App',
    actionUrl: BIS_LINKS.bisCareApp,
    isGuidance: true,
  },
];

// No fake laboratory records. The Testing Labs page will direct users to official BIS resources.
export const KHOJAI_LABORATORIES: any[] = [];
