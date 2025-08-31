# 🚀 AI Terminal Setup Guide

## 🎯 What We're Building
A fully operational AI terminal that responds as Rohit Suryadevara, using real AI models to answer questions about your work, experience, and projects.

## 🌟 Current Status
- ✅ Terminal interface is complete
- ✅ Fallback responses work
- ✅ Ready for AI integration
- ⏳ AI API needs to be configured

## 🚀 Quick Start (Recommended: Vercel)

### Step 1: Deploy to Vercel
1. **Run the deployment script:**
   ```bash
   # Windows
   deploy.bat
   
   # PowerShell
   .\deploy.ps1
   ```

2. **Or deploy manually:**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

### Step 2: Get AI API Key
1. **Sign up for Groq (Free):**
   - Go to [groq.com](https://groq.com)
   - Create account (free tier: 100 requests/day)
   - Get API key from dashboard

2. **Alternative: Hugging Face (Free):**
   - Go to [huggingface.co](https://huggingface.co)
   - Create account (free tier: 30,000 requests/month)
   - Get API key from settings

### Step 3: Configure Environment Variables
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Find your project
3. Go to **Settings** → **Environment Variables**
4. Add: `GROQ_API_KEY=your_api_key_here`

### Step 4: Test Your Terminal
Visit your deployed site and try:
```bash
ask Tell me about your HFT work
ask How do you approach ML optimization?
ask What's your background in BCI?
```

## 🔧 Alternative Deployment Options

### Option 2: Netlify Functions
1. **Deploy via Netlify UI:**
   - Drag and drop your project folder
   - Functions will auto-deploy from `api/` folder

2. **Set environment variables:**
   - Site settings → Environment variables
   - Add: `GROQ_API_KEY=your_api_key_here`

### Option 3: Cloudflare Workers
1. **Install Wrangler:**
   ```bash
   npm install -g wrangler
   ```

2. **Deploy:**
   ```bash
   wrangler publish
   ```

## 🤖 AI API Configuration

### Groq Integration (Recommended)
The API is pre-configured for Groq. Just uncomment in `api/ai-chat.js`:

```javascript
const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: question }
        ],
        max_tokens: 500,
        temperature: 0.7
    })
});
```

### Hugging Face Integration
For Hugging Face, update the API call:

```javascript
const hfResponse = await fetch('https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        inputs: `<s>[INST] ${SYSTEM_PROMPT}\n\nUser: ${question} [/INST]`,
        parameters: {
            max_new_tokens: 500,
            temperature: 0.7
        }
    })
});
```

## 🧪 Testing Your Setup

### Test Commands
```bash
# Basic functionality
help
projects
skills
experience

# AI-powered questions
ask Tell me about your HFT operating system
ask How do you achieve 98% efficiency?
ask What's your approach to ML optimization?
ask What programming languages do you use?
```

### Expected Behavior
- ✅ Commands execute instantly
- ✅ AI responses appear with typing animation
- ✅ Fallback responses work if API fails
- ✅ Command history works (arrow keys)
- ✅ Terminal scrolls automatically

## 🚨 Troubleshooting

### Terminal Not Working
- Check browser console for errors
- Ensure `js/main.js` is loaded
- Verify HTML IDs match JavaScript selectors

### AI API Not Responding
- Check API key is set correctly
- Verify API endpoint URL
- Check CORS settings
- Monitor API rate limits

### Deployment Issues
- Ensure `api/` folder is included
- Check serverless function logs
- Verify environment variables are set

## 🔒 Security & Best Practices

### API Key Protection
- ✅ Never expose API keys in frontend code
- ✅ Use environment variables
- ✅ Set appropriate CORS policies
- ✅ Monitor API usage

### Rate Limiting
- Groq: 100 requests/day (free)
- Hugging Face: 30,000 requests/month (free)
- Consider upgrading for production use

## 📱 Mobile Optimization
The terminal is fully responsive:
- Touch-friendly input
- Scrollable output
- Optimized font sizes
- Proper spacing for mobile

## 🎨 Customization

### Styling
Edit `styles/main.css` to customize:
- Terminal colors
- Font sizes
- Animations
- Layout spacing

### AI Responses
Edit `api/ai-chat.js` to customize:
- System prompt
- Model parameters
- Response formatting
- Fallback responses

## 🚀 Performance Tips

- Terminal responses are instant
- AI responses typically 1-3 seconds
- Fallback responses load immediately
- Smooth animations with CSS transitions
- Efficient DOM manipulation

## 📈 Analytics (Optional)

Track terminal usage:
```javascript
// Add to your analytics
function trackQuestion(question) {
    gtag('event', 'terminal_question', {
        question: question
    });
}
```

## 🎉 Success!

Once deployed, your portfolio will have:
- ✅ Interactive AI terminal
- ✅ Professional appearance
- ✅ Engaging user experience
- ✅ Technical showcase
- ✅ Unique portfolio feature

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify all files are deployed
3. Test API endpoints separately
4. Check deployment platform logs
5. Review environment variables

---

**Your AI Terminal is now ready to impress visitors and showcase your technical expertise! 🚀**

## 🔑 Quick Reference

| Platform | Free Tier | Setup Time | Difficulty |
|----------|-----------|------------|------------|
| **Vercel** | 100 requests/day | 5 minutes | ⭐ Easy |
| **Netlify** | 30,000 requests/month | 10 minutes | ⭐⭐ Medium |
| **Cloudflare** | 100,000 requests/day | 15 minutes | ⭐⭐⭐ Hard |

**Recommendation: Start with Vercel for simplicity, then migrate to others as needed.**
