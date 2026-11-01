/**
 * ParsLinux Live APT Repository & Backend Bridge Service
 * Connects to Python FastAPI backend with graceful fallback.
 */

const API_BASE = window.location.port === '8088' ? 'http://127.0.0.1:8000/api' : '/api';

export async function fetchLiveAptPackages() {
  try {
    // 1. Try Python FastAPI Microservice first
    const res = await fetch(`${API_BASE}/packages`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      return { status: 'live', source: 'fastapi', packages: data.packages, total: data.total };
    }
  } catch (e) {
    // Backend offline -> try direct GitHub CDN
  }

  try {
    const res = await fetch('https://parslinux.github.io/apt_repo/dists/0.1/main/binary-amd64/Packages', {
      mode: 'cors',
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      const text = await res.text();
      return { status: 'live', source: 'cdn', rawText: text, length: text.length };
    }
  } catch (err) {
    // Fully offline -> fallback to embedded cache
  }

  return { status: 'cached', source: 'local' };
}

export async function fetchMirrorStatus() {
  try {
    const res = await fetch(`${API_BASE}/mirrors`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {}
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
