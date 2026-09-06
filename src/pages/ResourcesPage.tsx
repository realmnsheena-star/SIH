import { useMemo, useState } from 'react';
import { ShieldCheck, BookOpen, ExternalLink, ChevronDown, ChevronUp, Compass, FileSearch, Info } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import { listSources } from '@/services/sourceService';
import { SourceCard } from '@/components/trust/SourceCard';
import { KHOJAI_DISCLAIMER, BIS_LINKS } from '@/data/prototype-data';

const SECTIONS = [
  {
    icon: BookOpen,
    title: 'How KHOJAI works',
    body: 'KHOJAI takes a product description, interprets it, searches for potentially relevant Indian Standards, explains them in plain language, suggests official BIS resources, proposes a testing path, and builds a compliance roadmap \u2014 all as guidance to help you navigate BIS requirements.',
  },
  {
    icon: Compass,
    title: 'Guidance, not official data',
    body: 'KHOJAI is an informational guidance tool. It is not an official BIS portal. All standards information should be verified on the official BIS website. KHOJAI does not claim to have its own official BIS database.',
  },
  {
    icon: ShieldCheck,
    title: 'Verification',
    body: 'All guidance is marked \u201cVerify with BIS.\u201d You must verify all findings against authoritative BIS sources before real-world use. KHOJAI does not claim to be an official BIS product.',
  },
  {
    icon: FileSearch,
    title: 'Official BIS Resources',
    body: 'KHOJAI links directly to official BIS resources including Know Your Standard, Product Certification, Compulsory Certification, Licence applications, laboratory directory and the BIS Care app. All links open on official BIS domains.',
  },
  {
    icon: Info,
    title: 'Disclaimer',
    body: 'KHOJAI is an informational guidance tool and is not an official BIS portal. Requirements can change. Always verify the latest Indian Standard, amendments, Quality Control Orders, certification scheme and application procedure on the official BIS website before making compliance decisions.',
  },
];

const BIS_RESOURCE_LINKS = [
  { label: 'BIS Know Your Standard', url: BIS_LINKS.knowYourStandard },
  { label: 'BIS Standards Portal', url: BIS_LINKS.standardsPortal },
  { label: 'BIS Product Certification Overview', url: BIS_LINKS.productCertificationOverview },
  { label: 'BIS Product Certification Process', url: BIS_LINKS.productCertificationProcess },
  { label: 'BIS Products under Compulsory Certification', url: BIS_LINKS.compulsoryCertification },
  { label: 'BIS Apply for Licence', url: BIS_LINKS.applyForLicence },
  { label: 'BIS Directory / Laboratory Services', url: BIS_LINKS.directory },
  { label: 'BIS Care App', url: BIS_LINKS.bisCareApp },
  { label: 'BIS Online Application Portal (manakonline)', url: BIS_LINKS.manakonline },
];

export function ResourcesPage() {
  useSeo({
    title: 'Resources & Trust Center \u2014 KHOJAI',
    description: 'Understand how KHOJAI works, access official BIS resources and learn about verification and guidance.',
  });

  const sources = useMemo(() => listSources(), []);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="section-title mb-2">Trust Center</h1>
        <p className="muted">How KHOJAI works, where its data comes from, and what to trust.</p>
      </div>

      {/* Disclaimer banner */}
      <div className="rounded-xl bg-warm/5 border border-warm/15 p-4 mb-8">
        <p className="text-sm text-warm/90 leading-relaxed">{KHOJAI_DISCLAIMER}</p>
      </div>

      {/* Accordion sections */}
      <div className="space-y-3 mb-12">
        {SECTIONS.map((s, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 p-5 text-left"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan shrink-0">
                    <s.icon className="w-4 h-4" />
                  </div>
                  <h2 className="font-display font-semibold text-white text-sm sm:text-base">{s.title}</h2>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pl-[4.5rem]">
                  <p className="text-sm muted leading-relaxed">{s.body}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Official BIS Resources */}
      <div className="mb-12">
        <h2 className="section-title mb-2">Official BIS Resources</h2>
        <p className="muted mb-4">Direct links to official BIS pages. All links open in a new tab.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {BIS_RESOURCE_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover p-4 flex items-center justify-between gap-2 text-sm text-slate-200 hover:text-cyan"
            >
              <span>{link.label}</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* Source Explorer */}
      <div>
        <h2 className="section-title mb-2">Source Explorer</h2>
        <p className="muted mb-4">Official BIS sources referenced by KHOJAI.</p>
        <div className="space-y-3">
          {sources.map((s) => (
            <SourceCard key={s.id} source={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
