/**
 * ParsLinux Stats Section Component
 */

export function renderStats(t, currentLang) {
  const isTr = currentLang === 'tr';
  const stats = isTr ? [
    { number: '%100', label: 'Özgür & Açık Kaynak', desc: 'Hiçbir gizli telemetri veya kısıtlama barındırmaz. GPL v3 lisanslıdır.' },
    { number: '< 512 MB', label: 'Boşta Bellek Tüketimi', desc: 'XFCE sürümü en mütevazı donanımlara bile ikinci bir hayat verir.' },
    { number: '31+ / 50.000+', label: 'Paket & Canlı Depo', desc: 'Özel Pars araçları ve Debian APT depoları doğrudan elinizin altında.' },
    { number: '0 TL', label: 'Sonsuza Kadar Ücretsiz', desc: 'Hem bireysel hem de kurumsal kullanımda tamamen özgür ve ücretsiz.' }
  ] : [
    { number: '100%', label: 'Free & Open Source', desc: 'Zero commercial telemetry or hidden telemetry. Licensed under GNU GPL v3.' },
    { number: '< 512 MB', label: 'Idle Memory Usage', desc: 'XFCE edition gives any low-spec machine a lightning fast second life.' },
    { number: '31+ / 50,000+', label: 'Packages & Live Repo', desc: 'Native Pars tools and complete Debian repositories at your fingertips.' },
    { number: '$0', label: 'Free Forever', desc: 'Completely free for personal, educational, and commercial deployments.' }
  ];

  return `
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          ${stats.map(item => `
            <div class="stat-card" data-tilt data-tilt-max="10">
              <div class="stat-number">${item.number}</div>
              <div class="stat-label">${item.label}</div>
              <div class="stat-desc">${item.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
