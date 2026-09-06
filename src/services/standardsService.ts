import { dataSource } from '@/data/prototype-data-source';
import type { Standard, ConfidenceLevel } from '@/types/khojai';

export function listStandards(): Standard[] {
  return dataSource.getStandards();
}

export function getStandardById(id: string): Standard | undefined {
  return dataSource.getStandards().find((s) => s.id === id);
}

export function getCategories(): string[] {
  return Array.from(new Set(dataSource.getStandards().map((s) => s.category)));
}

export function getTags(): string[] {
  return Array.from(new Set(dataSource.getStandards().flatMap((s) => s.tags)));
}

export function getRelatedStandards(id: string): Standard[] {
  const std = getStandardById(id);
  if (!std) return [];
  return std.relatedStandardIds
    .map((rid) => getStandardById(rid))
    .filter((s): s is Standard => Boolean(s));
}

export interface StandardFilters {
  category?: string;
  tag?: string;
  query?: string;
}

export function filterStandards(filters: StandardFilters): Standard[] {
  const all = listStandards();
  return all.filter((s) => {
    if (filters.category && s.category !== filters.category) return false;
    if (filters.tag && !s.tags.includes(filters.tag)) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase().trim();
      if (!standardMatchesQuery(s, q)) return false;
    }
    return true;
  });
}

// Natural-language search: matches title, code, tags, summary, category,
// and keyword heuristics so product descriptions can find relevant standards.
export function searchStandards(query: string): Standard[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return listStandards().filter((s) => standardMatchesQuery(s, q));
}

function standardMatchesQuery(s: Standard, q: string): boolean {
  const haystack = [s.title, s.code, s.summary, s.category, ...s.tags]
    .join(' ')
    .toLowerCase();
  if (haystack.includes(q)) return true;

  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return false;

  // Keyword heuristics for common product descriptions
  const keywordMap: Record<string, string[]> = {
    toy: ['toy', 'toys', 'children', 'play', 'educational'],
    child: ['toy', 'children', 'child'],
    educational: ['toy', 'educational'],
    wooden: ['toy', 'wood', 'wooden', 'material'],
    plastic: ['plastic', 'material'],
    electronic: ['electronic', 'electronics', 'electrical', 'appliance'],
    electrical: ['electrical', 'electronic', 'appliance'],
    appliance: ['appliance', 'electrical', 'electronic'],
    food: ['food', 'packaged', 'hygiene'],
    water: ['water', 'drinking', 'quality', 'filtration'],
    textile: ['textile', 'garment', 'clothing', 'dye', 'cotton', 'fabric'],
    garment: ['garment', 'textile', 'clothing', 'cotton', 'fabric'],
    paint: ['paint', 'coating', 'chemical'],
    coating: ['paint', 'coating', 'chemical'],
  };

  const matchedTags = new Set<string>();
  for (const token of tokens) {
    const mapped = keywordMap[token];
    if (mapped) mapped.forEach((t) => matchedTags.add(t));
  }
  if (matchedTags.size > 0) {
    return [...matchedTags].some((t) => haystack.includes(t));
  }

  // Fallback: any token matches
  return tokens.some((t) => haystack.includes(t));
}

export function confidenceForStandards(standards: Standard[]): ConfidenceLevel {
  if (standards.length === 0) return 'unknown';
  if (standards.some((s) => s.confidence === 'high')) return 'high';
  if (standards.some((s) => s.confidence === 'medium')) return 'medium';
  return 'low';
}
