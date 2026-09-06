import { dataSource } from '@/data/prototype-data-source';
import type { StandardSource, Citation } from '@/types/khojai';

export function listSources(): StandardSource[] {
  return dataSource.getSources();
}

export function getSourceById(id: string): StandardSource | undefined {
  return dataSource.getSources().find((s) => s.id === id);
}

export function resolveCitations(citations: Citation[]): StandardSource[] {
  return citations
    .map((c) => getSourceById(c.sourceId))
    .filter((s): s is StandardSource => Boolean(s));
}

export function getSourceLabel(source: StandardSource): string {
  if (source.type === 'official-bis') return 'Official BIS resource';
  if (source.type === 'rag') return 'RAG-backed source';
  return source.title;
}
