$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$patterns = @(
  [char]0x00C3,  # Ã
  [char]0x00C2,  # Â
  [char]0xFFFD   # �
)

$files = rg --files -g "*.html" -g "*.js" -g "*.css" -g "*.md"
$bad = @()

foreach ($file in $files) {
  $path = Join-Path $root $file
  $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
  foreach ($pattern in $patterns) {
    if ($content.Contains($pattern)) {
      $bad += $file
      break
    }
  }
}

if ($bad.Count -eq 0) {
  Write-Output "OK: Keine Umlaut-/Encoding-Fehler gefunden."
  exit 0
}

Write-Output "FEHLER: Verdächtige Dateien gefunden:"
$bad | Sort-Object -Unique | ForEach-Object { Write-Output " - $_" }
exit 1
