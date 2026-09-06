import { dataSource } from '@/data/prototype-data-source';
import type { BISService } from '@/types/khojai';

export function listServices(): BISService[] {
  return dataSource.getServices();
}

export function getServiceById(id: string): BISService | undefined {
  return dataSource.getServices().find((s) => s.id === id);
}

export function getServiceCategories(): string[] {
  return Array.from(new Set(dataSource.getServices().map((s) => s.category)));
}

export function getServicesForStandard(standardId: string): BISService[] {
  return dataSource.getServices().filter((s) => s.relatedStandardIds.includes(standardId));
}

// Return all services as relevant BIS resources for any standard
export function getAllBISResources(): BISService[] {
  return listServices();
}
