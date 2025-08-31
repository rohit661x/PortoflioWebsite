Write-Host "Starting Portfolio Website Development Server..." -ForegroundColor Green
Write-Host ""
Write-Host "Server will be available at: http://localhost:8000" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

try {
    python -m http.server 8000
} catch {
    Write-Host "Python not found. Trying alternative methods..." -ForegroundColor Yellow
    
    # Try Node.js serve if available
    try {
        npx serve . --port 8000
    } catch {
        Write-Host "No development server found. Please install Python or Node.js." -ForegroundColor Red
        Write-Host "Or simply open index.html in your browser." -ForegroundColor Yellow
        Read-Host "Press Enter to continue"
    }
}
