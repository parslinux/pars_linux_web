/**
 * ParsLinux Header & Navbar Component
 */

export function renderNavbar(t, currentLang) {
  return `
    <header class="navbar" id="navbar">
      <div class="container nav-container">
        <a href="#" class="brand-logo" id="nav-brand">
          <img src="assets/icons/parslinux-logo.svg" alt="ParsLinux Logo" class="brand-icon">
          <div class="brand-text">
            <span class="brand-name">Pars<span>Linux</span></span>
            <span class="brand-badge">1.0 Anatolian</span>
          </div>
        </a>

        <nav class="nav-menu" id="nav-menu">
          <a href="#features" class="nav-link">${t.nav_features}</a>
          <a href="#editions" class="nav-link">${t.nav_editions}</a>
          <a href="#suite" class="nav-link">${t.nav_suite}</a>
          <a href="#checker" class="nav-link">${t.nav_checker}</a>
          <a href="#repo" class="nav-link">${t.nav_repo}</a>
          <a href="#packages" class="nav-link">${t.nav_packages}</a>
          <a href="#faq" class="nav-link">${t.nav_faq}</a>
        </nav>

        <div class="nav-actions">
          <button class="btn btn-secondary btn-sm lang-toggle-btn" id="lang-toggle-btn" title="Dili Değiştir / Switch Language">
            <span id="lang-flag">${currentLang === 'tr' ? '🇹🇷' : '🇬🇧'}</span>
            <span id="lang-code">${currentLang.toUpperCase()}</span>
          </button>

          <a href="https://github.com/parslinux" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" id="nav-github-btn" title="GitHub Deposu">
            <i data-lucide="github"></i>
            <span>GitHub</span>
          </a>

          <button class="btn btn-primary btn-sm open-dl-modal-btn" id="nav-download-btn">
            <i data-lucide="download"></i>
            <span>${t.nav_download}</span>
          </button>

          <button class="mobile-toggle" id="mobile-toggle" aria-label="Menüyü Aç/Kapat">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  `;
}
