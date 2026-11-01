/**
 * ParsLinux 1.0 (Anatolian) - Main SPA Application Controller
 * Modular ES6+ Architecture
 */

import { I18N } from './data/i18n.js';
import { ParsPackages } from './data/packages.js';
import { showToast } from './services/toast.js';
import { initAmbientCanvas } from './services/canvas.js';
import { probeHardware } from './services/hardware-prober.js';
import { computeFileSha256 } from './services/crypto-verifier.js';
import { fetchLiveAptPackages } from './services/live-repo.js';

import { renderNavbar } from './components/navbar.js';
import { renderHero } from './components/hero.js';
import { renderStats } from './components/stats.js';
import { renderFeatures } from './components/features.js';
import { renderEditions, renderEditionPanels } from './components/editions.js';
import { renderComparison } from './components/comparison.js';
import { renderSuite, renderSuiteDisplay } from './components/suite.js';
import { renderChecker } from './components/checker.js';
import { renderRepo } from './components/repo.js';
import { renderPackages, renderPackageGrid } from './components/packages.js';
import { renderGuide } from './components/guide.js';
import { renderDownloads } from './components/downloads.js';
import { renderFaq } from './components/faq.js';
import { renderFooter } from './components/footer.js';
import { renderModal, renderModalContent } from './components/modal.js';

export const App = {
  lang: localStorage.getItem('parslinux_lang') || 'tr',
  activeEdition: 'gnome',
  activeSuite: 'store',
  activePkgCategory: 'all',
  pkgSearchQuery: '',
  modalSelectedEdition: 'gnome',
  calcPCCount: 5,
  runCheckerCalculation: null,

  init() {
    this.initDomShell();
    this.renderApp();
    this.bindEvents();
    this.initInteractiveChecker();
    initAmbientCanvas();
    this.initTerminalSimulator();
    this.initIsoVerifier();
    this.initComparisonCalc();
    this.initExternalLibraries();
    this.syncLiveAptRepo();
  },

  // Dynamic injection of DOM shell elements
  initDomShell() {
    if (!document.getElementById('ambient-canvas')) {
      const canvas = document.createElement('canvas');
      canvas.id = 'ambient-canvas';
      document.body.prepend(canvas);
    }
    if (!document.querySelector('.ambient-glow')) {
      const g3 = document.createElement('div'); g3.className = 'ambient-glow glow-3';
      const g2 = document.createElement('div'); g2.className = 'ambient-glow glow-2';
      const g1 = document.createElement('div'); g1.className = 'ambient-glow glow-1';
      document.body.insertBefore(g3, document.body.firstChild);
      document.body.insertBefore(g2, document.body.firstChild);
      document.body.insertBefore(g1, document.body.firstChild);
    }
    if (!document.getElementById('toast')) {
      const toast = document.createElement('div');
      toast.className = 'toast-notification';
      toast.id = 'toast';
      toast.innerHTML = `
        <span class="toast-icon"><i data-lucide="check"></i></span>
        <span class="toast-message" id="toast-message">Bildirim</span>
      `;
      document.body.appendChild(toast);
    }
  },

  toggleLanguage() {
    this.lang = this.lang === 'tr' ? 'en' : 'tr';
    localStorage.setItem('parslinux_lang', this.lang);
    this.renderApp();
    this.bindEvents();
    this.initInteractiveChecker();
    this.initTerminalSimulator();
    this.initIsoVerifier();
    this.initComparisonCalc();
    this.initExternalLibraries();
    showToast(this.lang === 'tr' ? 'Dil Türkçe olarak ayarlandı 🇹🇷' : 'Language set to English 🇬🇧');
  },

  renderApp() {
    const root = document.getElementById('app');
    if (!root) return;

    const t = I18N[this.lang] || I18N.tr;
    document.documentElement.lang = this.lang;

    root.innerHTML = `
      ${renderNavbar(t, this.lang)}
      <main>
        ${renderHero(t, this.lang)}
        ${renderStats(t, this.lang)}
        ${renderFeatures(t, this.lang)}
        ${renderEditions(t, this.lang, this.activeEdition)}
        ${renderComparison(t, this.lang, this.calcPCCount)}
        ${renderSuite(t, this.lang, this.activeSuite)}
        ${renderChecker(t)}
        ${renderRepo(t)}
        ${renderPackages(t, this.lang, this.activePkgCategory, this.pkgSearchQuery)}
        ${renderGuide(t, this.lang)}
        ${renderDownloads(t, this.lang)}
        ${renderFaq(t, this.lang)}
      </main>
      ${renderFooter(t)}
      ${renderModal(t, this.lang, this.modalSelectedEdition)}
    `;

    renderEditionPanels(this.lang, this.activeEdition);
    renderSuiteDisplay(this.lang, this.activeSuite);
    renderPackageGrid(this.lang, this.activePkgCategory, this.pkgSearchQuery);
    renderModalContent(this.lang, this.modalSelectedEdition);
  },

  bindEvents() {
    // Navbar scroll listener
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) navbar?.classList.add('scrolled');
      else navbar?.classList.remove('scrolled');
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('open'));
      });
    }

    // Language Toggle
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => this.toggleLanguage());
    }

    // Open Download Modal
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.open-dl-modal-btn');
      if (btn) {
        e.preventDefault();
        const edition = btn.dataset.edition || 'gnome';
        this.openDownloadModal(edition);
      }
    });

    // Close Download Modal
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBackdrop = document.getElementById('download-modal');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => this.closeDownloadModal());
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) this.closeDownloadModal();
      });
    }

    // Modal Edition Tabs
    document.addEventListener('click', (e) => {
      const tab = e.target.closest('.modal-tab');
      if (tab) {
        this.modalSelectedEdition = tab.dataset.modaledition;
        renderModalContent(this.lang, this.modalSelectedEdition);
      }
    });

    // Edition Switcher Tabs
    document.addEventListener('click', (e) => {
      const tab = e.target.closest('.edition-tab');
      if (tab) {
        this.activeEdition = tab.dataset.edition;
        document.querySelectorAll('.edition-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderEditionPanels(this.lang, this.activeEdition);
        this.initExternalLibraries();
      }
    });

    // Suite Tabs
    document.addEventListener('click', (e) => {
      const suiteBtn = e.target.closest('.suite-tab-btn');
      if (suiteBtn) {
        this.activeSuite = suiteBtn.dataset.suite;
        document.querySelectorAll('.suite-tab-btn').forEach(b => b.classList.remove('active'));
        suiteBtn.classList.add('active');
        renderSuiteDisplay(this.lang, this.activeSuite);
        this.initExternalLibraries();
      }
    });

    // Package Explorer Search
    const pkgSearchInput = document.getElementById('pkg-search-input');
    const pkgClearBtn = document.getElementById('pkg-search-clear');
    if (pkgSearchInput) {
      pkgSearchInput.addEventListener('input', (e) => {
        this.pkgSearchQuery = e.target.value;
        if (pkgClearBtn) pkgClearBtn.style.display = this.pkgSearchQuery ? 'flex' : 'none';
        renderPackageGrid(this.lang, this.activePkgCategory, this.pkgSearchQuery);
        this.initExternalLibraries();
      });
    }
    if (pkgClearBtn) {
      pkgClearBtn.addEventListener('click', () => {
        if (pkgSearchInput) pkgSearchInput.value = '';
        this.pkgSearchQuery = '';
        pkgClearBtn.style.display = 'none';
        renderPackageGrid(this.lang, this.activePkgCategory, this.pkgSearchQuery);
        this.initExternalLibraries();
      });
    }

    // Package Category Filters
    document.addEventListener('click', (e) => {
      const catBtn = e.target.closest('.pkg-filter-btn');
      if (catBtn) {
        this.activePkgCategory = catBtn.dataset.cat;
        document.querySelectorAll('.pkg-filter-btn').forEach(b => b.classList.remove('active'));
        catBtn.classList.add('active');
        renderPackageGrid(this.lang, this.activePkgCategory, this.pkgSearchQuery);
        this.initExternalLibraries();
      }
    });

    // Package Install Copy
    document.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('.copy-cmd-btn');
      if (copyBtn) {
        const pkg = copyBtn.dataset.pkg;
        const cmd = `sudo apt install -y ${pkg}`;
        navigator.clipboard.writeText(cmd).then(() => {
          showToast(`Kopyalandı: ${cmd} 📋`);
        });
      }
    });

    // Terminal Commands Copy
    const terminalBtn = document.getElementById('copy-terminal-btn');
    if (terminalBtn) {
      terminalBtn.addEventListener('click', () => {
        const cmd = `# 1. GPG Anahtarını indirin ve keyring dizinine ekleyin:
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://parslinux.github.io/apt_repo/parslinux-archive-keyring.gpg | sudo tee /etc/apt/keyrings/parslinux-archive-keyring.gpg > /dev/null

# 2. ParsLinux 0.1 deposunu ekleyin ve güncelleyin:
echo "deb [signed-by=/etc/apt/keyrings/parslinux-archive-keyring.gpg] https://parslinux.github.io/apt_repo 0.1 main" | sudo tee /etc/apt/sources.list.d/parslinux.list
sudo apt update

# 3. ParsLinux özel araçlarını kurun:
sudo apt install -y pars-base parslinux-welcome parslinux-software`;

        navigator.clipboard.writeText(cmd).then(() => {
          const btnText = document.getElementById('copy-btn-text');
          if (btnText) btnText.textContent = this.lang === 'tr' ? 'Kopyalandı!' : 'Copied!';
          showToast(this.lang === 'tr' ? 'APT Deposu komutları kopyalandı! 📋' : 'APT Repo commands copied! 📋');
          setTimeout(() => {
            if (btnText) btnText.textContent = this.lang === 'tr' ? 'Komutları Kopyala' : 'Copy Commands';
          }, 3000);
        });
      });
    }

    // SHA256 Copy
    document.addEventListener('click', (e) => {
      const shaBtn = e.target.closest('.copy-sha-btn');
      if (shaBtn) {
        e.preventDefault();
        const sha = shaBtn.dataset.sha;
        if (sha) {
          navigator.clipboard.writeText(sha).then(() => {
            showToast(this.lang === 'tr' ? 'Panoya Kopyalandı! 🔐' : 'Copied to Clipboard! 🔐');
          });
        }
      }
    });

    // FAQ Accordion
    document.addEventListener('click', (e) => {
      const question = e.target.closest('.faq-question');
      if (question) {
        const item = question.closest('.faq-item');
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      }
    });

    // Terminal Tabs (Commands vs Interactive Simulator)
    const tabCmds = document.getElementById('tab-term-cmds');
    const tabLive = document.getElementById('tab-term-live');
    const termCodeBody = document.getElementById('terminal-body-code');
    const termLiveBody = document.getElementById('terminal-body-interactive');
    const termHeaderTitle = document.getElementById('terminal-header-title');

    if (tabCmds && tabLive) {
      tabCmds.addEventListener('click', () => {
        tabCmds.classList.add('active');
        tabLive.classList.remove('active');
        if (termCodeBody) termCodeBody.style.display = 'block';
        if (termLiveBody) termLiveBody.style.display = 'none';
        if (termHeaderTitle) termHeaderTitle.textContent = 'bash — pars@parslinux:~ (Komutlar)';
      });

      tabLive.addEventListener('click', () => {
        tabLive.classList.add('active');
        tabCmds.classList.remove('active');
        if (termCodeBody) termCodeBody.style.display = 'none';
        if (termLiveBody) termLiveBody.style.display = 'flex';
        if (termHeaderTitle) termHeaderTitle.textContent = 'bash — pars@parslinux:~ (Canlı İnteraktif Simülatör)';
        const input = document.getElementById('term-interactive-input');
        if (input) input.focus();
      });
    }

    // Auto Probe Hardware
    const probeBtn = document.getElementById('auto-probe-btn');
    if (probeBtn) {
      probeBtn.addEventListener('click', () => this.autoProbeHardware());
    }
  },

  openDownloadModal(edition = 'gnome') {
    this.modalSelectedEdition = edition;
    const modal = document.getElementById('download-modal');
    if (!modal) return;

    renderModalContent(this.lang, this.modalSelectedEdition);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    if (typeof confetti === 'function') {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  },

  closeDownloadModal() {
    const modal = document.getElementById('download-modal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  },

  initInteractiveChecker() {
    const ramSelect = document.getElementById('check-ram');
    const cpuSelect = document.getElementById('check-cpu');
    const diskSelect = document.getElementById('check-disk');

    const badgeEl = document.getElementById('res-badge');
    const scoreEl = document.getElementById('res-score');
    const progressEl = document.getElementById('res-progress');
    const titleEl = document.getElementById('res-title');
    const descEl = document.getElementById('res-desc');
    const btnEl = document.getElementById('res-btn');

    const updateScore = () => {
      if (!ramSelect || !cpuSelect || !diskSelect) return;
      const ram = parseInt(ramSelect.value, 10);
      const cpu = cpuSelect.value;
      const disk = diskSelect.value;
      const isTr = this.lang === 'tr';

      let score = 50;
      let edition = 'XFCE';

      if (ram === 2) score += 15;
      else if (ram === 4) score += 25;
      else if (ram === 8) score += 35;
      else if (ram >= 16) score += 40;

      if (cpu === 'old') score += 5;
      else if (cpu === 'mid') score += 15;
      else if (cpu === 'high') score += 25;

      if (disk === 'ssd') score += 15;
      score = Math.min(score, 99);

      if (ram >= 4 && (cpu === 'mid' || cpu === 'high')) {
        edition = 'GNOME';
      }

      if (scoreEl) scoreEl.textContent = `%${score} ${isTr ? 'Performans Skoru' : 'Performance Score'}`;
      if (progressEl) progressEl.style.width = `${score}%`;

      if (edition === 'GNOME') {
        if (badgeEl) {
          badgeEl.textContent = isTr ? 'Mükemmel Uyum' : 'Perfect Match';
          badgeEl.style.color = '#10b981';
          badgeEl.style.background = 'rgba(16, 185, 129, 0.2)';
        }
        if (titleEl) titleEl.textContent = isTr ? 'Tavsiye Edilen: ParsLinux 1.0 GNOME Edition' : 'Recommended: ParsLinux 1.0 GNOME Edition';
        if (descEl) descEl.textContent = isTr
          ? 'Sisteminiz Pars GNOME Edition\'ı son derece akıcı, zengin görsel efektlerle ve çoklu görev gücüyle çalıştıracaktır.'
          : 'Your system has plenty of power to drive Pars GNOME with smooth animations and multi-tasking.';
        if (btnEl) btnEl.setAttribute('data-edition', 'gnome');
      } else {
        if (badgeEl) {
          badgeEl.textContent = isTr ? 'Hızlı & Hafif' : 'Fast & Efficient';
          badgeEl.style.color = '#38bdf8';
          badgeEl.style.background = 'rgba(14, 165, 233, 0.2)';
        }
        if (titleEl) titleEl.textContent = isTr ? 'Tavsiye Edilen: ParsLinux 1.0 XFCE Edition' : 'Recommended: ParsLinux 1.0 XFCE Edition';
        if (descEl) descEl.textContent = isTr
          ? 'Bilgisayarınızın kaynaklarını en verimli şekilde kullanmak ve anında tepki veren ışık hızında bir deneyim için Pars XFCE sürümünü tercih etmelisiniz (~512 MB RAM).'
          : 'To get the absolute maximum speed and responsiveness with low RAM usage (~512 MB), choose Pars XFCE.';
        if (btnEl) btnEl.setAttribute('data-edition', 'xfce');
      }
    };

    this.runCheckerCalculation = updateScore;

    if (ramSelect && cpuSelect && diskSelect) {
      ramSelect.addEventListener('change', updateScore);
      cpuSelect.addEventListener('change', updateScore);
      diskSelect.addEventListener('change', updateScore);
    }
  },

  autoProbeHardware() {
    const specs = probeHardware();

    const pill = document.getElementById('detected-hardware-pill');
    if (pill) {
      pill.style.display = 'flex';
      pill.innerHTML = `
        <span><i data-lucide="cpu" style="width:14px; height:14px; display:inline-block; vertical-align:middle;"></i> <strong>${specs.cores} Çekirdek</strong> CPU</span>
        <span>•</span>
        <span><i data-lucide="hard-drive" style="width:14px; height:14px; display:inline-block; vertical-align:middle;"></i> <strong>${specs.memory} GB+</strong> Algılanan Bellek</span>
        <span>•</span>
        <span><i data-lucide="monitor" style="width:14px; height:14px; display:inline-block; vertical-align:middle;"></i> <strong>${specs.gpu}</strong></span>
        <span>•</span>
        <span><strong>${specs.resolution}</strong> Ekran</span>
      `;
      if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
    }

    const ramSelect = document.getElementById('check-ram');
    const cpuSelect = document.getElementById('check-cpu');
    const diskSelect = document.getElementById('check-disk');

    if (ramSelect) {
      if (specs.memory >= 16) ramSelect.value = '16';
      else if (specs.memory >= 8) ramSelect.value = '8';
      else if (specs.memory >= 4) ramSelect.value = '4';
      else ramSelect.value = '2';
    }

    if (cpuSelect) {
      if (specs.cores >= 6) cpuSelect.value = 'high';
      else if (specs.cores >= 4) cpuSelect.value = 'mid';
      else cpuSelect.value = 'old';
    }

    if (diskSelect) {
      diskSelect.value = 'ssd';
    }

    if (typeof this.runCheckerCalculation === 'function') {
      this.runCheckerCalculation();
    }

    if (typeof confetti === 'function') {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    }

    showToast(this.lang === 'tr' ? '⚡ Donanımınız başarıyla analiz edildi!' : '⚡ Hardware detected successfully!');
  },

  initTerminalSimulator() {
    const input = document.getElementById('term-interactive-input');
    if (!input) return;

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = input.value.trim();
        if (cmd) {
          this.handleTerminalCommand(cmd);
          input.value = '';
        }
      }
    });

    document.querySelectorAll('.quick-cmd-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (cmd) {
          if (input) input.value = cmd;
          this.handleTerminalCommand(cmd);
        }
      });
    });
  },

  handleTerminalCommand(cmd) {
    const history = document.getElementById('term-output-history');
    if (!history) return;

    let output = '';
    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      history.textContent = `pars@parslinux:~$ `;
      return;
    } else if (lower === 'help' || lower === 'yardım') {
      output = `ParsLinux Canlı Terminal Komutları:
  fastfetch / neofetch       - Sistem ve donanım özetini Pars logosuyla gösterir
  cat /etc/os-release        - Dağıtım sürüm dosyasını yazdırır
  uname -a                   - Linux çekirdek mimarisini gösterir
  apt update                 - Canlı APT deposunu senkronize eder
  apt install <paket>        - ParsLinux paketlerini kurar
  parslinux-info             - Pars 1.0 Anatolian teknik özelliklerini listeler
  clear                      - Ekranı temizler`;
    } else if (lower.includes('fastfetch') || lower.includes('neofetch')) {
      output = `
       .---.          pars@parslinux
      /     \\         --------------
     | () () |        OS: ParsLinux 1.0 (Anatolian) x86_64
      \\  _  /         Host: Modern PC / Virtual Environment
       \`---\`          Kernel: Linux 6.1.0-21-amd64
     /|     |\\        Uptime: 42 days, 13 hours
    (_|     |_)       Packages: 1742 (dpkg), 31 (parslinux-apt)
      |  |  |         Shell: bash 5.2.15
      |  |  |         DE: GNOME 43.9 / XFCE 4.18
     (__)(__)         Terminal: Pars Web Terminal v1.0
                      CPU: Modern x86_64 Architecture
                      Memory: 512MiB / 16384MiB (Idle)`;
    } else if (lower.includes('os-release')) {
      output = `PRETTY_NAME="ParsLinux 1.0 (Anatolian)"
NAME="ParsLinux"
VERSION_ID="1.0"
VERSION="1.0 (Anatolian)"
VERSION_CODENAME="anatolian"
ID=parslinux
ID_LIKE=debian
HOME_URL="https://parslinux.github.io/apt_repo/"
SUPPORT_URL="https://github.com/parslinux"
BUG_REPORT_URL="https://github.com/parslinux"`;
    } else if (lower.includes('uname')) {
      output = `Linux parslinux 6.1.0-21-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.90-1 (2024-05-03) x86_64 GNU/Linux`;
    } else if (lower.startsWith('apt update')) {
      output = `Hit:1 http://deb.debian.org/debian bookworm InRelease
Hit:2 http://security.debian.org/debian-security bookworm-security InRelease
Get:3 https://parslinux.github.io/apt_repo 0.1 InRelease [3,420 B]
Get:4 https://parslinux.github.io/apt_repo 0.1/main amd64 Packages [18.2 kB]
Fetched 21.6 kB in 0s (142 kB/s)
Reading package lists... Done
Building dependency tree... Done
All 31 ParsLinux repository packages are up to date.`;
    } else if (lower.startsWith('apt install')) {
      const pkg = cmd.replace(/apt\s+install\s+(-y\s+)?/i, '').trim() || 'parslinux-welcome';
      output = `Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  ${pkg}
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 890 kB of archives.
Get:1 https://parslinux.github.io/apt_repo 0.1/main amd64 ${pkg} [890 kB]
Selecting previously unselected package ${pkg}.
(Reading database ... 184920 files and directories currently installed.)
Preparing to unpack .../${pkg}.deb ...
Unpacking ${pkg} ...
Setting up ${pkg} ...
Processing triggers for man-db (2.11.2-2) ...
✓ ${pkg} kurulumu başarıyla tamamlandı.`;
    } else if (lower.includes('parslinux-info')) {
      output = `ParsLinux 1.0 (Anatolian)
Taban: Debian 12 Bookworm (Stable)
Mimari: amd64 (x86_64)
Sürümler: GNOME 43+ / XFCE 4.18
Canlı APT Deposu: https://parslinux.github.io/apt_repo/
GitHub: https://github.com/parslinux
Güvenlik: Zero-Trust, 0 Telemetri, Bağımsız Yerli Ekosistem`;
    } else {
      output = `bash: ${cmd}: komut bulunamadı. Kullanılabilir komutları görmek için 'help' yazın.`;
    }

    history.textContent += `\npars@parslinux:~$ ${cmd}\n${output}\n`;
    history.scrollTop = history.scrollHeight;
  },

  initIsoVerifier() {
    const dropzone = document.getElementById('iso-dropzone');
    const fileInput = document.getElementById('iso-file-input');
    if (!dropzone || !fileInput) return;

    ['dragenter', 'dragover'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      }, false);
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length) this.verifyIsoFile(files[0]);
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length) this.verifyIsoFile(e.target.files[0]);
    });
  },

  async verifyIsoFile(file) {
    const progressWrap = document.getElementById('hash-progress-wrap');
    const progressBar = document.getElementById('hash-progress-bar');
    const resultCard = document.getElementById('hash-result-card');
    if (!progressWrap || !progressBar || !resultCard) return;

    progressWrap.style.display = 'block';
    resultCard.style.display = 'none';
    progressBar.style.width = '20%';

    const isTr = this.lang === 'tr';
    showToast(isTr ? `⏳ ${file.name} doğrulanıyor (Web Crypto SHA-256)...` : `⏳ Verifying ${file.name} (Web Crypto SHA-256)...`);

    try {
      const res = await computeFileSha256(file, (percent) => {
        progressBar.style.width = `${percent}%`;
      });

      setTimeout(() => {
        progressWrap.style.display = 'none';
        resultCard.style.display = 'block';

        if (res.matchName) {
          resultCard.className = 'hash-result-card success';
          resultCard.innerHTML = `
            <div style="font-weight:700; font-size:0.95rem; display:flex; align-items:center; gap:8px;">
              <i data-lucide="shield-check" style="color:#10b981;"></i>
              <span>%100 DOĞRULANDI: ${res.matchName}</span>
            </div>
            <div style="margin-top:6px; color:#cbd5e1; word-break:break-all;">
              Dosya: <strong>${res.fileName}</strong> (${res.fileSizeGb} GB)<br>
              SHA-256: <code>${res.hash}</code>
            </div>
          `;
          if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60 });
        } else {
          resultCard.className = 'hash-result-card success';
          resultCard.innerHTML = `
            <div style="font-weight:700; font-size:0.95rem; display:flex; align-items:center; gap:8px; color:#38bdf8;">
              <i data-lucide="check-circle"></i>
              <span>${isTr ? 'SHA-256 Özeti İstemci Tarafında Başarıyla Hesaplandı' : 'SHA-256 Calculated Successfully In-Browser'}</span>
            </div>
            <div style="margin-top:6px; color:#cbd5e1; word-break:break-all;">
              Dosya: <strong>${res.fileName}</strong> (${res.fileSizeMb} MB)<br>
              Hesaplanan SHA-256:<br>
              <code style="color:#38bdf8; font-weight:700;">${res.hash}</code>
            </div>
          `;
        }
        if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
      }, 400);

    } catch (err) {
      progressWrap.style.display = 'none';
      resultCard.style.display = 'block';
      resultCard.className = 'hash-result-card mismatch';
      resultCard.innerHTML = `<div>Hata: ${err.message}</div>`;
    }
  },

  initComparisonCalc() {
    const slider = document.getElementById('pc-count-slider');
    const valText = document.getElementById('pc-count-val');
    const ramText = document.getElementById('calc-ram-saved');
    if (!slider) return;

    slider.addEventListener('input', (e) => {
      const count = parseInt(e.target.value, 10);
      this.calcPCCount = count;
      if (valText) valText.textContent = `${count} PC`;

      const ramSaved = (count * 2.8).toFixed(1);
      const costSaved = count * 4800;
      const costSavedUSD = count * 199;

      if (ramText) {
        if (this.lang === 'tr') {
          ramText.textContent = `${ramSaved} GB RAM • ${costSaved.toLocaleString('tr-TR')} ₺ Tasarruf`;
        } else {
          ramText.textContent = `${ramSaved} GB RAM • $${costSavedUSD.toLocaleString('en-US')} Saved`;
        }
      }
    });
  },

  async syncLiveAptRepo() {
    const res = await fetchLiveAptPackages();
    if (res.status === 'live') {
      console.log('ParsLinux Live APT Packages Synced:', res.length, 'bytes');
    }
  },

  initExternalLibraries() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
    if (typeof VanillaTilt !== 'undefined') {
      const tiltElements = document.querySelectorAll('[data-tilt]');
      VanillaTilt.init(tiltElements, {
        speed: 400,
        glare: false,
        'max-glare': 0.2
      });
    }
  }
};

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
