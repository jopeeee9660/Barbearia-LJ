$sourceDir = "C:\Users\joao_poier\Barbearia-LJ\imagens"
$destDir = "C:\Users\joao_poier\Barbearia-LJ\react\public\imagens"

Write-Host "Copiando imagens..." -ForegroundColor Yellow

Get-ChildItem -Path $sourceDir -File | ForEach-Object {
    $destPath = Join-Path $destDir $_.Name
    Copy-Item -Path $_.FullName -Destination $destPath -Force
    Write-Host "✓ Copiado: $($_.Name)" -ForegroundColor Green
}

Write-Host "`nConcluído! Imagens copiadas com sucesso!" -ForegroundColor Green
Write-Host "Atualize o navegador (F5) para ver as imagens." -ForegroundColor Cyan
