/**
 * ParsLinux 1.0 (Anatolian) - Official APT Packages Catalog
 * Includes core desktop utilities, hardware installer wizards, branding, and metapackages.
 */

export const ParsPackages = [
  {
    name: 'pars-base',
    version: '1.0.0-1',
    arch: 'all',
    size: '18 KB',
    category: 'system',
    categoryTr: 'Sistem',
    categoryEn: 'System',
    descTr: 'ParsLinux temel çekirdek yapılandırması, APT anahtarları ve sistem bağımlılıkları.',
    descEn: 'Core ParsLinux base configuration, repository keys, and essential dependencies.'
  },
  {
    name: 'pars-branding',
    version: '1.0.0-1',
    arch: 'all',
    size: '1.2 MB',
    category: 'artwork',
    categoryTr: 'Görsel',
    categoryEn: 'Branding',
    descTr: 'ParsLinux varsayılan duvar kağıtları, vektörel logolar, simgeler ve os-release kimliği.',
    descEn: 'Default ParsLinux wallpapers, vector logos, icons, and os-release identity.'
  },
  {
    name: 'parslinux-welcome',
    version: '1.0.2',
    arch: 'all',
    size: '142 KB',
    category: 'tools',
    categoryTr: 'Araçlar',
    categoryEn: 'Utilities',
    descTr: 'İlk açılışta kullanıcıyı karşılayan görünüm, tema ve temel uygulama sihirbazı.',
    descEn: 'First-boot welcome wizard for theme preferences, drivers, and initial app selection.'
  },
  {
    name: 'parslinux-software',
    version: '1.1.0',
    arch: 'amd64',
    size: '890 KB',
    category: 'store',
    categoryTr: 'Mağaza',
    categoryEn: 'Software',
    descTr: 'Debian ve Pars depolarındaki 50.000+ paketi tek tıkla kuran modern yazılım mağazası.',
    descEn: 'Modern software store supporting 50.000+ Debian and Pars packages with 1-click install.'
  },
  {
    name: 'parslinux-nvidia-installer',
    version: '1.2.0',
    arch: 'all',
    size: '76 KB',
    category: 'drivers',
    categoryTr: 'Sürücüler',
    categoryEn: 'Drivers',
    descTr: 'NVIDIA ekran kartlarını otomatik algılayıp en kararlı tescilli sürücüyü kuran sihirbaz.',
    descEn: 'Automatic NVIDIA GPU detection and stable proprietary driver installer wizard.'
  },
  {
    name: 'parslinux-amd-intel-installer',
    version: '1.1.0',
    arch: 'all',
    size: '64 KB',
    category: 'drivers',
    categoryTr: 'Sürücüler',
    categoryEn: 'Drivers',
    descTr: 'AMD Radeon ve Intel grafik işlemcileri için Vulkan ve donanım hızlandırma paketi.',
    descEn: 'Vulkan and hardware acceleration setup package for AMD Radeon and Intel GPUs.'
  },
  {
    name: 'parslinux-boot-repair',
    version: '1.0.5',
    arch: 'all',
    size: '98 KB',
    category: 'tools',
    categoryTr: 'Araçlar',
    categoryEn: 'Utilities',
    descTr: 'Bozulan GRUB açılış kayıtlarını ve Dual-Boot Windows yapılandırmasını tek tıkla onarır.',
    descEn: 'One-click recovery utility for broken GRUB bootloaders and Dual-Boot Windows setups.'
  },
  {
    name: 'pars-image-writer',
    version: '1.0.1',
    arch: 'amd64',
    size: '210 KB',
    category: 'tools',
    categoryTr: 'Araçlar',
    categoryEn: 'Utilities',
    descTr: 'ISO kalıplarını USB belleklere doğrudan ve güvenle yazan kalıp yazıcı aracı.',
    descEn: 'Direct, reliable USB media creator tool for burning Linux and Windows ISO images.'
  },
  {
    name: 'parslinux-formatter',
    version: '1.0.0',
    arch: 'all',
    size: '85 KB',
    category: 'tools',
    categoryTr: 'Araçlar',
    categoryEn: 'Utilities',
    descTr: 'USB bellek ve harici diskleri FAT32, NTFS, EXT4 formatında hızlı biçimlendirici.',
    descEn: 'Quick formatting utility for USB drives and external storage with FAT32, NTFS, EXT4.'
  },
  {
    name: 'parslinux-mycomputer',
    version: '1.0.3',
    arch: 'all',
    size: '115 KB',
    category: 'system',
    categoryTr: 'Sistem',
    categoryEn: 'System',
    descTr: 'Bilgisayarın CPU, GPU, RAM ve disk sağlık durumunu gösteren Bilgisayarım arayüzü.',
    descEn: 'Comprehensive hardware monitor showing CPU, GPU, RAM, thermals, and disk health.'
  },
  {
    name: 'pars-desktop-gnome',
    version: '1.0.0',
    arch: 'amd64',
    size: '12 KB',
    category: 'desktop',
    categoryTr: 'Masaüstü',
    categoryEn: 'Desktop',
    descTr: 'ParsLinux modern GNOME masaüstü ortamı ve özel eklentiler metapaketi.',
    descEn: 'ParsLinux modern GNOME desktop environment and curated shell extensions metapackage.'
  },
  {
    name: 'pars-desktop-xfce',
    version: '1.0.0',
    arch: 'amd64',
    size: '10 KB',
    category: 'desktop',
    categoryTr: 'Masaüstü',
    categoryEn: 'Desktop',
    descTr: 'Hafif ve hızlı XFCE masaüstü ortamı (~512 MB RAM) metapaketi.',
    descEn: 'Ultra-lightweight, high-performance XFCE desktop environment metapackage (~512 MB RAM).'
  },
  {
    name: 'parslinux-grub-theme',
    version: '1.0.0',
    arch: 'all',
    size: '1.8 MB',
    category: 'artwork',
    categoryTr: 'Görsel',
    categoryEn: 'Branding',
    descTr: 'Açılış anında şık Pars logosu ve işletim sistemi simgelerini barındıran GRUB teması.',
    descEn: 'Polished GRUB bootloader theme with Pars branding and modern OS icons.'
  },
  {
    name: 'parslinux-Update',
    version: '1.0.2',
    arch: 'all',
    size: '95 KB',
    category: 'system',
    categoryTr: 'Sistem',
    categoryEn: 'System',
    descTr: 'Sistem güncellemelerini arka planda denetleyen ve tek tıkla uygulayan güncelleyici.',
    descEn: 'Background system update checker and 1-click update manager.'
  },
  {
    name: 'pars-setup',
    version: '1.0.0',
    arch: 'all',
    size: '62 KB',
    category: 'system',
    categoryTr: 'Sistem',
    categoryEn: 'System',
    descTr: 'Yeni kurulan ParsLinux sistemlerini ilk açılışta optimize eden kurulum betikleri.',
    descEn: 'Post-install configuration and optimization helper scripts for ParsLinux.'
  },
  {
    name: 'parslinux-shortcuts',
    version: '1.0.0',
    arch: 'all',
    size: '45 KB',
    category: 'tools',
    categoryTr: 'Araçlar',
    categoryEn: 'Utilities',
    descTr: 'Sistem pencereleri, ekran alıntısı ve terminal için ergonomik klavye kısayolları.',
    descEn: 'Ergonomic keyboard shortcuts for window snapping, screenshots, and terminal launching.'
  }
];
