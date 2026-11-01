/**
 * ParsLinux APT Package Explorer Component
 */
import { ParsPackages } from '../data/packages.js';

export function renderPackages(t, currentLang, activeCategory = 'all', searchQuery = '') {
  const isTr = currentLang === 'tr';
  const categories = [
    { id: 'all', label: isTr ? 'Tümü (31+)' : 'All (31+)' },
    { id: 'system', label: isTr ? 'Sistem' : 'System' },
    { id: 'drivers', label: isTr ? 'Sürücüler' : 'Drivers' },
    { id: 'tools', label: isTr ? 'Araçlar' : 'Utilities' },
    { id: 'desktop', label: isTr ? 'Masaüstü' : 'Desktop' },
    { id: 'store', label: isTr ? 'Mağaza' : 'Store' },
    { id: 'artwork', label: isTr ? 'Görsel & Tema' : 'Themes' }
  ];

  return `
    <section class="packages-section" id="packages">
      <div class="container">
        <div class="section-header">
          <div class="section-subtitle">${t.pkg_subtitle}</div>
          <h2 class="section-title">${t.pkg_title}</h2>
          <p class="section-desc">${t.pkg_desc}</p>
        </div>

        <div class="pkg-search-wrapper">
          <div class="pkg-search-input-box">
            <i data-lucide="search" class="search-icon"></i>
            <input type="text" id="pkg-search-input" value="${searchQuery}" placeholder="${t.search_placeholder}" autocomplete="off">
            <button id="pkg-search-clear" class="pkg-clear-btn" style="display:${searchQuery ? 'flex' : 'none'};" title="Temizle">✕</button>
          </div>
          <div class="pkg-category-filters" id="pkg-category-filters">
            ${categories.map(cat => `
              <button class="pkg-filter-btn ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
                ${cat.label}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="pkg-count-row">
          <span id="pkg-count-text">${t.list_count}: 0</span>
        </div>

        <div class="pkg-grid" id="pkg-grid-container"></div>
      </div>
    </section>
  `;
}

export function renderPackageGrid(currentLang, activeCategory = 'all', searchQuery = '') {
  const grid = document.getElementById('pkg-grid-container');
  const countEl = document.getElementById('pkg-count-text');
  if (!grid) return;

  const query = searchQuery.toLowerCase().trim();
  const isTr = currentLang === 'tr';

  const filtered = ParsPackages.filter(pkg => {
    const matchCat = activeCategory === 'all' || pkg.category === activeCategory;
    const matchQuery =
      !query ||
      pkg.name.toLowerCase().includes(query) ||
      (isTr ? pkg.descTr.toLowerCase().includes(query) : pkg.descEn.toLowerCase().includes(query)) ||
      pkg.category.toLowerCase().includes(query);

    return matchCat && matchQuery;
  });

  if (countEl) {
    countEl.textContent = `${isTr ? 'Listelenen Paket' : 'Listed Packages'}: ${filtered.length} / ${ParsPackages.length}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding: 40px; color: var(--text-muted);">
        <div style="font-size:2rem; margin-bottom:10px;">🔍</div>
        <div>${isTr ? 'Aramanızla eşleşen paket bulunamadı.' : 'No packages matched your query.'}</div>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map(pkg => `
      <div class="pkg-card" data-tilt data-tilt-max="6">
        <div class="pkg-card-top">
          <span class="pkg-name">${pkg.name}</span>
          <span class="pkg-cat-badge">${isTr ? pkg.categoryTr : pkg.categoryEn}</span>
        </div>
        <p class="pkg-desc">${isTr ? pkg.descTr : pkg.descEn}</p>
        <div class="pkg-card-meta">
          <span>Sürüm: <strong>${pkg.version}</strong></span>
          <span>Mimari: <strong>${pkg.arch}</strong></span>
        </div>
        <button class="pkg-install-btn copy-cmd-btn" data-pkg="${pkg.name}" title="Kurulum Komutunu Kopyala">
          <span>$ sudo apt install ${pkg.name}</span>
          <i data-lucide="copy"></i>
        </button>
      </div>
    `)
    .join('');
}
