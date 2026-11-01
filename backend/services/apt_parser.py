"""
ParsLinux APT Repository Parser & Caching Engine
Parses Debian RFC822 'Packages' index files asynchronously.
"""

import time
import httpx
from typing import List, Dict, Any, Optional
from backend.config import PACKAGES_URL, CACHE_TTL_SECONDS

FALLBACK_PACKAGES = [
    {
        "name": "pars-base", "version": "1.0.0-1", "arch": "all", "size": "18 KB", "category": "system",
        "category_tr": "Sistem", "category_en": "System",
        "desc_tr": "ParsLinux temel çekirdek yapılandırması, APT anahtarları ve sistem bağımlılıkları.",
        "desc_en": "Core ParsLinux base configuration, repository keys, and essential dependencies."
    },
    {
        "name": "pars-branding", "version": "1.0.0-1", "arch": "all", "size": "1.2 MB", "category": "artwork",
        "category_tr": "Görsel", "category_en": "Branding",
        "desc_tr": "ParsLinux varsayılan duvar kağıtları, vektörel logolar, simgeler ve os-release kimliği.",
        "desc_en": "Default ParsLinux wallpapers, vector logos, icons, and os-release identity."
    },
    {
        "name": "parslinux-welcome", "version": "1.0.2", "arch": "all", "size": "142 KB", "category": "tools",
        "category_tr": "Araçlar", "category_en": "Utilities",
        "desc_tr": "İlk açılışta kullanıcıyı karşılayan görünüm, tema ve temel uygulama sihirbazı.",
        "desc_en": "First-boot welcome wizard for theme preferences, drivers, and initial app selection."
    },
    {
        "name": "parslinux-software", "version": "1.1.0", "arch": "amd64", "size": "890 KB", "category": "store",
        "category_tr": "Mağaza", "category_en": "Software",
        "desc_tr": "Debian ve Pars depolarındaki 50.000+ paketi tek tıkla kuran modern yazılım mağazası.",
        "desc_en": "Modern software store supporting 50.000+ Debian and Pars packages with 1-click install."
    },
    {
        "name": "parslinux-nvidia-installer", "version": "1.2.0", "arch": "all", "size": "76 KB", "category": "drivers",
        "category_tr": "Sürücüler", "category_en": "Drivers",
        "desc_tr": "NVIDIA ekran kartlarını otomatik algılayıp en kararlı tescilli sürücüyü kuran sihirbaz.",
        "desc_en": "Automatic NVIDIA GPU detection and stable proprietary driver installer wizard."
    },
    {
        "name": "parslinux-amd-intel-installer", "version": "1.1.0", "arch": "all", "size": "64 KB", "category": "drivers",
        "category_tr": "Sürücüler", "category_en": "Drivers",
        "desc_tr": "AMD Radeon ve Intel grafik işlemcileri için Vulkan ve donanım hızlandırma paketi.",
        "desc_en": "Vulkan and hardware acceleration setup package for AMD Radeon and Intel GPUs."
    },
    {
        "name": "parslinux-boot-repair", "version": "1.0.5", "arch": "all", "size": "98 KB", "category": "tools",
        "category_tr": "Araçlar", "category_en": "Utilities",
        "desc_tr": "Bozulan GRUB açılış kayıtlarını ve Dual-Boot Windows yapılandırmasını tek tıkla onarır.",
        "desc_en": "One-click recovery utility for broken GRUB bootloaders and Dual-Boot Windows setups."
    },
    {
        "name": "pars-image-writer", "version": "1.0.1", "arch": "amd64", "size": "210 KB", "category": "tools",
        "category_tr": "Araçlar", "category_en": "Utilities",
        "desc_tr": "ISO kalıplarını USB belleklere doğrudan ve güvenle yazan kalıp yazıcı aracı.",
        "desc_en": "Direct, reliable USB media creator tool for burning Linux and Windows ISO images."
    },
    {
        "name": "parslinux-formatter", "version": "1.0.0", "arch": "all", "size": "85 KB", "category": "tools",
        "category_tr": "Araçlar", "category_en": "Utilities",
        "desc_tr": "USB bellek ve harici diskleri FAT32, NTFS, EXT4 formatında hızlı biçimlendirici.",
        "desc_en": "Quick formatting utility for USB drives and external storage with FAT32, NTFS, EXT4."
    },
    {
        "name": "parslinux-mycomputer", "version": "1.0.3", "arch": "all", "size": "115 KB", "category": "system",
        "category_tr": "Sistem", "category_en": "System",
        "desc_tr": "Bilgisayarın CPU, GPU, RAM ve disk sağlık durumunu gösteren Bilgisayarım arayüzü.",
        "desc_en": "Comprehensive hardware monitor showing CPU, GPU, RAM, thermals, and disk health."
    },
    {
        "name": "pars-desktop-gnome", "version": "1.0.0", "arch": "amd64", "size": "12 KB", "category": "desktop",
        "category_tr": "Masaüstü", "category_en": "Desktop",
        "desc_tr": "ParsLinux modern GNOME masaüstü ortamı ve özel eklentiler metapaketi.",
        "desc_en": "ParsLinux modern GNOME desktop environment and curated shell extensions metapackage."
    },
    {
        "name": "pars-desktop-xfce", "version": "1.0.0", "arch": "amd64", "size": "10 KB", "category": "desktop",
        "category_tr": "Masaüstü", "category_en": "Desktop",
        "desc_tr": "Hafif ve hızlı XFCE masaüstü ortamı (~512 MB RAM) metapaketi.",
        "desc_en": "Ultra-lightweight, high-performance XFCE desktop environment metapackage (~512 MB RAM)."
    },
    {
        "name": "parslinux-grub-theme", "version": "1.0.0", "arch": "all", "size": "1.8 MB", "category": "artwork",
        "category_tr": "Görsel", "category_en": "Branding",
        "desc_tr": "Açılış anında şık Pars logosu ve işletim sistemi simgelerini barındıran GRUB teması.",
        "desc_en": "Polished GRUB bootloader theme with Pars branding and modern OS icons."
    },
    {
        "name": "parslinux-Update", "version": "1.0.2", "arch": "all", "size": "95 KB", "category": "system",
        "category_tr": "Sistem", "category_en": "System",
        "desc_tr": "Sistem güncellemelerini arka planda denetleyen ve tek tıkla uygulayan güncelleyici.",
        "desc_en": "Background system update checker and 1-click update manager."
    },
    {
        "name": "pars-setup", "version": "1.0.0", "arch": "all", "size": "62 KB", "category": "system",
        "category_tr": "Sistem", "category_en": "System",
        "desc_tr": "Yeni kurulan ParsLinux sistemlerini ilk açılışta optimize eden kurulum betikleri.",
        "desc_en": "Post-install configuration and optimization helper scripts for ParsLinux."
    },
    {
        "name": "parslinux-shortcuts", "version": "1.0.0", "arch": "all", "size": "45 KB", "category": "tools",
        "category_tr": "Araçlar", "category_en": "Utilities",
        "desc_tr": "Sistem pencereleri, ekran alıntısı ve terminal için ergonomik klavye kısayolları.",
        "desc_en": "Ergonomic keyboard shortcuts for window snapping, screenshots, and terminal launching."
    }
]

class AptRepositoryParser:
    def __init__(self):
        self._cached_packages: List[Dict[str, Any]] = FALLBACK_PACKAGES
        self._last_fetched_at: float = 0
        self._is_live: bool = False

    def _determine_category(self, name: str, section: str = "") -> str:
        name_lower = name.lower()
        if "nvidia" in name_lower or "amd" in name_lower or "intel" in name_lower or "driver" in name_lower:
            return "drivers"
        elif "desktop" in name_lower or "gnome" in name_lower or "xfce" in name_lower:
            return "desktop"
        elif "software" in name_lower or "store" in name_lower:
            return "store"
        elif "branding" in name_lower or "theme" in name_lower or "wallpaper" in name_lower:
            return "artwork"
        elif "repair" in name_lower or "writer" in name_lower or "formatter" in name_lower or "welcome" in name_lower or "shortcut" in name_lower:
            return "tools"
        return "system"

    def _parse_rfc822(self, text: str) -> List[Dict[str, Any]]:
        stanzas = text.strip().split("\n\n")
        parsed = []
        for stanza in stanzas:
            lines = stanza.strip().split("\n")
            pkg_data = {}
            current_key = None
            for line in lines:
                if line.startswith(" ") and current_key:
                    pkg_data[current_key] += " " + line.strip()
                elif ":" in line:
                    parts = line.split(":", 1)
                    current_key = parts[0].strip()
                    pkg_data[current_key] = parts[1].strip()

            name = pkg_data.get("Package")
            if not name:
                continue

            size_bytes = int(pkg_data.get("Size", 0))
            if size_bytes > 1024 * 1024:
                formatted_size = f"{size_bytes / (1024*1024):.1f} MB"
            elif size_bytes > 1024:
                formatted_size = f"{size_bytes / 1024:.0f} KB"
            else:
                formatted_size = f"{size_bytes} B"

            category = self._determine_category(name, pkg_data.get("Section", ""))

            category_labels = {
                "system": ("Sistem", "System"),
                "drivers": ("Sürücüler", "Drivers"),
                "tools": ("Araçlar", "Utilities"),
                "desktop": ("Masaüstü", "Desktop"),
                "store": ("Mağaza", "Software"),
                "artwork": ("Görsel", "Branding")
            }
            cat_tr, cat_en = category_labels.get(category, ("Sistem", "System"))

            desc = pkg_data.get("Description", f"ParsLinux official package: {name}")

            parsed.append({
                "name": name,
                "version": pkg_data.get("Version", "1.0.0"),
                "arch": pkg_data.get("Architecture", "all"),
                "size": formatted_size,
                "category": category,
                "category_tr": cat_tr,
                "category_en": cat_en,
                "desc_tr": desc,
                "desc_en": desc,
                "depends": pkg_data.get("Depends", ""),
                "filename": pkg_data.get("Filename", ""),
                "sha256": pkg_data.get("SHA256", "")
            })

        return parsed if parsed else FALLBACK_PACKAGES

    async def get_packages(self, force_refresh: bool = False) -> List[Dict[str, Any]]:
        now = time.time()
        if not force_refresh and (now - self._last_fetched_at < CACHE_TTL_SECONDS) and self._is_live:
            return self._cached_packages

        try:
            async with httpx.AsyncClient(timeout=6.0) as client:
                res = await client.get(PACKAGES_URL)
                if res.status_code == 200:
                    parsed = self._parse_rfc822(res.text)
                    self._cached_packages = parsed
                    self._last_fetched_at = now
                    self._is_live = True
                    return self._cached_packages
        except Exception:
            # Offline or connection error -> use fallback
            pass

        self._last_fetched_at = now
        return self._cached_packages

    def is_live(self) -> bool:
        return self._is_live


apt_service = AptRepositoryParser()
