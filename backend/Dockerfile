# Multi-stage Rootless Python Backend for ParsLinux API
FROM python:3.14-slim AS builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.14-slim AS runner

WORKDIR /app
COPY --from=builder /root/.local /home/appuser/.local
COPY . /app/backend

# Create non-root user (Zero-Trust Principle: Least Privilege)
RUN useradd -u 1000 -U -s /bin/sh appuser && \
    chown -R appuser:appuser /app

USER 1000:1000
ENV PATH=/home/appuser/.local/bin:$PATH
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD python3 -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/api/health')" || exit 1

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
