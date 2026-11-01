/**
 * ParsLinux APT Repository & Interactive Terminal Component
 */

export function renderRepo(t) {
  return `
    <section class="repo-section" id="repo">
      <div class="container">
        <div class="section-header">
          <div class="section-subtitle">${t.repo_subtitle}</div>
          <h2 class="section-title">${t.repo_title}</h2>
          <p class="section-desc">${t.repo_desc}</p>
        </div>

        <div class="term-tabs">
          <button class="term-tab-btn active" id="tab-term-cmds" type="button">
            <i data-lucide="terminal"></i>
            <span>${t.term_tab_cmds}</span>
          </button>
          <button class="term-tab-btn" id="tab-term-live" type="button">
            <i data-lucide="play-circle"></i>
            <span>${t.term_tab_interactive}</span>
          </button>
        </div>

        <div class="terminal-container" data-tilt data-tilt-max="3">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="term-dot red"></span>
              <span class="term-dot yellow"></span>
              <span class="term-dot green"></span>
            </div>
            <div class="terminal-title" id="terminal-header-title">bash — pars@parslinux:~</div>
            <button class="terminal-copy-btn" id="copy-terminal-btn" aria-label="Komutları Kopyala">
              <i data-lucide="copy" id="copy-icon"></i>
              <span id="copy-btn-text">${t.copy_commands}</span>
            </button>
          </div>

          <!-- Tab 1: Setup Commands View -->
          <div class="terminal-body" id="terminal-body-code">
            <div class="term-line comment"># 1. GPG Anahtarını indirin ve keyring dizinine ekleyin:</div>
            <div class="term-line command"><span class="prompt">$</span> sudo mkdir -p /etc/apt/keyrings</div>
            <div class="term-line command"><span class="prompt">$</span> curl -fsSL https://parslinux.github.io/apt_repo/parslinux-archive-keyring.gpg | sudo tee /etc/apt/keyrings/parslinux-archive-keyring.gpg &gt; /dev/null</div>
            
            <div class="term-line comment"># 2. ParsLinux 0.1 deposunu ekleyin ve güncelleyin:</div>
            <div class="term-line command"><span class="prompt">$</span> echo "deb [signed-by=/etc/apt/keyrings/parslinux-archive-keyring.gpg] https://parslinux.github.io/apt_repo 0.1 main" | sudo tee /etc/apt/sources.list.d/parslinux.list</div>
            <div class="term-line command"><span class="prompt">$</span> sudo apt update</div>
            
            <div class="term-line comment"># 3. ParsLinux özel araçlarını kurun:</div>
            <div class="term-line command"><span class="prompt">$</span> sudo apt install -y pars-base parslinux-welcome parslinux-software</div>
          </div>

          <!-- Tab 2: Interactive Live Web Terminal -->
          <div class="terminal-body term-interactive-wrap" id="terminal-body-interactive" style="display:none;">
            <div class="term-output-history" id="term-output-history">ParsLinux 1.0 (Anatolian) Canlı Web Terminaline Hoş Geldiniz!
Komut çalıştırmak için aşağıya yazın veya hazır butonlara tıklayın.
Komut listesi için 'help' veya 'yardım' yazabilirsiniz.</div>
            <div class="term-input-row">
              <span class="term-prompt-label">pars@parslinux:~$</span>
              <input type="text" class="term-interactive-input" id="term-interactive-input" placeholder="fastfetch, cat /etc/os-release, apt update, help..." autocomplete="off" spellcheck="false">
            </div>
            <div class="term-quick-cmds">
              <span style="font-weight:600;">Hızlı Komutlar:</span>
              <button type="button" class="quick-cmd-chip" data-cmd="fastfetch">fastfetch</button>
              <button type="button" class="quick-cmd-chip" data-cmd="cat /etc/os-release">cat /etc/os-release</button>
              <button type="button" class="quick-cmd-chip" data-cmd="apt update">apt update</button>
              <button type="button" class="quick-cmd-chip" data-cmd="apt install parslinux-welcome">apt install parslinux-welcome</button>
              <button type="button" class="quick-cmd-chip" data-cmd="uname -a">uname -a</button>
              <button type="button" class="quick-cmd-chip" data-cmd="help">help</button>
              <button type="button" class="quick-cmd-chip" data-cmd="clear">clear</button>
            </div>
          </div>
        </div>

        <div class="repo-action-row">
          <a href="https://parslinux.github.io/apt_repo/" target="_blank" rel="noopener" class="btn btn-secondary">
            <i data-lucide="external-link"></i>
            <span>${t.open_live_repo}</span>
          </a>
        </div>
      </div>
    </section>
  `;
}
