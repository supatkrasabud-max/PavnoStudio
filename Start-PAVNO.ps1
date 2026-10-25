$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$pavnoRuntime = Get-Command node -ErrorAction SilentlyContinue
if ($pavnoRuntime) {
    $pavnoNode = $pavnoRuntime.Source
} else {
    $pavnoNode = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
}
if (-not (Test-Path -LiteralPath $pavnoNode)) {
    Write-Host 'Node.js was not found. Install Node.js LTS from https://nodejs.org and restart VS Code.'
    exit 1
}
Write-Host 'PAVNO storefront: http://127.0.0.1:3000'
Write-Host 'PAVNO demo:       http://127.0.0.1:3000/demo/'
Write-Host 'Press Ctrl+C to stop.'
& $pavnoNode (Join-Path $PSScriptRoot 'scripts/dev.mjs')
