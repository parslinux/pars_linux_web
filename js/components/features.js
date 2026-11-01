/**
 * ParsLinux Features Section Component
 */

export function renderFeatures(t, currentLang) {
  const isTr = currentLang === 'tr';
  const features = isTr ? [
    {
      icon: 'shield', glow: 'cyan-glow', title: 'Debian Kararlılığı',
      text: 'Dünyanın en güvenilir işletim sistemi çekirdeği üzerine inşa edildi. Çökme veya mavi ekran geçmişte kalır.',
      items: ['Uzun vadeli destek (LTS) altyapısı', 'Minimum kaynak tüketimi, yüksek verim']
    },
    {
      icon: 'cpu', glow: 'green-glow', title: 'Tek Tıkla Grafik Sürücüsü',
      text: 'NVIDIA ve AMD/Intel ekran kartlarınızı tanıtmak için internette rehber aramanıza gerek yok.',
      items: ['Pars NVIDIA Installer ile otomatik tespit', 'Hibrit grafik (Optimus/Prime) tam desteği']
    },
    {
      icon: 'gamepad', glow: 'purple-glow', title: 'Oyun ve Eğlence Hazır',
      text: 'Steam, Proton ve Wine optimizasyonları sayesinde binlerce Windows oyununu tam performansla oynayın.',
      items: ['Vulkan ve DirectX uyumluluk katmanı', 'Oyun kolları (Gamepad) tak-çalıştır']
    },
    {
      icon: 'lock', glow: 'orange-glow', title: 'Gizlilik ve Bağımsızlık',
      text: 'Sizi gizlice izleyen telemetriler veya zorunlu hesap dayatmaları yoktur. Verileriniz daima size aittir.',
      items: ['Sıfır veri toplama hakkı', 'İnternetsiz tam çevrimdışı çalışma']
    },
    {
      icon: 'terminal', glow: 'blue-glow', title: 'Geliştirici Dostu Ortam',
      text: 'Git, Docker, Python, Node.js, C/C++, Rust ve modern geliştirici araçları sistemle kusursuz uyum sağlar.',
      items: ['ZSH & Bash zenginleştirilmiş kabuk', 'Doğrudan Debian & Pars APT depoları']
    },
    {
      icon: 'wrench', glow: 'emerald-glow', title: 'Sistem Kurtarma Araçları',
      text: 'Açılış sorunları, yanlışlıkla silinen GRUB önyükleyicisi veya disk formatlama işlerine anında çözüm.',
      items: ['Pars Boot Repair ile tek tık onarım', 'Pars Formatter ile hızlı disk hazırlığı']
    }
  ] : [
    {
      icon: 'shield', glow: 'cyan-glow', title: 'Debian Stability',
      text: 'Engineered on the world\'s most dependable Linux foundation. Blue screens and crashes are a thing of the past.',
      items: ['Long-Term Support (LTS) core', 'Minimal footprint, maximum throughput']
    },
    {
      icon: 'cpu', glow: 'green-glow', title: '1-Click GPU Drivers',
      text: 'No need to search forum guides for proprietary NVIDIA or AMD/Intel GPU drivers.',
      items: ['Automatic hardware detection wizard', 'Hybrid graphics (Optimus/Prime) supported']
    },
    {
      icon: 'gamepad', glow: 'purple-glow', title: 'Gaming Out of the Box',
      text: 'Play thousands of modern Windows games smoothly via Steam Proton, Wine, and Vulkan optimizations.',
      items: ['Vulkan & DirectX compatibility layer', 'Plug-and-play controller support']
    },
    {
      icon: 'lock', glow: 'orange-glow', title: 'Complete Privacy',
      text: 'No hidden background telemetry, tracking, or mandatory online account mandates.',
      items: ['Zero data harvesting policy', 'Fully functional without internet connection']
    },
    {
      icon: 'terminal', glow: 'blue-glow', title: 'Developer Paradise',
      text: 'Git, Docker, Python, Node.js, C/C++, and Rust run natively with zero friction.',
      items: ['Enhanced ZSH & Bash terminal integration', 'Direct access to Debian & Pars repositories']
    },
    {
      icon: 'wrench', glow: 'emerald-glow', title: 'System Recovery Tools',
      text: 'Instant one-click solutions for broken GRUB bootloaders, dual-boot boot menus, and drive formatting.',
      items: ['Pars Boot Repair 1-click rescue', 'Pars Formatter disk preparation tool']
    }
  ];

  return `
    <section class="features-section" id="features">
      <div class="container">
        <div class="section-header">
          <div class="section-subtitle">${t.feat_subtitle}</div>
          <h2 class="section-title">${t.feat_title}</h2>
          <p class="section-desc">${t.feat_desc}</p>
        </div>
        <div class="features-grid">
          ${features.map(f => `
            <div class="feature-card" data-tilt data-tilt-max="8">
              <div class="feature-icon-box ${f.glow}">
                <i data-lucide="${f.icon}"></i>
              </div>
              <h3 class="feature-title">${f.title}</h3>
              <p class="feature-text">${f.text}</p>
              <ul class="feature-list">
                ${f.items.map(item => `<li><span class="check-icon">✓</span> ${item}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
