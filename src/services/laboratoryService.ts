import { dataSource } from '@/data/prototype-data-source';
import type { Laboratory } from '@/types/khojai';

export function listLaboratories(): Laboratory[] {
  return dataSource.getLaboratories();
}

export function getLaboratoryById(id: string): Laboratory | undefined {
  return dataSource.getLaboratories().find((l) => l.id === id);
}

export function searchLaboratories(_query: string): Laboratory[] {
  return [];
}

export interface LabFilters {
  state?: string;
  testingArea?: string;
  productCategory?: string;
}

export function filterLaboratories(_filters: LabFilters): Laboratory[] {
  return [];
}

export function getLaboratoriesForStandard(_standardId: string): Laboratory[] {
  return [];
}

export function getLabStates(): string[] {
  return [];
}

export function getLabTestingAreas(): string[] {
  return [];
}

export function getLabProductCategories(): string[] {
  return [];
}
