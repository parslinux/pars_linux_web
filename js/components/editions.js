/**
 * ParsLinux Desktop Editions Component (GNOME & XFCE)
 */

export function renderEditions(t, currentLang, activeEdition) {
  const isTr = currentLang === 'tr';
  return `
    <section class="editions-section" id="editions">
      <div class="container">
        <div class="section-header">
          <div class="section-subtitle">${t.editions_subtitle}</div>
          <h2 class="section-title">${t.editions_title}</h2>
          <p class="section-desc">${t.editions_desc}</p>
        </div>
        <div class="edition-tabs" id="edition-tabs-container">
          <button class="edition-tab ${activeEdition === 'gnome' ? 'active' : ''}" data-edition="gnome">
            <span class="tab-badge">${isTr ? 'Önerilen' : 'Recommended'}</span>
            <span class="tab-title">Pars GNOME Edition</span>
            <span class="tab-sub">${isTr ? 'Modern, Şık ve Akıcı' : 'Modern & Fluid'}</span>
          </button>
          <button class="edition-tab ${activeEdition === 'xfce' ? 'active' : ''}" data-edition="xfce">
            <span class="tab-badge light">${isTr ? 'Hızlı' : 'Fast'}</span>
            <span class="tab-title">Pars XFCE Edition</span>
            <span class="tab-sub">${isTr ? 'Hafif, Verimli ve Klasik' : 'Lightweight & Snappy'}</span>
          </button>
        </div>
        <div id="editions-panels-container"></div>
      </div>
    </section>
  `;
}

export function renderEditionPanels(currentLang, activeEdition) {
  const panelsContainer = document.getElementById('editions-panels-container');
  if (!panelsContainer) return;

  const isTr = currentLang === 'tr';
  const editions = [
    {
      id: 'gnome',
      status: isTr ? 'Masaüstü Sürümü 1.0' : 'Desktop Edition 1.0',
      meta: '64-bit x86_64',
      heading: 'ParsLinux 1.0 GNOME Edition',
      summary: isTr
        ? 'Göz alıcı modern tasarım, çoklu çalışma alanları, dokunmatik yüzey hareketleri ve özel Pars teması. Güncel donanıma sahip tüm dizüstü ve masaüstü bilgisayarlar için ideal seçimdir.'
        : 'Eye-catching aesthetics, fluid workspaces, touchpad gestures, and custom Pars styling. The premier choice for modern laptops and workstations.',
      requirements: [
        { label: isTr ? 'İşlemci:' : 'Processor:', val: '64-bit Dual Core 2.0 GHz' },
        { label: isTr ? 'Bellek (RAM):' : 'Memory (RAM):', val: isTr ? 'Minimum 4 GB (8 GB önerilir)' : 'Min 4 GB (8 GB recommended)' },
        { label: isTr ? 'Depolama Alanı:' : 'Storage:', val: isTr ? '25 GB boş alan (SSD önerilir)' : '25 GB free space (SSD recommended)' },
        { label: isTr ? 'Çözünürlük:' : 'Resolution:', val: '1024 x 768+' }
      ],
      isoSize: '3.1 GB',
      isoFile: 'ParsLinux-1.0-gnome-amd64.iso',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      previewTag: isTr ? 'GNOME 43+ & Pars Theme • *Temsili Görsel' : 'GNOME 43+ & Pars Theme • *Representative',
      image: 'assets/images/parslinux-hero-desktop.jpg'
    },
    {
      id: 'xfce',
      status: isTr ? 'Performans Sürümü 1.0' : 'Performance Edition 1.0',
      meta: '64-bit x86_64',
      heading: 'ParsLinux 1.0 XFCE Edition',
      summary: isTr
        ? 'Klasik masaüstü ergonomisi, ışık hızında menü geçişleri ve son derece düşük donanım tüketimi. Eski nesil bilgisayarları canlandırmak ve en yüksek işlemci verimini elde etmek isteyenler için biçilmiş kaftan.'
        : 'Classic desktop ergonomics, lightning-fast transitions, and minimal RAM footprint (~512 MB). Rejuvenates older hardware and provides maximum FPS in games.',
      requirements: [
        { label: isTr ? 'İşlemci:' : 'Processor:', val: '64-bit 1.2 GHz' },
        { label: isTr ? 'Bellek (RAM):' : 'Memory (RAM):', val: isTr ? 'Minimum 2 GB (4 GB önerilir)' : 'Min 2 GB (4 GB recommended)' },
        { label: isTr ? 'Depolama Alanı:' : 'Storage:', val: isTr ? '15 GB boş alan' : '15 GB free space' },
        { label: isTr ? 'Çözünürlük:' : 'Resolution:', val: '800 x 600+' }
      ],
      isoSize: '2.4 GB',
      isoFile: 'ParsLinux-1.0-xfce-amd64.iso',
      sha256: '9f83c12a76f2a8934b11f7c7849c25624896eb3841e24a87c02b281b369f8841',
      previewTag: isTr ? 'XFCE 4.18 Ultra Hafif (~512 MB RAM) • *Temsili Görsel' : 'XFCE 4.18 Ultra Lightweight (~512 MB RAM) • *Representative',
      image: 'assets/images/parslinux-xfce-desktop.jpg'
    }
  ];

  panelsContainer.innerHTML = editions
    .map(ed => `
      <div class="edition-panel ${ed.id === activeEdition ? 'active' : ''}" id="edition-panel-${ed.id}">
        <div class="edition-grid">
          <div class="edition-info">
            <div class="edition-header-tag">
              <span class="tag-status ${ed.id === 'xfce' ? 'speed' : ''}">${ed.status}</span>
              <span class="tag-meta">${ed.meta}</span>
            </div>
            <h3 class="edition-heading">${ed.heading}</h3>
            <p class="edition-summary">${ed.summary}</p>

            <div class="requirements-box">
              <div class="req-title">${isTr ? 'Sistem Gereksinimleri' : 'System Requirements'}</div>
              <div class="req-grid">
                ${ed.requirements.map(r => `
                  <div class="req-item">
                    <span class="req-label">${r.label}</span>
                    <span class="req-val">${r.val}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="edition-actions">
              <button class="btn btn-primary open-dl-modal-btn" data-edition="${ed.id}">
                <i data-lucide="download"></i>
                <span>${ed.id.toUpperCase()} ISO ${isTr ? 'İndir' : 'Download'} (${ed.isoSize})</span>
              </button>
              <button class="btn btn-outline copy-sha-btn" data-sha="${ed.sha256}">
                <i data-lucide="copy"></i>
                <span>${isTr ? 'SHA256 Doğrula' : 'Verify SHA256'}</span>
              </button>
            </div>
          </div>

          <div class="edition-preview" data-tilt data-tilt-max="8">
            <div class="preview-frame">
              <img src="${ed.image}" alt="${ed.heading} Preview" class="preview-img">
              <div class="preview-overlay">
                <span class="preview-tag">${ed.previewTag}</span>
              </div>
            </div>
            <div class="preview-disclaimer-note">
              <i data-lucide="info" class="inline-info-icon"></i>
              <span>${isTr ? '*Görseller, ParsLinux masaüstü deneyimini yansıtan temsili konseptlerdir.' : '*Screenshots are representative UI concepts showcasing the ParsLinux desktop.'}</span>
            </div>
          </div>
        </div>
      </div>
    `)
    .join('');
}
