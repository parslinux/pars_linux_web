"""
ParsLinux Mirror Latency & Health Monitoring Service
Tests mirror reachability and latency without sending identifiable data.
"""

import time
import httpx
from typing import List, Dict, Any
from backend.config import MIRRORS

class MirrorMonitorService:
    async def check_mirrors(self) -> List[Dict[str, Any]]:
        results = []
        async with httpx.AsyncClient(timeout=4.0) as client:
            for mirror in MIRRORS:
                start = time.perf_counter()
                status = "offline"
                latency_ms = 999
                try:
                    res = await client.get(mirror["url"])
                    latency_ms = round((time.perf_counter() - start) * 1000, 1)
                    if res.status_code in [200, 301, 302]:
                        status = "online"
                except Exception:
                    status = "offline"

                results.append({
                    "id": mirror["id"],
                    "name": mirror["name"],
                    "region": mirror["region"],
                    "url": mirror["url"],
                    "iso_url": mirror["iso_url"],
                    "status": status,
                    "latency_ms": latency_ms,
                    "recommended": False
                })

        # Mark lowest latency online mirror as recommended
        online_mirrors = [m for m in results if m["status"] == "online"]
        if online_mirrors:
            fastest = min(online_mirrors, key=lambda m: m["latency_ms"])
            fastest["recommended"] = True

        return results

mirror_service = MirrorMonitorService()
