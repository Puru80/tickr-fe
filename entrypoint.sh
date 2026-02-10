#!/bin/sh
# Find where nginx is actually looking for files and write there
TARGET_DIR="/usr/share/nginx/html"
echo "window._env_ = { \"VITE_API_URL\": \"${VITE_API_URL}\" };" > $TARGET_DIR/env-config.js

echo "Generated env-config.js in $TARGET_DIR with URL: ${VITE_API_URL}"
exec nginx -g "daemon off;"