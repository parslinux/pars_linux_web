/**
 * ParsLinux System Compatibility Checker Component
 */

export function renderChecker(t) {
  return `
    <section class="checker-section" id="checker">
      <div class="container">
        <div class="section-header">
          <div class="section-subtitle">${t.checker_subtitle}</div>
          <h2 class="section-title">${t.checker_title}</h2>
          <p class="section-desc">${t.checker_desc}</p>
        </div>

        <div style="margin-bottom: 24px; display: flex; flex-direction:column; align-items: center; gap:10px;">
          <button type="button" class="auto-probe-btn" id="auto-probe-btn">
            <i data-lucide="cpu"></i>
            <span>${t.auto_probe_btn}</span>
          </button>
          <div id="detected-hardware-pill" style="display:none;" class="detected-hardware-pill"></div>
        </div>

        <div class="checker-widget">
          <div class="checker-controls">
            <div class="checker-field">
              <label for="check-ram" class="checker-label">
                <span>${t.check_ram_label}</span>
                <span class="field-hint">${t.check_ram_hint}</span>
              </label>
              <select id="check-ram" class="checker-select">
                <option value="2">2 GB RAM</option>
                <option value="4" selected>4 GB RAM</option>
                <option value="8">8 GB RAM</option>
                <option value="16">16 GB veya üzeri</option>
              </select>
            </div>

            <div class="checker-field">
              <label for="check-cpu" class="checker-label">
                <span>${t.check_cpu_label}</span>
                <span class="field-hint">${t.check_cpu_hint}</span>
              </label>
              <select id="check-cpu" class="checker-select">
                <option value="old">Eski Çift Çekirdek (Core 2 Duo, Celeron)</option>
                <option value="mid" selected>Standart Çift/Dört Çekirdek (i3, Ryzen 3)</option>
                <option value="high">Yüksek Performans (i5, i7, i9, Ryzen 5+)</option>
              </select>
            </div>

            <div class="checker-field">
              <label for="check-disk" class="checker-label">
                <span>${t.check_disk_label}</span>
                <span class="field-hint">${t.check_disk_hint}</span>
              </label>
              <select id="check-disk" class="checker-select">
                <option value="hdd">Geleneksel HDD (Mekanik Disk)</option>
                <option value="ssd" selected>SSD veya NVMe M.2</option>
              </select>
            </div>
          </div>

          <div class="checker-result-card" id="checker-result">
            <div class="result-badge-wrap">
              <span class="result-badge" id="res-badge">Mükemmel Uyum</span>
              <span class="result-score" id="res-score">%95 Performans Skoru</span>
            </div>
            <div class="score-progress-bar">
              <div class="score-progress-fill" id="res-progress" style="width: 95%;"></div>
            </div>
            <h3 class="result-title" id="res-title">Tavsiye Edilen: ParsLinux 1.0 GNOME</h3>
            <p class="result-analysis" id="res-desc">
              Sisteminiz Pars GNOME Edition'ı gayet akıcı ve konforlu bir şekilde çalıştıracak güçte.
            </p>
            <div class="result-action">
              <button class="btn btn-primary btn-sm open-dl-modal-btn" id="res-btn">
                <i data-lucide="download"></i>
                <span>${t.checker_download_btn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
