FROM louislam/uptime-kuma:1.23.3

COPY dist/ /app/dist/
COPY server/notification-providers /app/server/notification-providers