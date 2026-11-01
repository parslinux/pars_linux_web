/**
 * ParsLinux Live APT Repository & Backend Bridge Service
 * Connects to Python FastAPI backend locally, or directly parses
 * live Debian RFC822 repository index on GitHub Pages.
 */

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE = isLocal ? 'http://127.0.0.1:8000/api' : null;

function parseClientRFC822(text) {
  const blocks = text.split(/\n\n+/);
  const packages = [];
  for (const block of blocks) {
    if (!block.trim()) continue;
    const lines = block.split('\n');
    const pkg = {};
    for (const line of lines) {
      const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (match) {
        pkg[match[1].toLowerCase()] = match[2].trim();
      }
    }
    if (pkg.package) {
      const sizeBytes = parseInt(pkg.size || '0', 10);
      const sizeFormatted = sizeBytes >= 1048576 
        ? `${(sizeBytes / 1048576).toFixed(1)} MB` 
        : `${Math.round(sizeBytes / 1024) || 12} KB`;

      packages.push({
        name: pkg.package,
        version: pkg.version || '1.0.0',
        arch: pkg.architecture || 'amd64',
        size: sizeFormatted,
        category: pkg.section || 'system',
        desc_tr: pkg.description || pkg.package,
        desc_en: pkg.description || pkg.package
      });
    }
  }
  return packages;
}

export async function fetchLiveAptPackages() {
  // 1. Try Python FastAPI Microservice if running locally
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/packages`, { signal: AbortSignal.timeout(2500) });
      if (res.ok) {
        const data = await res.json();
        return { status: 'live', source: 'fastapi', packages: data.packages, total: data.total };
      }
    } catch (e) {
      // Backend offline -> continue to direct GitHub CDN
    }
  }

  // 2. Fetch directly from official ParsLinux APT GitHub Pages CDN
  try {
    const res = await fetch('https://parslinux.github.io/apt_repo/dists/0.1/main/binary-amd64/Packages', {
      mode: 'cors',
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      const text = await res.text();
      const parsed = parseClientRFC822(text);
      return { status: 'live', source: 'github_cdn', packages: parsed, total: parsed.length, length: text.length };
    }
  } catch (err) {
    // Fully offline -> fallback to local static catalog
  }

  return { status: 'cached', source: 'local' };
}

export async function fetchMirrorStatus() {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/mirrors`, { signal: AbortSignal.timeout(2500) });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}
  }
  return null;
}

export async function recordDownloadMetrics(edition) {
  try {
    await fetch(`${API_BASE}/downloads/count`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ edition }),
      signal: AbortSignal.timeout(2000)
    });
  } catch (e) {}
}

export async function fetchDownloadStats() {
  try {
    const res = await fetch(`${API_BASE}/downloads/stats`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {}
  return null;
}
