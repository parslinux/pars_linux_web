/**
 * ParsLinux Hero Section Component
 */

export function renderHero(t, currentLang) {
  const isTr = currentLang === 'tr';
  const tags = isTr ? [
    { icon: 'shield-check', text: 'Debian 12 Tabanlı' },
    { icon: 'gamepad-2', text: 'Oyun ve Sürücü Hazır' },
    { icon: 'eye-off', text: 'Sıfır Telemetri & Tam Gizlilik' },
    { icon: 'sparkles', text: 'Türkçe & Yerli Ekosistem' }
  ] : [
    { icon: 'shield-check', text: 'Debian 12 Based' },
    { icon: 'gamepad-2', text: 'Gaming & Drivers Ready' },
    { icon: 'eye-off', text: 'Zero Telemetry & 100% Privacy' },
    { icon: 'sparkles', text: 'Clean & Native Ecosystem' }
  ];

  return `
    <section class="hero-section" id="hero">
      <div class="container hero-container">
        <div class="hero-content">
          <div class="hero-pill animate-fade-in">
            <span class="pulse-dot"></span>
            <span>${t.hero_pill}</span>
            <span class="pill-arrow">→</span>
          </div>
          
          <h1 class="hero-title animate-slide-up">${t.hero_title}</h1>
          
          <p class="hero-description animate-slide-up delay-1">${t.hero_desc}</p>

          <div class="hero-actions animate-slide-up delay-2">
            <button class="btn btn-primary btn-lg glow-btn open-dl-modal-btn" id="hero-download-btn">
              <i data-lucide="download"></i>
              <span>${t.hero_download_btn}</span>
            </button>
            <a href="#features" class="btn btn-secondary btn-lg" id="hero-explore-btn">
              <i data-lucide="compass"></i>
              <span>${t.hero_explore_btn}</span>
            </a>
            <a href="https://parslinux.github.io/apt_repo/" target="_blank" rel="noopener" class="btn btn-secondary btn-lg" id="hero-repo-btn">
              <i data-lucide="package-search"></i>
              <span>${t.hero_repo_btn}</span>
            </a>
          </div>

          <div class="hero-tags animate-slide-up delay-3">
            ${tags.map(tag => `
              <div class="hero-tag-item">
                <i data-lucide="${tag.icon}" class="tag-icon-svg"></i>
                <span>${tag.text}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Hero Mockup with 3D Tilt -->
        <div class="hero-mockup-wrapper animate-slide-up delay-2" data-tilt data-tilt-max="7">
          <div class="desktop-mockup">
            <div class="mockup-header">
              <div class="window-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <div class="mockup-title">
                <span>ParsLinux 1.0 (Anatolian) — Masaüstü Deneyimi</span>
                <span class="temsili-badge">*Temsili Görsel</span>
              </div>
              <div class="mockup-status">
                <span class="status-indicator"></span> Canlı Sistem
              </div>
            </div>
            <div class="mockup-screen">
              <img src="assets/images/parslinux-hero-desktop.jpg" alt="ParsLinux 1.0 Desktop UI" class="mockup-wallpaper" id="hero-wallpaper">
              
              <div class="floating-badge badge-nvidia" data-tilt data-tilt-max="15">
                <div class="badge-icon-wrap green"><i data-lucide="check-circle-2"></i></div>
                <div>
                  <div class="badge-label">NVIDIA Sürücüsü</div>
                  <div class="badge-sub">Tek tıkla otomatik kuruldu</div>
                </div>
              </div>

              <div class="floating-badge badge-performance" data-tilt data-tilt-max="15">
                <div class="badge-icon-wrap blue"><i data-lucide="zap"></i></div>
                <div>
                  <div class="badge-label">Düşük Bellek Tüketimi</div>
                  <div class="badge-sub">XFCE: ~512 MB • GNOME: ~980 MB</div>
                </div>
              </div>

              <div class="floating-badge badge-store" data-tilt data-tilt-max="15">
                <div class="badge-icon-wrap purple"><i data-lucide="shopping-bag"></i></div>
                <div>
                  <div class="badge-label">Pars Yazılım Merkezi</div>
                  <div class="badge-sub">31+ Yerli Paket & 50.000+ Depo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
