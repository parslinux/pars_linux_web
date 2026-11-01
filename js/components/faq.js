/**
 * ParsLinux FAQ Section Component
 */

export function renderFaq(t, currentLang) {
  const isTr = currentLang === 'tr';
  const items = isTr ? [
    { q: "ParsLinux'u Windows'un yanına (Dual-Boot) kurabilir miyim?", a: "Evet, kesinlikle! Pars kurulum sihirbazı mevcut Windows diskinizi otomatik olarak algılar ve 'Windows'un Yanına Kur' seçeneği sunar. Bilgisayarınızı her açtığınızda GRUB menüsünden seçim yapabilirsiniz." },
    { q: "NVIDIA ekran kartım var, sürücü sorunu yaşar mıyım?", a: "Hayır. ParsLinux içerisinde yerleşik olarak gelen Pars NVIDIA Installer aracı kart modelinizi otomatik tespit eder ve en kararlı tescilli sürücüyü tek tıkla kurup yapılandırır." },
    { q: "Steam ve Windows oyunları çalışır mı?", a: "Evet! Steam'in yerleşik Proton teknolojisi ve Wine/Lutris katmanları sayesinde GTA V, CS2, Cyberpunk 2077 ve binlerce modern Windows oyunu ParsLinux üzerinde yüksek FPS ile oynanabilir." },
    { q: "GNOME mu yoksa XFCE mi seçmeliyim?", a: "Bilgisayarınız 4 GB veya daha fazla RAM'e ve güncel bir işlemciye sahipse zengin görsel deneyim için GNOME sürümünü öneririz. Eğer daha eski bir bilgisayarınız varsa veya maksimum hız istiyorsanız XFCE sürümü (~512 MB RAM) idealdir." },
    { q: "ParsLinux tamamen ücretsiz mi?", a: "Evet, ParsLinux %100 özgür ve açık kaynak kodlu bir projedir (GPL Lisanslı). Ne şimdi ne de gelecekte herhangi bir ücret talep edilmez; ticari kullanım için de tamamen serbesttir." }
  ] : [
    { q: "Can I install ParsLinux alongside Windows (Dual-Boot)?", a: "Yes, absolutely! The installation wizard automatically detects existing Windows partitions and offers an 'Install alongside Windows' option with zero data loss." },
    { q: "I have an NVIDIA graphics card, will I encounter driver issues?", a: "No. The built-in Pars NVIDIA Installer detects your GPU architecture and installs the verified proprietary driver with 1-click." },
    { q: "Can I play modern Steam and Windows games?", a: "Yes! Utilizing Steam Proton, Wine, and DXVK/Vulkan runtime, thousands of titles like CS2, GTA V, and Cyberpunk 2077 run with native performance." },
    { q: "Which desktop should I pick: GNOME or XFCE?", a: "Choose GNOME if your machine has 4GB+ RAM for maximum aesthetic workflow. Choose XFCE for older hardware or maximum FPS gaming (~512 MB idle RAM)." },
    { q: "Is ParsLinux completely free?", a: "Yes, ParsLinux is 100% free and open-source software licensed under GNU GPL v3. Free forever for both personal and enterprise use." }
  ];

  return `
    <section class="faq-section" id="faq">
      <div class="container">
        <div class="section-header">
          <div class="section-subtitle">${t.faq_subtitle}</div>
          <h2 class="section-title">${t.faq_title}</h2>
          <p class="section-desc">${t.faq_desc}</p>
        </div>
        <div class="faq-accordion">
          ${items.map((item, idx) => `
            <div class="faq-item ${idx === 0 ? 'active' : ''}">
              <button class="faq-question">
                <span>${item.q}</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer"><p>${item.a}</p></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
