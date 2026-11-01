"""
ParsLinux Backend Configuration
Zero-Trust and Privacy-First Settings
"""

import os

APT_REPO_BASE = os.getenv("APT_REPO_BASE", "https://parslinux.github.io/apt_repo")
PACKAGES_URL = f"{APT_REPO_BASE}/dists/0.1/main/binary-amd64/Packages"

MIRRORS = [
    {
        "id": "github-pages",
        "name": "ParsLinux Primary CDN (GitHub Pages)",
        "region": "Global / Anycast",
        "url": "https://parslinux.github.io/apt_repo/",
        "iso_url": "https://github.com/parslinux"
    },
    {
        "id": "source-repo",
        "name": "ParsLinux Official APT Repository",
        "region": "TR / Europe",
        "url": "https://parslinux.github.io/apt_repo/",
        "iso_url": "https://github.com/parslinux"
    }
]

# Salt for zero-trust anonymous hashing (no real IPs ever stored)
PRIVACY_SALT = os.getenv("PRIVACY_SALT", "parslinux-zero-trust-2026-salt")
CACHE_TTL_SECONDS = int(os.getenv("CACHE_TTL_SECONDS", "300"))  # 5 minutes
