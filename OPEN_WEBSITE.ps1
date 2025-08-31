Write-Host "Opening Portfolio Website..." -ForegroundColor Green
Write-Host ""

# Try to open the website
try {
    Start-Process "index.html"
    Write-Host "Website opened successfully!" -ForegroundColor Green
} catch {
    Write-Host "Could not open automatically. Please:" -ForegroundColor Yellow
    Write-Host "1. Double-click index.html file" -ForegroundColor White
    Write-Host "2. Or right-click index.html and choose 'Open with' your browser" -ForegroundColor White
}

Write-Host ""
Write-Host "Alternative: Start development server with 'start-dev.ps1'" -ForegroundColor Cyan
Read-Host "Press Enter to continue"
