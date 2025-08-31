@echo off
echo 🚀 Deploying AI Terminal to Vercel...
echo.

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Failed to install Vercel CLI
        pause
        exit /b 1
    )
)

echo ✅ Vercel CLI found
echo.
echo 📝 Deploying your portfolio...
vercel --prod

echo.
echo 🎉 Deployment complete!
echo.
echo 🔑 Next steps:
echo 1. Go to your Vercel dashboard
echo 2. Find your project
echo 3. Go to Settings → Environment Variables
echo 4. Add: GROQ_API_KEY=your_api_key_here
echo.
pause
