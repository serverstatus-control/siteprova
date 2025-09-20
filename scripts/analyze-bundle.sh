#!/bin/bash

echo "🚀 Building the production bundle..."
npm run build

echo "🔍 Analyzing bundle size..."
npm run build:analyze

echo "📊 Bundle analysis complete! Check bundle-analysis.html"

# Opzionale: calcola la dimensione totale dei file
echo "📦 Total build size:"
du -sh client/dist/

echo "📁 Asset breakdown:"
find client/dist/ -name "*.js" -exec ls -lh {} \; | awk '{print $5, $9}' | sort -hr
find client/dist/ -name "*.css" -exec ls -lh {} \; | awk '{print $5, $9}' | sort -hr