"""
ParsLinux Backend Microservice
Built with FastAPI, AsyncIO, and Zero-Trust Privacy Architecture.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from backend.services.apt_parser import apt_service
from backend.services.mirror_monitor import mirror_service
from backend.services.privacy_counter import privacy_service

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: warm cache with live repository data
    await apt_service.get_packages(force_refresh=True)
    yield

app = FastAPI(
    title="ParsLinux API Gateway",
    description="Microservice providing real-time APT repository sync, mirror health monitoring, and zero-trust telemetry-free download metrics.",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for frontend consumption
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

class DownloadEventRequest(BaseModel):
    edition: str
    architecture: Optional[str] = "amd64"

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "parslinux-backend",
        "version": "1.0.0",
        "zero_trust": True,
        "apt_live": apt_service.is_live()
    }

@app.get("/api/stats")
async def get_system_stats():
    packages = await apt_service.get_packages()
    dl_stats = privacy_service.get_stats()
    return {
        "distro_name": "ParsLinux 1.0 (Anatolian)",
        "base_system": "Debian 12 Bookworm (Stable)",
        "kernel_target": "Linux 6.1+ LTS",
        "total_packages": len(packages),
        "apt_repo_url": "https://parslinux.github.io/apt_repo/",
        "github_org": "https://github.com/parslinux",
        "downloads": dl_stats
    }

@app.get("/api/packages")
async def list_packages(category: Optional[str] = None, q: Optional[str] = None):
    packages = await apt_service.get_packages()

    if category and category != "all":
        packages = [p for p in packages if p.get("category") == category]

    if q:
        query = q.lower().strip()
        packages = [
            p for p in packages
            if query in p.get("name", "").lower()
            or query in p.get("desc_tr", "").lower()
            or query in p.get("desc_en", "").lower()
        ]

    return {
        "total": len(packages),
        "is_live": apt_service.is_live(),
        "packages": packages
    }

@app.get("/api/packages/{name}")
async def get_package_detail(name: str):
    packages = await apt_service.get_packages()
    for p in packages:
        if p["name"].lower() == name.lower():
            return p
    raise HTTPException(status_code=404, detail="Package not found in ParsLinux repository")

@app.get("/api/mirrors")
async def get_mirrors():
    mirrors = await mirror_service.check_mirrors()
    return {
        "mirrors": mirrors
    }

@app.post("/api/downloads/count")
async def record_download_event(event: DownloadEventRequest, request: Request):
    client_ip = request.client.host if request.client else "127.0.0.1"
    result = privacy_service.record_download(event.edition, client_ip)
    return result

@app.get("/api/downloads/stats")
async def get_download_stats():
    return privacy_service.get_stats()
