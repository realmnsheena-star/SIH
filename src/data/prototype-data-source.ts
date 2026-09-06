// KHOJAI data source — the single provider for KHOJAI's guidance data.
// A future official/RAG-backed provider can implement the same interface and
// replace this one without any UI changes.

import type {
  Standard,
  BISService,
  Laboratory,
  ProductProfile,
  StandardSource,
  DataProvenance,
} from '@/types/khojai';
import {
  KHOJAI_STANDARDS,
  KHOJAI_SERVICES,
  KHOJAI_LABORATORIES,
  BIS_SOURCES,
} from './prototype-data';

export interface DataSourceProvider {
  readonly provider: 'official' | 'rag';
  getStandards(): Standard[];
  getServices(): BISService[];
  getLaboratories(): Laboratory[];
  getProductProfiles(): ProductProfile[];
  getSources(): StandardSource[];
  getProvenance(): DataProvenance;
}

const provenance: DataProvenance = {
  provider: 'official',
  label: 'Guidance content',
  generatedAt: new Date().toISOString(),
  verification: 'verify-with-bis',
  notes:
    'KHOJAI provides guidance to help you understand BIS requirements. Always verify the latest standard, amendments and certification requirements on the official BIS website.',
};

export const khojaiDataSource: DataSourceProvider = {
  provider: 'official',
  getStandards: () => KHOJAI_STANDARDS,
  getServices: () => KHOJAI_SERVICES,
  getLaboratories: () => KHOJAI_LABORATORIES,
  getProductProfiles: () => [],
  getSources: () => BIS_SOURCES,
  getProvenance: () => provenance,
};

// The active provider. Swap this to a RAG provider later.
export const dataSource: DataSourceProvider = khojaiDataSource;
