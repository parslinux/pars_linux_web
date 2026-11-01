/**
 * ParsLinux Footer Component
 */

export function renderFooter(t) {
  return `
    <footer class="footer">
      <div class="container footer-container">
        <div class="footer-col brand-col">
          <div class="brand-logo footer-brand">
            <img src="assets/icons/parslinux-logo.svg" alt="ParsLinux Logo" class="brand-icon">
            <div class="brand-text"><span class="brand-name">Pars<span>Linux</span></span></div>
          </div>
          <p class="footer-tagline">${t.footer_tagline}</p>
          <div class="footer-license"><span>Lisans: GNU GPL v3 • Debian Tabanlı</span></div>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">${t.footer_fast_links}</h4>
          <ul class="footer-links">
            <li><a href="#features">${t.nav_features}</a></li>
            <li><a href="#editions">${t.nav_editions}</a></li>
            <li><a href="#suite">${t.nav_suite}</a></li>
            <li><a href="#packages">${t.nav_packages}</a></li>
            <li><a href="https://parslinux.github.io/apt_repo/" target="_blank" rel="noopener">Canlı APT Deposu (31+ Paket) ↗</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">${t.footer_ecosystem}</h4>
          <ul class="footer-links">
            <li><a href="#suite">Pars Yazılım Merkezi</a></li>
            <li><a href="#suite">NVIDIA & AMD Sürücüler</a></li>
            <li><a href="#suite">Önyükleme Onarıcı</a></li>
            <li><a href="#suite">USB Kalıp Yazıcı</a></li>
            <li><a href="#checker">Sistem Uyumluluk Testi</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">${t.footer_community}</h4>
          <ul class="footer-links">
            <li><a href="https://github.com/parslinux" target="_blank" rel="noopener">GitHub Depoları</a></li>
            <li><a href="#faq">Sıkça Sorulan Sorular</a></li>
            <li><a href="https://github.com/parslinux/parslinux/issues" target="_blank" rel="noopener">Hata Bildir (Issue)</a></li>
            <li><a href="https://parslinux.github.io/apt_repo/" target="_blank" rel="noopener">APT Belgeleri</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container bottom-container">
          <p class="copyright">© 2026 ParsLinux Projesi. Tüm hakları özgür yazılım topluluğuna aittir.</p>
          <div class="bottom-links">
            <a href="#">Gizlilik Politikası</a>
            <span>•</span>
            <a href="#">Kullanım Şartları</a>
            <span>•</span>
            <a href="https://github.com/parslinux" target="_blank" rel="noopener">GitHub (@parslinux)</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
