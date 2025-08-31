Write-Host "🚀 Deploying AI Terminal to Vercel..." -ForegroundColor Green
Write-Host ""

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version 2>$null
    Write-Host "✅ Vercel CLI found: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Vercel CLI" -ForegroundColor Red
        Read-Host "Press Enter to continue..."
        exit 1
    }
}

Write-Host ""
Write-Host "📝 Deploying your portfolio..." -ForegroundColor Cyan
vercel --prod

Write-Host ""
Write-Host "🎉 Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🔑 Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to your Vercel dashboard"
Write-Host "2. Find your project"
Write-Host "3. Go to Settings → Environment Variables"
Write-Host "4. Add: GROQ_API_KEY=your_api_key_here"
Write-Host ""
Read-Host "Press Enter to continue..."
