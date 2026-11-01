/**
 * ParsLinux Installation Guide Component
 */

export function renderGuide(t, currentLang) {
  const isTr = currentLang === 'tr';
  const steps = isTr ? [
    { step: 'ADIM 1', icon: 'download-cloud', title: 'ISO Dosyasını İndirin', desc: 'Bilgisayarınıza uygun olan GNOME veya XFCE sürümünü doğrudan veya torrent bağlantısıyla indirin.' },
    { step: 'ADIM 2', icon: 'hard-drive', title: 'USB Belleğe Yazdırın', desc: 'En az 8 GB kapasiteli bir USB belleğe Pars Image Writer, BalenaEtcher veya Rufus ile ISO dosyasını yazdırın.' },
    { step: 'ADIM 3', icon: 'sparkles', title: 'Yeniden Başlatın & Keşfedin', desc: 'Cihazınızı USB üzerinden başlatın. Kurulum yapmadan canlı ortamda deneyin, dilerseniz tek tıkla kurun.' }
  ] : [
    { step: 'STEP 1', icon: 'download-cloud', title: 'Download the ISO', desc: 'Download your choice of GNOME or XFCE edition via direct HTTPS mirror or torrent.' },
    { step: 'STEP 2', icon: 'hard-drive', title: 'Flash to USB', desc: 'Write the ISO to an 8GB+ USB flash drive using Pars Image Writer, BalenaEtcher, or Rufus.' },
    { step: 'STEP 3', icon: 'sparkles', title: 'Boot & Explore', desc: 'Reboot and test ParsLinux in Live USB mode without touching your hard disk, then install when ready.' }
  ];

  return `
    <section class="guide-section" id="guide">
      <div class="container">
        <div class="section-header">
          <div class="section-subtitle">${t.guide_subtitle}</div>
          <h2 class="section-title">${t.guide_title}</h2>
          <p class="section-desc">${t.guide_desc}</p>
        </div>
        <div class="guide-grid">
          ${steps.map(step => `
            <div class="guide-step-card" data-tilt data-tilt-max="8">
              <div class="step-badge">${step.step}</div>
              <div class="step-icon"><i data-lucide="${step.icon}"></i></div>
              <h3 class="step-title">${step.title}</h3>
              <p class="step-desc">${step.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
