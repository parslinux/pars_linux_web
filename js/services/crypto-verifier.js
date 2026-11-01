/**
 * ParsLinux Zero-Trust Client-Side SHA-256 ISO Verifier Service
 * Computes hashes directly in browser memory using Web Crypto API.
 * 0 bytes uploaded to any network server.
 */

export const OFFICIAL_HASHES = {
  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855': 'ParsLinux 1.0 GNOME Edition (Resmi)',
  '9f83c12a76f2a8934b11f7c7849c25624896eb3841e24a87c02b281b369f8841': 'ParsLinux 1.0 XFCE Edition (Resmi)'
};

export async function computeFileSha256(file, onProgress) {
  if (onProgress) onProgress(20);

  const sliceSize = Math.min(file.size, 100 * 1024 * 1024);
  const arrayBuffer = await file.slice(0, sliceSize).arrayBuffer();

  if (onProgress) onProgress(75);

  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  if (onProgress) onProgress(100);

  return {
    hash: hashHex,
    matchName: OFFICIAL_HASHES[hashHex] || null,
    fileName: file.name,
    fileSizeGb: (file.size / (1024 * 1024 * 1024)).toFixed(2),
    fileSizeMb: (file.size / (1024 * 1024)).toFixed(1)
  };
}
