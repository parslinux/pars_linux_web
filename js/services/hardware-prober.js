/**
 * ParsLinux Client-Side Hardware Probing Service
 * Uses browser Navigator and WebGL APIs to inspect device hardware safely without telemetry.
 */

export function probeHardware() {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 8; // GB

  let gpuRenderer = 'Entegre Grafik Birimi';
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        gpuRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      }
    }
  } catch (e) {}

  const res = `${window.screen.width}x${window.screen.height}`;

  return {
    cores,
    memory,
    gpu: gpuRenderer.split('/')[0].trim().substring(0, 28),
    resolution: res
  };
}
