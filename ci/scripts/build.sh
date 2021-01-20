#!/usr/bin/env sh

echo "Node Version: $(node --version)"
echo "NPM Version: $(npm --version)"

cd pull-request
npm install
npm run build
