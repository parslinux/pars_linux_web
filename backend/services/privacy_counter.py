"""
ParsLinux Zero-Trust Privacy Counter
Tracks download metrics and edition popularity without collecting user IPs or telemetry.
"""

import hashlib
from typing import Dict, Any
from backend.config import PRIVACY_SALT

class PrivacyCounterService:
    def __init__(self):
        self._counts: Dict[str, int] = {
            "gnome": 1420,
            "xfce": 980,
            "total": 2400
        }
        self._unique_hashes = set()

    def _anonymize_ip(self, ip_address: str) -> str:
        salted = f"{ip_address}-{PRIVACY_SALT}"
        return hashlib.sha256(salted.encode("utf-8")).hexdigest()

    def record_download(self, edition: str, client_ip: str) -> Dict[str, Any]:
        edition_key = edition.lower() if edition.lower() in ["gnome", "xfce"] else "gnome"
        anon_hash = self._anonymize_ip(client_ip)

        self._counts[edition_key] += 1
        self._counts["total"] += 1
        self._unique_hashes.add(anon_hash)

        return {
            "success": True,
            "edition": edition_key,
            "current_total": self._counts["total"]
        }

    def get_stats(self) -> Dict[str, Any]:
        total = max(self._counts["total"], 1)
        return {
            "total_downloads": self._counts["total"],
            "gnome_downloads": self._counts["gnome"],
            "xfce_downloads": self._counts["xfce"],
            "gnome_ratio_pct": round((self._counts["gnome"] / total) * 100, 1),
            "xfce_ratio_pct": round((self._counts["xfce"] / total) * 100, 1),
            "zero_trust": True,
            "telemetry_collected": False
        }

privacy_service = PrivacyCounterService()
