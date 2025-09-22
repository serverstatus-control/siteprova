#!/bin/bash
# Post-build script per Render

echo "Building client..."
npm run build:client:render

echo "Copying dist to client/dist for Render..."
mkdir -p client/dist
cp -r dist/* client/dist/

echo "Build completed successfully!"