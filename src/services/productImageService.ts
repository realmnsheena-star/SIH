import type { ProductVisualization, ProductProfile } from '@/types/khojai';

// Product visualization service.
// Generates a deterministic local SVG placeholder based on the product profile.
// Does NOT call any external/paid image API.

export function generateVisualization(profile: ProductProfile): ProductVisualization {
  const seed = hashString(profile.name + profile.description);
  const hue = seed % 360;
  const svg = buildSvgPlaceholder(profile, hue);
  const imageUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return {
    productProfileId: profile.id,
    imageUrl,
    label: 'Concept visualization',
    disclaimer:
      'Concept visualization only — not a technical drawing or certification evidence.',
    isGuidance: true,
  };
}

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function buildSvgPlaceholder(profile: ProductProfile, hue: number): string {
  const initial = profile.name.trim().charAt(0).toUpperCase() || 'P';
  const category = profile.interpretedCategory;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue}, 40%, 18%)"/>
      <stop offset="100%" stop-color="hsl(${(hue + 40) % 360}, 45%, 10%)"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#g)"/>
  <circle cx="200" cy="120" r="56" fill="rgba(34,211,238,0.15)" stroke="#22d3ee" stroke-width="2"/>
  <text x="200" y="138" font-family="Space Grotesk, Inter, sans-serif" font-size="48" font-weight="700" fill="#67e8f9" text-anchor="middle">${initial}</text>
  <text x="200" y="210" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#e2e8f0" text-anchor="middle">${escapeXml(profile.name)}</text>
  <text x="200" y="234" font-family="Inter, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">${escapeXml(category)}</text>
  <text x="200" y="276" font-family="Inter, sans-serif" font-size="10" fill="#94a3b8" text-anchor="middle">Concept visualization</text>
</svg>`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
