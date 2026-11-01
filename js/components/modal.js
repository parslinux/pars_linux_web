/**
 * ParsLinux Download Center Modal Component
 */

export function renderModal(t, currentLang, selectedEdition = 'gnome') {
  return `
    <div class="modal-backdrop" id="download-modal" aria-hidden="true">
      <div class="modal-card" data-tilt data-tilt-max="4">
        <button class="modal-close-btn" id="modal-close-btn" aria-label="Kapat">✕</button>
        <div class="modal-header">
          <div class="modal-pill">
            <span class="status-indicator"></span>
            <span>ParsLinux 1.0 (Anatolian) İndirme Merkezi</span>
          </div>
          <h3 class="modal-title" id="modal-title">ParsLinux ISO Kalıbını İndirin</h3>
          <p class="modal-desc" id="modal-desc">Resmi ve temiz kalıp dosyası. Hızlı doğrudan yansıma veya torrent seçeneklerinden birini seçin.</p>
        </div>

        <div class="modal-tabs" id="modal-edition-tabs">
          <button class="modal-tab ${selectedEdition === 'gnome' ? 'active' : ''}" data-modaledition="gnome">Pars GNOME Edition (3.1 GB)</button>
          <button class="modal-tab ${selectedEdition === 'xfce' ? 'active' : ''}" data-modaledition="xfce">Pars XFCE Edition (2.4 GB)</button>
        </div>

        <div class="modal-body" id="modal-body"></div>
      </div>
    </div>
  `;
}

export function renderModalContent(currentLang, selectedEdition = 'gnome') {
  const body = document.getElementById('modal-body');
  const tabs = document.querySelectorAll('.modal-tab');
  if (!body) return;

  const isTr = currentLang === 'tr';
  const isGnome = selectedEdition === 'gnome';

  tabs.forEach(tab => {
    if (tab.dataset.modaledition === selectedEdition) tab.classList.add('active');
    else tab.classList.remove('active');
  });

  const file = isGnome ? 'ParsLinux-1.0-gnome-amd64.iso' : 'ParsLinux-1.0-xfce-amd64.iso';
  const size = isGnome ? '3.1 GB' : '2.4 GB';
  const sha = isGnome
    ? 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    : '9f83c12a76f2a8934b11f7c7849c25624896eb3841e24a87c02b281b369f8841';

  body.innerHTML = `
    <div class="modal-dl-grid">
      <a href="https://github.com/parslinux" target="_blank" rel="noopener" class="modal-dl-btn dl-trigger-btn" data-file="${file}">
        <i data-lucide="download"></i>
        <span>${isTr ? 'Doğrudan İndir (HTTPS)' : 'Direct HTTPS Download'}</span>
        <span class="modal-dl-sub">${size} • ISO</span>
      </a>
      <a href="https://github.com/parslinux" target="_blank" rel="noopener" class="modal-dl-btn secondary dl-trigger-btn" data-file="${file}.torrent">
        <i data-lucide="share-2"></i>
        <span>${isTr ? 'Torrent ile İndir' : 'Torrent P2P Download'}</span>
        <span class="modal-dl-sub">${size} • .torrent</span>
      </a>
    </div>

    <div class="modal-verify-box">
      <div class="verify-title">
        <i data-lucide="shield-check"></i>
        <span>${isTr ? 'Terminalde SHA256 Doğrulama Kodu:' : 'Verify SHA256 Checksum in Terminal:'}</span>
      </div>
      <div class="verify-cmd">
        <code>echo "${sha}  ${file}" | sha256sum -c</code>
        <button class="copy-sha-btn" data-sha="echo &quot;${sha}  ${file}&quot; | sha256sum -c" title="Komutu Kopyala">
          <i data-lucide="copy"></i>
        </button>
      </div>
    </div>
  `;

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}
