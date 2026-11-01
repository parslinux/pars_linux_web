/**
 * ParsLinux Native Software Suite Component
 */

export function renderSuite(t, currentLang, activeSuite = 'store') {
  const isTr = currentLang === 'tr';
  const suiteNav = [
    { id: 'store', icon: 'shopping-bag', text: isTr ? 'Pars Yazılım' : 'Pars Software' },
    { id: 'drivers', icon: 'cpu', text: isTr ? 'Sürücü Yükleyici' : 'Driver Installer' },
    { id: 'welcome', icon: 'smile', text: isTr ? 'Hoş Geldiniz' : 'Welcome Center' },
    { id: 'repair', icon: 'wrench', text: isTr ? 'Önyükleme Onarıcı' : 'Boot Repair' },
    { id: 'writer', icon: 'disc', text: isTr ? 'Kalıp Yazıcı' : 'Image Writer' },
    { id: 'mycomputer', icon: 'monitor', text: isTr ? 'Bilgisayarım' : 'My Computer' }
  ];

  return `
    <section class="suite-section" id="suite">
      <div class="container">
        <div class="section-header">
          <div class="section-subtitle">${t.suite_subtitle}</div>
          <h2 class="section-title">${t.suite_title}</h2>
          <p class="section-desc">${t.suite_desc}</p>
        </div>
        <div class="suite-tabs-nav" id="suite-tabs-container">
          ${suiteNav.map(item => `
            <button class="suite-tab-btn ${item.id === activeSuite ? 'active' : ''}" data-suite="${item.id}">
              <i data-lucide="${item.icon}" class="suite-tab-icon"></i>
              <span>${item.text}</span>
            </button>
          `).join('')}
        </div>
        <div class="suite-display-card" id="suite-display-container"></div>
      </div>
    </section>
  `;
}

export function renderSuiteDisplay(currentLang, activeSuite = 'store') {
  const displayContainer = document.getElementById('suite-display-container');
  if (!displayContainer) return;

  const isTr = currentLang === 'tr';
  const suiteItems = {
    store: {
      badge: isTr ? 'Uygulama Mağazası' : 'Software Store',
      title: isTr ? 'Pars Yazılım Merkezi (Pars Software)' : 'Pars Software Center',
      desc: isTr
        ? "Favori uygulamalarınızı, oyunlarınızı ve geliştirici araçlarınızı tek tıkla bulun ve yükleyin. Debian APT deposu ve Flatpak entegrasyonuyla 50.000'den fazla zengin yazılım kataloğu elinizin altında."
        : "Discover, install, and update apps, development tools, and games with 1-click. Seamlessly integrates with Debian APT repositories and Flatpak.",
      features: isTr ? [
        'Tek Tıkla Kurulum & Güncelleme',
        'Kategorilere Göre Keşif (Oyun, Geliştirme, Ofis)',
        'Güvenli ve Doğrulanmış Paket Kaynakları'
      ] : [
        'One-Click Installation & Updates',
        'Curated Categories (Gaming, Dev, Office)',
        'Cryptographically Verified Repositories'
      ],
      windowTitle: 'Pars Yazılım Merkezi (parslinux-software)',
      renderBody: () => `
        <div class="app-store-mockup">
          <div class="store-sidebar">
            <div class="store-nav active">🔥 ${isTr ? 'Keşfet' : 'Discover'}</div>
            <div class="store-nav">🎮 ${isTr ? 'Oyunlar' : 'Games'}</div>
            <div class="store-nav">💻 ${isTr ? 'Geliştirme' : 'Dev'}</div>
            <div class="store-nav">🎨 ${isTr ? 'Grafik' : 'Graphics'}</div>
            <div class="store-nav">⚙️ ${isTr ? 'Sistem' : 'System'}</div>
          </div>
          <div class="store-items-grid">
            <div class="store-item-card">
              <div class="store-item-icon">🚀</div>
              <div class="store-item-name">VS Code</div>
              <button class="store-btn-installed">${isTr ? 'Yüklü' : 'Installed'}</button>
            </div>
            <div class="store-item-card">
              <div class="store-item-icon">🎮</div>
              <div class="store-item-name">Steam</div>
              <button class="store-btn-install">${isTr ? 'Kur' : 'Install'}</button>
            </div>
            <div class="store-item-card">
              <div class="store-item-icon">🌐</div>
              <div class="store-item-name">Firefox</div>
              <button class="store-btn-installed">${isTr ? 'Yüklü' : 'Installed'}</button>
            </div>
            <div class="store-item-card">
              <div class="store-item-icon">🎵</div>
              <div class="store-item-name">Spotify</div>
              <button class="store-btn-install">${isTr ? 'Kur' : 'Install'}</button>
            </div>
          </div>
        </div>
      `
    },
    drivers: {
      badge: isTr ? 'Donanım & Sürücü Yönetimi' : 'Hardware & Driver Wizard',
      title: isTr ? 'Pars Sürücü Yükleyici (NVIDIA & AMD/Intel)' : 'Pars Hardware & Driver Installer',
      desc: isTr
        ? 'Ekran kartınızı ve tescilli çevre birimlerinizi otomatik olarak algılar. İnternette rehber aramaya gerek kalmadan tek tıkla resmi sürücüyü kurar.'
        : 'Automatically detects your GPU and peripherals, configuring the optimal proprietary drivers with zero manual terminal commands.',
      features: isTr ? [
        'NVIDIA GeForce & RTX Otomatik Tespiti',
        'AMD Radeon & Intel Hibrit Grafik Desteği',
        'DirectX ve Vulkan Oyun Katmanı Hazırlığı'
      ] : [
        'NVIDIA GeForce & RTX Auto-Detection',
        'AMD Radeon & Intel Hybrid Switchable Graphics',
        'Ready-to-game Vulkan & DirectX runtime'
      ],
      windowTitle: 'Pars Sürücü Yükleyici (parslinux-nvidia-installer)',
      renderBody: () => `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); padding:12px; border-radius:8px; display:flex; align-items:center; gap:10px;">
            <span style="color:#10b981; font-size:1.2rem;">✓</span>
            <div>
              <div style="font-weight:700; color:#fff; font-size:0.9rem;">${isTr ? 'Algılanan Donanım:' : 'Detected GPU:'} NVIDIA GeForce RTX 3060 Mobile</div>
              <div style="color:#94a3b8; font-size:0.78rem;">${isTr ? 'Önerilen Sürücü:' : 'Recommended:'} nvidia-driver (535.183.01 - Stable)</div>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:14px; border-radius:8px;">
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
              <input type="radio" name="driver-opt" checked style="accent-color:#0ea5e9;">
              <span style="font-size:0.88rem; color:#fff; font-weight:600;">nvidia-driver (Recommended Proprietary Driver)</span>
            </label>
          </div>
          <div style="display:flex; justify-content:flex-end;">
            <button style="background:#10b981; color:#fff; border:none; border-radius:6px; padding:8px 18px; font-weight:700; font-size:0.85rem; cursor:pointer;">
              ${isTr ? 'Sürücüyü Uygula ve Başlat' : 'Apply & Activate Driver'}
            </button>
          </div>
        </div>
      `
    },
    welcome: {
      badge: isTr ? 'İlk Başlangıç Sihirbazı' : 'Onboarding Wizard',
      title: isTr ? 'Pars Hoş Geldiniz (parslinux-welcome)' : 'Pars Welcome Center',
      desc: isTr
        ? 'Kurulumdan sonra sistemi ilk kez açtığınızda sizi karşılar. Renk temasını seçebilir, sürücüleri kontrol edebilir ve temel uygulamaları yapılandırabilirsiniz.'
        : 'Greets you after initial installation. Customize system themes, verify hardware drivers, and setup default browsers in seconds.',
      features: isTr ? [
        'Kişiselleştirilebilir Açık/Koyu Tema',
        'Temel Yazılım ve Tarayıcı Seçim Sihirbazı',
        'Belgelendirme ve Topluluk Linkleri'
      ] : [
        'Customizable Dark/Light themes',
        'Default Browser & Essential Software Wizard',
        'Documentation & Community Support Shortcuts'
      ],
      windowTitle: 'ParsLinux 1.0 Anatolian — Welcome',
      renderBody: () => `
        <div style="text-align:center; padding:10px 0;">
          <h4 style="color:#fff; font-size:1.15rem; margin-bottom:8px;">${isTr ? 'ParsLinux Dünyasına Hoş Geldiniz! 🇹🇷' : 'Welcome to ParsLinux!'}</h4>
          <p style="color:#94a3b8; font-size:0.85rem; max-width:380px; margin:0 auto 18px;">
            ${isTr ? 'Sisteminizi dilediğiniz gibi özelleştirmek için aşağıdaki adımları takip edebilirsiniz.' : 'Personalize your desktop experience in just a few clicks.'}
          </p>
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px;">
            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:12px; border-radius:8px;">
              <div style="font-size:1.3rem; margin-bottom:4px;">🎨</div>
              <div style="font-size:0.82rem; font-weight:600; color:#fff;">${isTr ? 'Görünüm' : 'Appearance'}</div>
            </div>
            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:12px; border-radius:8px;">
              <div style="font-size:1.3rem; margin-bottom:4px;">🚀</div>
              <div style="font-size:0.82rem; font-weight:600; color:#fff;">${isTr ? 'Sürücüler' : 'Drivers'}</div>
            </div>
            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:12px; border-radius:8px;">
              <div style="font-size:1.3rem; margin-bottom:4px;">📦</div>
              <div style="font-size:0.82rem; font-weight:600; color:#fff;">${isTr ? 'Uygulamalar' : 'Apps'}</div>
            </div>
          </div>
        </div>
      `
    },
    repair: {
      badge: isTr ? 'Kurtarma & Onarım' : 'Rescue & Recovery',
      title: isTr ? 'Pars Önyükleme Onarıcı (Boot Repair)' : 'Pars Boot Repair & GRUB Recovery',
      desc: isTr
        ? 'Windows güncellemeleri sonrası silinen GRUB açılış menüsünü veya bozulan EFI yapılandırmalarını tek tıkla otomatik olarak onarır.'
        : 'Automatically fixes corrupted EFI boot records and restores Windows Dual-Boot options after system updates.',
      features: isTr ? [
        'Otomatik GRUB Yeniden Yükleme',
        'Dual-Boot Windows Algılama ve Ek Açılış Kaydı',
        'EFI Bölümü Sağlık Taraması'
      ] : [
        'Automatic GRUB Reinstallation',
        'Dual-Boot Windows OS Auto-Detection',
        'EFI Partition Health & Flag Diagnostics'
      ],
      windowTitle: 'Pars Boot Repair — Recovery',
      renderBody: () => `
        <div style="display:flex; flex-direction:column; gap:14px;">
          <div style="background:rgba(14,165,233,0.1); border:1px solid rgba(14,165,233,0.3); padding:12px; border-radius:8px;">
            <div style="color:#38bdf8; font-weight:700; font-size:0.88rem;">${isTr ? 'Sistem Durumu: Taranıyor...' : 'Status: Scanning partitions...'}</div>
            <div style="color:#94a3b8; font-size:0.8rem;">GRUB: 2.06 • Detected: ParsLinux 1.0, Windows 11</div>
          </div>
          <button style="background:linear-gradient(135deg, #0ea5e9, #2563eb); color:#fff; border:none; padding:12px; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.9rem;">
            🔧 ${isTr ? '1-Tıkla Önyüklemeyi Onar (Tavsiye Edilen)' : '1-Click Repair Bootloader (Recommended)'}
          </button>
        </div>
      `
    },
    writer: {
      badge: isTr ? 'Medya Yazma' : 'Media Creator',
      title: isTr ? 'Pars Kalıp Yazıcı (Pars Image Writer)' : 'Pars USB Image Writer',
      desc: isTr
        ? 'İndirdiğiniz ISO kalıplarını saniyeler içinde USB belleklere yazın. Ekstra programlara gerek kalmadan tak ve yazdır.'
        : 'Burn downloaded ISO images directly to USB flash drives with verification and zero hassle.',
      features: isTr ? [
        'Otomatik USB Bellek Tespiti',
        'Blok Tabanlı (dd) Hızlı ve Doğrudan Yazma',
        'Yazma Sonrası Bütünlük Doğrulama'
      ] : [
        'Automatic USB Flash Drive Detection',
        'Raw block (dd) high-speed writing engine',
        'Post-write SHA256 integrity check'
      ],
      windowTitle: 'Pars Kalıp Yazıcı (pars-image-writer)',
      renderBody: () => `
        <div style="display:flex; flex-direction:column; gap:14px;">
          <div>
            <label style="color:#94a3b8; font-size:0.8rem; display:block; margin-bottom:4px;">${isTr ? 'Seçilen Kalıp Dosyası (ISO):' : 'Selected ISO Image:'}</label>
            <div style="background:rgba(255,255,255,0.05); padding:8px 12px; border-radius:6px; font-family:monospace; font-size:0.82rem; color:#fff;">
              ParsLinux-1.0-gnome-amd64.iso (3.1 GB)
            </div>
          </div>
          <div>
            <label style="color:#94a3b8; font-size:0.8rem; display:block; margin-bottom:4px;">${isTr ? 'Hedef USB Bellek:' : 'Target USB Drive:'}</label>
            <div style="background:rgba(255,255,255,0.05); padding:8px 12px; border-radius:6px; font-size:0.85rem; color:#fff;">
              SanDisk Ultra USB 3.0 (31.9 GB) — /dev/sdb
            </div>
          </div>
          <button style="background:#0ea5e9; color:#fff; border:none; padding:10px; border-radius:6px; font-weight:700; cursor:pointer;">
            💾 ${isTr ? "USB'ye Yazdır" : 'Flash to USB'}
          </button>
        </div>
      `
    },
    mycomputer: {
      badge: isTr ? 'Sistem Bilgisi' : 'System Specs',
      title: isTr ? 'Pars Bilgisayarım (parslinux-mycomputer)' : 'Pars System & Hardware Monitor',
      desc: isTr
        ? 'Bilgisayarınızın tüm donanım özelliklerini, işlemci sıcaklıklarını, RAM kullanımını ve disk durumunu tek ekranda gösterir.'
        : 'Displays system hardware specs, CPU temps, live memory usage, and storage drive health in a clean dashboard.',
      features: isTr ? [
        'Detaylı Donanım Özeti (CPU, GPU, RAM, Anakart)',
        'Anlık Sıcaklık ve Fan Hızı Takibi',
        'Disk Doluluk ve Sağlık Raporu'
      ] : [
        'Comprehensive hardware summary (CPU, GPU, RAM)',
        'Live thermal sensors and load statistics',
        'Drive partition usage and SMART health'
      ],
      windowTitle: 'Bilgisayarım — System Info',
      renderBody: () => `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:12px; border-radius:8px;">
            <div style="color:#64748b; font-size:0.75rem;">${isTr ? 'İŞLETİM SİSTEMİ' : 'OPERATING SYSTEM'}</div>
            <div style="color:#fff; font-weight:700; font-size:0.88rem;">ParsLinux 1.0 (Anatolian)</div>
            <div style="color:#38bdf8; font-size:0.75rem;">Kernel: 6.1.0-21-amd64</div>
          </div>
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:12px; border-radius:8px;">
            <div style="color:#64748b; font-size:0.75rem;">${isTr ? 'İŞLEMCİ' : 'PROCESSOR'}</div>
            <div style="color:#fff; font-weight:700; font-size:0.88rem;">AMD Ryzen 5 5600H</div>
            <div style="color:#10b981; font-size:0.75rem;">12 Threads • 42°C</div>
          </div>
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:12px; border-radius:8px;">
            <div style="color:#64748b; font-size:0.75rem;">${isTr ? 'BELLEK (RAM)' : 'MEMORY (RAM)'}</div>
            <div style="color:#fff; font-weight:700; font-size:0.88rem;">16.0 GB DDR4</div>
            <div style="color:#e2e8f0; font-size:0.75rem;">Used: 1.8 GB / 15.6 GB</div>
          </div>
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:12px; border-radius:8px;">
            <div style="color:#64748b; font-size:0.75rem;">${isTr ? 'GRAFİK KARTI' : 'GRAPHICS'}</div>
            <div style="color:#fff; font-weight:700; font-size:0.88rem;">NVIDIA GeForce RTX 3060</div>
            <div style="color:#a855f7; font-size:0.75rem;">VRAM: 6 GB GDDR6</div>
          </div>
        </div>
      `
    }
  };

  const current = suiteItems[activeSuite] || suiteItems.store;
  displayContainer.innerHTML = `
    <div class="suite-card-inner">
      <div class="suite-card-text">
        <div class="suite-card-badge">${current.badge}</div>
        <h3 class="suite-card-title">${current.title}</h3>
        <p class="suite-card-desc">${current.desc}</p>
        <div class="suite-card-features">
          ${current.features.map(f => `<span class="badge-feature">${f}</span>`).join('')}
        </div>
      </div>
      <div class="suite-card-visual" data-tilt data-tilt-max="6">
        <div class="tool-window">
          <div class="tool-window-header">
            <span class="tool-window-btn red"></span>
            <span class="tool-window-btn yellow"></span>
            <span class="tool-window-btn green"></span>
            <span class="tool-window-title">${current.windowTitle}</span>
          </div>
          <div class="tool-window-body">
            ${current.renderBody()}
          </div>
        </div>
      </div>
    </div>
  `;
}
