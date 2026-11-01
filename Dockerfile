# ==============================================================================
# ParsLinux Web Platform - Zero-Trust Production Dockerfile
# Base: Alpine Linux (Minimal Attack Surface, Rootless)
# ==============================================================================

FROM nginxinc/nginx-unprivileged:alpine-slim

# Labels
LABEL maintainer="ParsLinux Team <support@parslinux.org>"
LABEL description="ParsLinux 1.0 Anatolian Official Web Platform (Zero-Trust Static Frontend)"
LABEL org.opencontainers.image.source="https://github.com/parslinux"

USER root

# Copy static web platform assets
COPY . /usr/share/nginx/html/

# Clean up unnecessary files inside the container
RUN rm -rf /usr/share/nginx/html/Dockerfile \
           /usr/share/nginx/html/docker-compose.yml \
           /usr/share/nginx/html/.git* \
    && chown -R 101:101 /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

# Switch back to unprivileged non-root user (Zero-Trust Least Privilege)
USER 101

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
