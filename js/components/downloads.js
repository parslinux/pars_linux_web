/**
 * ParsLinux Downloads Section & Zero-Trust ISO Verifier Component
 */

export function renderDownloads(t, currentLang) {
  const isTr = currentLang === 'tr';
  const cards = [
    {
      id: 'gnome', title: 'ParsLinux GNOME', version: '1.0 Anatolian • 64-Bit', size: '3.1 GB', highlight: true,
      summary: isTr ? 'Modern görsel arayüz, akıcı animasyonlar, gelişmiş pencere yönetimi ve tam donanım desteği.' : 'Modern visual interface, fluid animations, advanced multi-workspace management.',
      isoFile: 'ParsLinux-1.0-gnome-amd64.iso', sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    {
      id: 'xfce', title: 'ParsLinux XFCE', version: '1.0 Anatolian • 64-Bit', size: '2.4 GB', highlight: false,
      summary: isTr ? 'Ultra düşük bellek kullanımı (~512 MB RAM), hızlı açılış, klasik masaüstü deneyimi ve yüksek FPS optimizasyonu.' : 'Ultra-low RAM consumption (~512 MB), instant responsiveness, and high FPS optimization for gaming.',
      isoFile: 'ParsLinux-1.0-xfce-amd64.iso', sha256: '9f83c12a76f2a8934b11f7c7849c25624896eb3841e24a87c02b281b369f8841'
    }
  ];

  return `
    <section class="download-section" id="download">
      <div class="container">
        <div class="section-header">
          <div class="section-subtitle">${t.dl_subtitle}</div>
          <h2 class="section-title">${t.dl_title}</h2>
          <p class="section-desc">${t.dl_desc}</p>
        </div>
        <div class="download-cards-grid">
          ${cards.map(ed => `
            <div class="dl-card ${ed.highlight ? 'highlighted' : ''}" data-tilt data-tilt-max="6">
              ${ed.highlight ? `<div class="dl-ribbon">${isTr ? 'Popüler Seçim' : 'Popular Choice'}</div>` : ''}
              <div class="dl-header">
                <img src="assets/icons/parslinux-logo.svg" alt="${ed.title}" class="dl-icon">
                <div>
                  <h3 class="dl-name">${ed.title}</h3>
                  <span class="dl-ver">${ed.version}</span>
                </div>
              </div>
              <p class="dl-summary">${ed.summary}</p>
              <div class="dl-meta-list">
                <div class="dl-meta-row"><span>${isTr ? 'Dosya Boyutu:' : 'File Size:'}</span><strong>${ed.size}</strong></div>
                <div class="dl-meta-row"><span>${isTr ? 'Taban Dağıtım:' : 'Base System:'}</span><strong>Debian 12 Bookworm</strong></div>
                <div class="dl-meta-row"><span>${isTr ? 'Çekirdek:' : 'Kernel:'}</span><strong>Linux 6.1+ LTS</strong></div>
              </div>
              <div class="dl-actions">
                <button class="btn btn-primary btn-block open-dl-modal-btn" data-edition="${ed.id}">
                  <i data-lucide="download"></i>
                  <span>${isTr ? 'İndirme Merkezini Aç' : 'Open Download Center'} (${ed.size})</span>
                </button>
                <a href="https://github.com/parslinux" target="_blank" rel="noopener" class="btn btn-outline btn-block">
                  <i data-lucide="github"></i>
                  <span>GitHub Releases</span>
                </a>
              </div>
              <div class="sha-box">
                <div class="sha-label">SHA256 ${isTr ? 'Doğrulama Kodu:' : 'Checksum:'}</div>
                <div class="sha-code-wrap">
                  <code class="sha-code">${ed.sha256}</code>
                  <button class="sha-copy-btn copy-sha-btn" data-sha="${ed.sha256}" title="Copy SHA256">
                    <i data-lucide="copy"></i>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Zero-Trust Client-Side ISO Verifier (Web Crypto API) -->
        <div class="iso-verifier-box" id="iso-dropzone">
          <div class="verifier-header">
            <i data-lucide="shield-check" style="color:#10b981; width:22px; height:22px;"></i>
            <h3 style="font-size:1.1rem; font-weight:700; color:#fff;">${t.iso_verifier_title}</h3>
            <span class="verifier-badge-zero-trust">Zero-Trust • %100 İstemci Taraflı</span>
          </div>
          <p style="color:var(--text-muted); font-size:0.86rem; max-width:680px; margin:0 auto;">
            ${t.iso_verifier_desc}
          </p>

          <label class="dropzone-label" for="iso-file-input">
            <i data-lucide="upload-cloud" style="width:28px; height:28px; color:#38bdf8; margin-bottom:6px;"></i>
            <div style="font-weight:600; font-size:0.92rem; color:#fff;">
              ${isTr ? 'Bilgisayarınızdaki ISO kalıbını seçin veya buraya bırakın' : 'Choose or drop your downloaded ISO file here'}
            </div>
            <div style="font-size:0.75rem; color:var(--text-dim); margin-top:4px;">
              ${isTr ? 'Hesaplama tarayıcı belleğinde Web Crypto ile yapılır (Ağ trafiği: 0 Byte)' : 'Computed in browser memory via Web Crypto (0 bytes sent to network)'}
            </div>
          </label>
          <input type="file" id="iso-file-input" accept=".iso,.img,.sha256" style="display:none;">

          <div class="hash-progress-container" id="hash-progress-wrap">
            <div class="hash-progress-bar" id="hash-progress-bar"></div>
          </div>

          <div class="hash-result-card" id="hash-result-card"></div>
        </div>
      </div>
    </section>
  `;
}
