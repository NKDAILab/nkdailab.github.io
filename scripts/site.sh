#!/usr/bin/env bash
set -euo pipefail
site_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
local_node="$site_root/../.tools/node-v22.23.4-linux-x64/bin"
if ! command -v node >/dev/null 2>&1 && [ -x "$local_node/node" ]; then
  export PATH="$local_node:$PATH"
fi
if ! command -v node >/dev/null 2>&1; then
  printf '%s\n' 'Node.js 22.19+ is required. Install the version in .nvmrc, then run npm ci.' >&2
  exit 1
fi
cd "$site_root"
export ASTRO_TELEMETRY_DISABLED=1
exec npm run "${1:-dev}" -- "${@:2}"
