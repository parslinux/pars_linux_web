# 📦 ParsLinux Web Platformu — Kurulum ve Sıfır Güven Dağıtım Kılavuzu (`install.md`)

Bu belge, **ParsLinux Web Platformu**'nun yerel geliştirme ortamında, konteynerize mikroservis mimarisinde ve kurumsal üretim (production) sunucularında **Sıfır Güven (Zero-Trust)** ilkelerine tam uyumlu şekilde nasıl kurulacağını ve yapılandırılacağını açıklar.

---

## 📑 İçindekiler

1. [Sistem Gereksinimleri](#1-sistem-gereksinimleri)
2. [Sıfır Güven (Zero-Trust) Dağıtım İlkeleri](#2-s%C4%B1f%C4%B1r-g%C3%BCven-zero-trust-da%C4%9F%C4%B1t%C4%B1m-%C4%B0lkeleri)
3. [Yöntem 1: Hızlı Yerel Geliştirme (Python / Node.js)](#y%C3%B6ntem-1-h%C4%B1zl%C4%B1-yerel-geli%C5%9Ftirme)
4. [Yöntem 2: Mikroservis & Konteyner Kurulumu (Docker / Podman)](#y%C3%B6ntem-2-mikroservis--konteyner-kurulumu-docker--podman)
5. [Yöntem 3: Üretim Sunucusu Dağıtımı (Nginx Ters Vekil & TLS 1.3)](#y%C3%B6ntem-3-%C3%BCretim-sunucusu-da%C4%9F%C4%B1t%C4%B1m%C4%B1-nginx-ters-vekil--tls-13)
6. [Sıfır Güven Güvenlik Sertleştirmeleri (Security Hardening)](#6-s%C4%B1f%C4%B1r-g%C3%BCven-g%C3%BCvenlik-sertle%C5%9Ftirmeleri)
7. [Doğrulama ve Canlılık Testleri (Healthcheck)](#7-do%C4%9Frulama-ve-canl%C4%B1l%C4%B1k-testleri)

---

## 1. Sistem Gereksinimleri

### Minimum Donanım:
* **İşlemci:** 1 Çekirdek 1.0 GHz+ (x86_64 veya ARM64)
* **Bellek (RAM):** 256 MB RAM (Mikroservis konteyneri için ~45 MB yeterlidir)
* **Disk Alanı:** 50 MB boş depolama alanı

### Yazılım Bağımlılıkları:
* **Geliştirme için:** Python 3.8+ veya Node.js 18+
* **Konteyner için:** Docker 24.0+ ve Docker Compose v2 (veya Podman / rootless podman-compose)
* **Üretim için:** Nginx 1.22+ veya Caddy Server, Certbot (Let's Encrypt SSL)

---

## 2. Sıfır Güven (Zero-Trust) Dağıtım İlkeleri

Dağıtım sırasında şu kurallar zorunlu olarak uygulanır:

- **Rootless Konteyner:** Hiçbir servis `root` yetkisiyle çalıştırılamaz; daima `uid:gid = 1001:1001` atanmış sınırlı kullanıcı tanımlanır.
- **Salt Okunur Kök Dosya Sistemi (`read_only: true`):** Konteyner içine zararlı yazılım enjeksiyonunu engellemek için ana dosya sistemi salt okunur bağlanır; geçici yazmalar yalnızca `/tmp` bellek alanına yönlendirilir.
- **Yetki Kısıtlama (`no-new-privileges` & `drop ALL capabilities`):** Konteynerin işletim sistemi çekirdeğine yetki yükseltmesi yapması engellenir.
- **Sıfır İstemci Güveni:** İstemciden gelen hiçbir veri filtrelenmeden işleme alınmaz.

---

## Yöntem 1: Hızlı Yerel Geliştirme (Ön Yüz + Python Arka Yüz)

Hiçbir harici sistem paketi yüklemeden, Python sanal ortamı ile mikroservisi ve ön yüzü başlatın:

### Adım 1: Python Sanal Ortamını Hazırlayın ve API Servisini Başlatın:
```bash
# Web sitesi dizinine geçin:
cd /home/can/Masaüstü/proje/mcsm/masaüstü/web_sayfasi

# Sanal ortamı oluşturun ve bağımlılıkları kurun:
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt

# FastAPI mikroservisini başlatın (Port 8000):
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
- 👉 **API Sağlık Kontrolü:** `http://127.0.0.1:8000/api/health`
- 👉 **Swagger Dokümantasyonu:** `http://127.0.0.1:8000/docs`

### Adım 2: Ön Yüz Sunucusunu Başlatın (Ayrı Terminal):
```bash
cd /home/can/Masaüstü/proje/mcsm/masaüstü/web_sayfasi
python3 -m http.server 8088
```
- 👉 **Web Platformu:** `http://localhost:8088/`

---

## Yöntem 2: Mikroservis & Konteyner Kurulumu (Docker / Podman)

Platform; Nginx ön yüz ve Python FastAPI mikroservisini tek komutla ayağa kaldıran `docker-compose.yml` yapılandırmasını destekler.

### Adım 1: Docker İmajlarını Derleyin ve Başlatın

```bash
# Frontend ve Backend konteynerlerini sıfır güven profilinde derleyin ve arka planda çalıştırın:
docker compose up -d --build
```

### Adım 2: Konteyner Durumunu Denetleyin

```bash
docker compose ps
```

*Çıktı Örneği:*
```
NAME                          IMAGE                    COMMAND                  SERVICE             STATUS              PORTS
parslinux-web-frontend-1      parslinux-web:latest    "/docker-entrypoint.…"   frontend            running (healthy)   0.0.0.0:8088->80/tcp
parslinux-web-backend-1       parslinux-api:latest     "uvicorn backend.mai…"   backend             running (healthy)   0.0.0.0:8000->8000/tcp
```

### Adım 3: Podman ile Rootless (Kök Yetkisiz) Çalıştırma:

```bash
podman-compose up -d
```

---

## Yöntem 3: Üretim Sunucusu Dağıtımı (Nginx Ters Vekil & TLS 1.3)

Üretim ortamında (`parslinux.org` veya `repo.parslinux.org`) Nginx ters vekili aşağıdaki katı güvenlik başlıklarıyla yapılandırılmalıdır:

### 1. Nginx Yapılandırma Dosyası: `/etc/nginx/sites-available/parslinux.conf`

```nginx
# HTTP'den HTTPS'e Zorunlu Yönlendirme (Zero-Trust Transport)
server {
    listen 80;
    listen [::]:80;
    server_name parslinux.org www.parslinux.org;
    return 301 https://$host$request_uri;
}

# Güvenli HTTPS Sunucusu
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name parslinux.org www.parslinux.org;

    # SSL / TLS 1.3 Sıkılaştırması
    ssl_certificate /etc/letsencrypt/live/parslinux.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/parslinux.org/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    # Kök Dizin
    root /var/www/parslinux/web_sayfasi;
    index index.html;

    # Sıfır Güven Güvenlik Başlıkları (Security Headers)
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=()" always;

    # Katı Content Security Policy (CSP)
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://unpkg.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://parslinux.github.io; frame-ancestors 'none';" always;

    # Statik Varlık Önbellekleme (Asset Cache)
    location ~* \.(css|js|png|jpg|jpeg|svg|ico|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Ana Yönlendirme (SPA Fallback)
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 2. Nginx Yapılandırmasını Etkinleştirin:

```bash
sudo ln -sf /etc/nginx/sites-available/parslinux.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 6. Sıfır Güven Güvenlik Sertleştirmeleri

Platformda sıfır güven uyumunu denetlemek için şu kontrolleri yapın:

1. **UFW Güvenlik Duvarı Yapılandırması:**
   ```bash
   sudo ufw default deny incoming
   sudo ufw default allow outgoing
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw allow ssh
   sudo ufw enable
   ```

2. **Dış Varlıklar İçin SRI (Subresource Integrity) Doğrulaması:**
   Tüm CDN script çağrılarında hash kilitleri tanımlanarak ortadaki adam (MITM) saldırıları bertaraf edilir.

3. **Gereksiz Servis İzolasyonu:**
   Sistemde hiçbir telnet, ftp veya kimliksiz veri tabanı portu dışarıya açık bırakılmaz.

---

## 7. Doğrulama ve Canlılık Testleri

Kurulumun başarılı ve sıfır güven ilkelerine uygun olduğunu doğrulamak için aşağıdaki testleri çalıştırın:

### 1. HTTP Başlık Testi (Security Headers Check):
```bash
curl -I https://parslinux.org/
```
*Beklenen Sonuç:* `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` ve `Strict-Transport-Security` başlıkları görünmelidir.

### 2. Canlı APT Deposu Bağlantı Testi:
```bash
curl -fsSL https://parslinux.github.io/apt_repo/parslinux-archive-keyring.gpg | sha256sum
```

### 3. JavaScript Sözdizimi ve Bütünlük Testi:
```bash
node -c /home/can/Masaüstü/proje/mcsm/masaüstü/web_sayfasi/app.js
```
*Beklenen Sonuç:* Kod hatasız bir şekilde `0` kodu ile dönmelidir.
