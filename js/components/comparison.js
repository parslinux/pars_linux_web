/**
 * ParsLinux vs Windows 11 Comparison & Hardware Resource Savings Component
 */

export function renderComparison(t, currentLang, calcPCCount = 5) {
  const isTr = currentLang === 'tr';
  return `
    <section class="comparison-section" id="comparison">
      <div class="container">
        <div class="section-header">
          <div class="section-subtitle">${t.comp_subtitle}</div>
          <h2 class="section-title">${t.comp_title}</h2>
          <p class="section-desc">${t.comp_desc}</p>
        </div>

        <div class="comp-table-wrap" data-tilt data-tilt-max="3">
          <table class="comp-table">
            <thead>
              <tr>
                <th>${isTr ? 'Kriter / Özellik' : 'Criteria / Feature'}</th>
                <th class="comp-pars-col"><i data-lucide="zap"></i> ParsLinux 1.0 (Anatolian)</th>
                <th class="comp-win-col"><i data-lucide="monitor"></i> Windows 11 Pro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>${isTr ? 'Boşta Bellek (RAM) Kullanımı' : 'Idle RAM Consumption'}</strong></td>
                <td class="comp-pars-col"><strong>512 MB</strong> (XFCE) / <strong>1.1 GB</strong> (GNOME)</td>
                <td class="comp-win-col">3.8 GB – 4.5 GB</td>
              </tr>
              <tr>
                <td><strong>${isTr ? 'Arka Plan Servisleri & Telemetri' : 'Background Services & Telemetry'}</strong></td>
                <td class="comp-pars-col"><span class="badge-feature">0 Telemetri • %100 Gizlilik</span></td>
                <td class="comp-win-col">85+ Arka Plan Takip Servisi</td>
              </tr>
              <tr>
                <td><strong>${isTr ? 'Gerekli Disk Alanı' : 'Required Disk Footprint'}</strong></td>
                <td class="comp-pars-col">8.5 GB (Tam Kurulum)</td>
                <td class="comp-win-col">32 GB – 64 GB</td>
              </tr>
              <tr>
                <td><strong>${isTr ? 'Eski Donanım Desteği' : 'Legacy PC & 32/64-bit'}</strong></td>
                <td class="comp-pars-col"><i data-lucide="check" style="color:#10b981; width:16px;"></i> TPM 2.0 veya SecureBoot zorunluluğu YOK</td>
                <td class="comp-win-col"><i data-lucide="x" style="color:#ef4444; width:16px;"></i> TPM 2.0 & Yeni CPU Şartı</td>
              </tr>
              <tr>
                <td><strong>${isTr ? 'Lisans & Maliyet' : 'License & Cost'}</strong></td>
                <td class="comp-pars-col"><strong style="color:#10b981;">0 ₺ (Ömür Boyu Tamamen Özgür)</strong></td>
                <td class="comp-win-col">4.800 ₺ / $199 Lisans Ücreti</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Interactive Calculator in JS -->
        <div class="calc-slider-card">
          <div>
            <div class="calc-slider-title">${isTr ? '💻 Donanım & Kaynak Tasarrufu Hesaplayıcı' : '💻 Hardware & Resource Savings Calculator'}</div>
            <div class="calc-slider-desc">${isTr ? 'Dönüştürmek istediğiniz bilgisayar sayısını seçin:' : 'Select the number of PCs you want to modernize:'}</div>
            <div style="margin-top:12px; display:flex; align-items:center; gap:14px;">
              <input type="range" id="pc-count-slider" min="1" max="100" value="${calcPCCount}" style="accent-color:#0ea5e9; width:200px; cursor:pointer;">
              <span id="pc-count-val" style="font-weight:700; color:#38bdf8; font-family:var(--font-mono); font-size:1.1rem;">${calcPCCount} PC</span>
            </div>
          </div>
          <div class="calc-result-badge" id="calc-result-display">
            <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.85;">${isTr ? 'KAZANILAN RAM & MALİYET' : 'TOTAL RAM & BUDGET SAVED'}</div>
            <div id="calc-ram-saved" style="margin-top:4px;">${(calcPCCount * 2.8).toFixed(1)} GB RAM • ${(calcPCCount * 4800).toLocaleString('tr-TR')} ₺ Tasarruf</div>
          </div>
        </div>
      </div>
    </section>
  `;
}
