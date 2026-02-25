#!/usr/bin/env bash
#
# Build a distributable plugin ZIP for Conversion Blocks.
# Usage: composer build-zip   (or ./scripts/build-zip.sh)
#

set -euo pipefail

PLUGIN_SLUG="conversion-blocks"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

if [ ! -d "node_modules" ]; then
  echo "==> Installing Node dependencies…"
  npm install
else
  echo "==> node_modules already exists, skipping npm install…"
fi

echo "==> Building assets…"
npm run build

echo "==> Installing Composer dependencies (production)…"
composer install --no-dev --optimize-autoloader --no-interaction

echo "==> Preparing dist directory…"
rm -rf dist "${PLUGIN_SLUG}.zip"
mkdir -p "dist/${PLUGIN_SLUG}"

echo "==> Copying distributable files…"
# Core plugin file
cp conversion-blocks.php "dist/${PLUGIN_SLUG}/"

echo "==> Copying blocks (source + compiled)…"
cp -r blocks "dist/${PLUGIN_SLUG}/"

# Readme & license
cp readme.txt "dist/${PLUGIN_SLUG}/"
cp LICENSE "dist/${PLUGIN_SLUG}/"

# Static assets (CSS, icons, compiled JS)
cp -r assets "dist/${PLUGIN_SLUG}/"

# PHP source
cp -r src "dist/${PLUGIN_SLUG}/"

# Translations
cp -r languages "dist/${PLUGIN_SLUG}/"

# Composer autoloader (production only)
cp -r vendor "dist/${PLUGIN_SLUG}/"

# Composer files
cp composer.json "dist/${PLUGIN_SLUG}/"
cp composer.lock "dist/${PLUGIN_SLUG}/"

echo "==> Generating ZIP…"
cd dist
zip -r "../${PLUGIN_SLUG}.zip" "${PLUGIN_SLUG}/"
cd ..

echo "==> Cleaning up…"
rm -rf dist

echo "==> Done! Created ${PLUGIN_SLUG}.zip"
