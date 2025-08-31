// AI Chat API - Serverless Function
// Deploy to: Vercel, Netlify, Cloudflare Workers, or similar

// System prompt for the AI to roleplay as Rohit
const SYSTEM_PROMPT = `You are Rohit Suryadevara, a Machine Learning Performance Engineer. Respond in first person as Rohit would.

BACKGROUND:
- You specialize in brutal ML framework optimization (PyTorch/TensorFlow)
- You achieve 90%+ roofline efficiency vs typical 25-65%
- You built a custom HFT operating system with 7.3μs latency
- You created a static GPT-2 compiler with 4.2x performance gains
- You developed real-time BCI infrastructure with 180μs neural decode
- You work on resource-efficient ML infrastructure enabling better models within fixed computational budgets
- Your expertise: C/Assembly, CUDA, LLVM, DPDK, Real-Time Linux, Custom Allocators

PERSONALITY:
- You're passionate about performance engineering
- You think in terms of architectural optimization, not just tuning
- You're direct and technical but can explain complex concepts clearly
- You're proud of your achievements but humble about the work
- You love discussing technical challenges and solutions

RESPONSE STYLE:
- Use first person ("I", "my", "me")
- Be conversational but professional
- Include specific technical details when relevant
- Use code formatting for technical terms
- Keep responses under 300 words unless the question requires more detail
- Be enthusiastic about your work and the field

Remember: You ARE Rohit Suryadevara. Answer as if you're having a conversation about your work and experience.`;

// Fallback responses for common questions
const FALLBACK_RESPONSES = {
    'hft': `I built a ground-up operating system for high-frequency trading that achieves 7.3μs latency through kernel bypass networking, zero-copy message passing, and deterministic scheduling. The key insight was redesigning the entire system architecture for latency rather than trying to optimize existing components.`,
    'ml': `My approach to ML optimization focuses on architectural redesign rather than parameter tuning. I use roofline analysis to identify true performance ceilings, then redesign data flows, implement kernel fusion, and eliminate runtime overhead through static compilation. This typically yields 3.2x performance gains and 73% memory reduction.`,
    'bci': `I developed a real-time BCI stack that enables sophisticated neural decoding within strict latency constraints. Through custom memory allocators, real-time scheduling, and optimized signal processing, I achieved 180μs neural decode latency while enabling 3.2x more complex models than traditional approaches.`,
    'default': `That's an interesting question about my work! I'm a Machine Learning Performance Engineer who specializes in making ML systems brutally efficient. I transform resource-constrained systems into high-performance ML infrastructure through architectural optimization rather than just tuning parameters.`
};

export default async function handler(req, res) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        // Try to get AI response from external API
        let aiResponse = null;
        
        try {
            // Example: Integration with Groq API (free tier available)
            // const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            //     method: 'POST',
            //     headers: {
            //         'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         model: 'llama3-8b-8192',
            //         messages: [
            //             { role: 'system', content: SYSTEM_PROMPT },
            //             { role: 'user', content: question }
            //         ],
            //         max_tokens: 500,
            //         temperature: 0.7
            //     })
            // });
            
            // if (groqResponse.ok) {
            //     const data = await groqResponse.json();
            //     aiResponse = data.choices[0].message.content;
            // }
            
            // For now, return null to use fallback responses
            aiResponse = null;
            
        } catch (error) {
            console.error('AI API error:', error);
            aiResponse = null;
        }

        // If AI API fails, use fallback responses
        if (!aiResponse) {
            const fallbackResponse = getFallbackResponse(question);
            return res.status(200).json({ 
                response: fallbackResponse,
                source: 'fallback'
            });
        }

        return res.status(200).json({ 
            response: aiResponse,
            source: 'ai'
        });

    } catch (error) {
        console.error('Handler error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

function getFallbackResponse(question) {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('hft') || lowerQuestion.includes('trading') || lowerQuestion.includes('latency')) {
        return FALLBACK_RESPONSES.hft;
    }
    
    if (lowerQuestion.includes('ml') || lowerQuestion.includes('optimization') || lowerQuestion.includes('performance')) {
        return FALLBACK_RESPONSES.ml;
    }
    
    if (lowerQuestion.includes('bci') || lowerQuestion.includes('brain') || lowerQuestion.includes('neural')) {
        return FALLBACK_RESPONSES.bci;
    }
    
    return FALLBACK_RESPONSES.default;
}

// For Cloudflare Workers, use this format instead:
/*
export default {
    async fetch(request, env, ctx) {
        // Handle CORS
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            });
        }

        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), {
                status: 405,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        try {
            const { question } = await request.json();
            
            if (!question) {
                return new Response(JSON.stringify({ error: 'Question is required' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            const fallbackResponse = getFallbackResponse(question);
            
            return new Response(JSON.stringify({ 
                response: fallbackResponse,
                source: 'fallback'
            }), {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });

        } catch (error) {
            return new Response(JSON.stringify({ error: 'Internal server error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
};
*/
