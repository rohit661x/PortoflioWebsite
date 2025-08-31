// Intro sequence
window.addEventListener('load', function() {
    // Ensure page starts at top
    window.scrollTo(0, 0);
    
    // Hide loading screen after brief delay
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 800);

    // Start intro sequence after loading screen
    setTimeout(() => {
        // After complete intro sequence, show main content
        setTimeout(() => {
            document.getElementById('introScreen').classList.add('hidden');
            document.getElementById('mainContent').classList.add('visible');
            
            // Ensure page stays at top after intro
            window.scrollTo(0, 0);
            
            // Prevent any automatic scrolling
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
        }, 6000); // Wait for name fade + welcome appearance + brief pause
    }, 1000);
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Prevent any automatic scrolling during page load
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Additional scroll prevention during intro sequence
let introActive = true;
setTimeout(() => {
    introActive = false;
}, 7000); // After intro sequence completes

window.addEventListener('scroll', function() {
    if (introActive) {
        window.scrollTo(0, 0);
    }
});

// Function to ensure page stays at top
function ensureTopPosition() {
    if (window.pageYOffset !== 0) {
        window.scrollTo(0, 0);
    }
}

// Call this function multiple times to ensure it works
setTimeout(ensureTopPosition, 100);
setTimeout(ensureTopPosition, 500);
setTimeout(ensureTopPosition, 1000);
setTimeout(ensureTopPosition, 2000);

// Portfolio section visibility on scroll
const portfolioSection = document.getElementById('portfolio');
const contactSection = document.getElementById('contact');
const terminalSection = document.getElementById('terminal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

observer.observe(portfolioSection);
observer.observe(contactSection);
observer.observe(terminalSection);

// Parallax effect for orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.2 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Intersection observer for animations
const animatedElements = document.querySelectorAll('.metric-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }, index * 100);
        }
    });
}, { threshold: 0.5 });

animatedElements.forEach(el => {
    cardObserver.observe(el);
});

// Project cards animation
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }, index * 200);
        }
    });
}, { threshold: 0.2 });

projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    projectObserver.observe(card);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual backend integration)
        showNotification('Sending message...', 'info');
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
        }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        backdrop-filter: blur(20px);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Enhanced scroll animations
const scrollAnimations = () => {
    const elements = document.querySelectorAll('.project-card, .metric-card, .contact-method');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Throttled scroll handler for performance
let ticking = false;
function updateScrollAnimations() {
    if (!ticking) {
        requestAnimationFrame(() => {
            scrollAnimations();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateScrollAnimations);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    scrollAnimations();
});

// Add some interactive effects to project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Add typing effect after intro sequence
setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
}, 7000);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handlers
const debouncedScrollHandler = debounce(updateScrollAnimations, 16);
window.addEventListener('scroll', debouncedScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
});

// Add smooth reveal animation for contact methods
const contactMethods = document.querySelectorAll('.contact-method');
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.5 });

contactMethods.forEach((method, index) => {
    method.style.opacity = '0';
    method.style.transform = 'translateX(30px)';
    method.style.transition = 'all 0.6s ease';
    contactObserver.observe(method);
});

// Terminal functionality
class Terminal {
    constructor() {
        this.output = document.getElementById('terminalOutput');
        this.input = document.getElementById('terminalInput');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isProcessing = false;
        
        this.init();
    }
    
    init() {
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.input.focus();
        
        // Add some initial commands
        this.addCommand('help', 'help');
    }
    
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.executeCommand();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateHistory('up');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateHistory('down');
        }
    }
    
    executeCommand() {
        const command = this.input.value.trim();
        if (!command || this.isProcessing) return;
        
        this.addCommand(command);
        this.input.value = '';
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
        
        this.processCommand(command);
    }
    
    addCommand(command, displayCommand = null) {
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line';
        commandLine.innerHTML = `
            <span class="prompt">visitor@rohit-portfolio:~$</span>
            <span class="command">${displayCommand || command}</span>
        `;
        this.output.appendChild(commandLine);
        this.scrollToBottom();
    }
    
    addResponse(response) {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'terminal-response';
        responseDiv.innerHTML = response;
        this.output.appendChild(responseDiv);
        this.scrollToBottom();
    }
    
    addLoadingResponse() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'terminal-response';
        loadingDiv.innerHTML = '<span class="loading-dots">Thinking</span>';
        this.output.appendChild(loadingDiv);
        this.scrollToBottom();
        return loadingDiv;
    }
    
    processCommand(command) {
        const lowerCommand = command.toLowerCase();
        
        if (lowerCommand === 'clear') {
            this.clearTerminal();
            return;
        }
        
        if (lowerCommand === 'help') {
            this.showHelp();
            return;
        }
        
        if (lowerCommand === 'projects') {
            this.showProjects();
            return;
        }
        
        if (lowerCommand === 'skills') {
            this.showSkills();
            return;
        }
        
        if (lowerCommand === 'experience') {
            this.showExperience();
            return;
        }
        
        if (lowerCommand.startsWith('ask ')) {
            const question = command.substring(4);
            this.askQuestion(question);
            return;
        }
        
        // Unknown command
        this.addResponse(`Command not found: <code>${command}</code><br><br>Type <code>help</code> to see available commands.`);
    }
    
    clearTerminal() {
        this.output.innerHTML = '';
    }
    
    showHelp() {
        this.addResponse(`
            Welcome to Rohit's AI Terminal! I'm an AI trained on Rohit's background as a Machine Learning Performance Engineer.
            <br><br>
            <strong>Available commands:</strong><br>
            • <code>ask [question]</code> - Ask me anything about Rohit's work, experience, or projects<br>
            • <code>projects</code> - Get details about Rohit's key projects<br>
            • <code>skills</code> - Learn about Rohit's technical expertise<br>
            • <code>experience</code> - Understand Rohit's background and achievements<br>
            • <code>clear</code> - Clear the terminal<br>
            • <code>help</code> - Show this help message
            <br><br>
            <strong>Example:</strong> <code>ask Tell me about your HFT operating system work</code>
        `);
    }
    
    showProjects() {
        this.addResponse(`
            <strong>🚀 Rohit's Key Projects:</strong><br><br>
            
            <strong>1. HFT Low-Latency OS</strong><br>
            • Custom operating system for microsecond-precision trading<br>
            • Achieved 7.3μs average latency (vs typical 50-100μs)<br>
            • 99.9% deterministic execution paths<br>
            • Technologies: C/Assembly, DPDK, RDMA, Real-Time Linux<br><br>
            
            <strong>2. Static GPT-2 Compiler</strong><br>
            • Ahead-of-time compilation eliminating PyTorch runtime overhead<br>
            • 4.2x faster inference, 68% less memory usage<br>
            • Zero runtime overhead through kernel fusion<br>
            • Technologies: LLVM, CUDA Kernels, Graph IR<br><br>
            
            <strong>3. Real-Time BCI Stack</strong><br>
            • Ultra-low latency neural interface infrastructure<br>
            • 180μs neural decode latency<br>
            • 3.2x model complexity within real-time constraints<br>
            • Technologies: Real-Time Linux, Custom Allocators, Signal Processing
        `);
    }
    
    showSkills() {
        this.addResponse(`
            <strong>⚡ Rohit's Technical Expertise:</strong><br><br>
            
            <strong>Core Technologies:</strong><br>
            • <code>C/Assembly</code> - Low-level system programming<br>
            • <code>CUDA</code> - GPU computing and optimization<br>
            • <code>LLVM</code> - Compiler infrastructure<br>
            • <code>DPDK</code> - High-performance networking<br>
            • <code>Real-Time Linux</code> - Deterministic systems<br><br>
            
            <strong>Specializations:</strong><br>
            • ML Framework Optimization (PyTorch/TensorFlow)<br>
            • Performance Profiling & Roofline Analysis<br>
            • Custom Memory Allocators<br>
            • Kernel Bypass Networking<br>
            • Neural Network Compilation<br><br>
            
            <strong>Performance Metrics:</strong><br>
            • 90%+ roofline efficiency (vs typical 25-65%)<br>
            • 3.2x performance gains through optimization<br>
            • Sub-millisecond latency systems
        `);
    }
    
    showExperience() {
        this.addResponse(`
            <strong>🎯 Rohit's Background & Achievements:</strong><br><br>
            
            <strong>Professional Focus:</strong><br>
            Machine Learning Performance Engineer specializing in brutal framework optimization and resource-efficient ML infrastructure.<br><br>
            
            <strong>Key Achievements:</strong><br>
            • Transformed ML frameworks from 25% to 98% efficiency<br>
            • Built systems handling 2.3M operations per second<br>
            • Reduced memory usage by 73% in production systems<br>
            • Achieved sub-200μs latency in brain-computer interfaces<br><br>
            
            <strong>Philosophy:</strong><br>
            "I don't just optimize code - I transform resource-constrained systems into high-performance ML infrastructure. Every percentage point of efficiency unlocks better models within fixed computational budgets."
        `);
    }
    
    async askQuestion(question) {
        if (!question.trim()) {
            this.addResponse('Please provide a question after "ask". Example: <code>ask Tell me about your HFT work</code>');
            return;
        }
        
        const loadingDiv = this.addLoadingResponse();
        
        try {
            // Try to get AI response first
            const aiResponse = await this.getAIResponse(question);
            if (aiResponse) {
                loadingDiv.remove();
                this.addResponse(aiResponse);
                return;
            }
        } catch (error) {
            console.log('AI API failed, using fallback responses');
        }
        
        // Fallback to predefined responses
        loadingDiv.remove();
        const fallbackResponse = this.getFallbackResponse(question);
        this.addResponse(fallbackResponse);
    }
    
    async getAIResponse(question) {
        try {
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.response;
            }
        } catch (error) {
            console.error('API error:', error);
        }
        
        return null; // Fall back to predefined responses
    }
    
    getFallbackResponse(question) {
        const lowerQuestion = question.toLowerCase();
        
        // HFT related questions
        if (lowerQuestion.includes('hft') || lowerQuestion.includes('trading') || lowerQuestion.includes('latency')) {
            return `
                <strong>🎯 HFT Operating System Work:</strong><br><br>
                I built a ground-up operating system specifically for high-frequency trading operations. The key insight was that traditional OS kernels introduce unpredictable latency through context switching, memory management, and network stack overhead.<br><br>
                
                <strong>Key Innovations:</strong><br>
                • <code>Kernel Bypass Networking</code> - Direct hardware access eliminating OS overhead<br>
                • <code>Zero-Copy Message Passing</code> - Eliminated memory allocation/deallocation cycles<br>
                • <code>Deterministic Scheduling</code> - Guaranteed sub-10μs execution paths<br>
                • <code>Custom Memory Allocators</code> - Pre-allocated pools with O(1) access<br><br>
                
                <strong>Results:</strong><br>
                • 7.3μs average latency (vs 50-100μs on standard Linux)<br>
                • 99.9% deterministic execution<br>
                • 2.3M operations per second<br><br>
                
                This work taught me that performance isn't about optimizing individual components - it's about designing systems where every layer serves the latency goal.
            `;
        }
        
        // ML optimization questions
        if (lowerQuestion.includes('ml') || lowerQuestion.includes('optimization') || lowerQuestion.includes('performance') || lowerQuestion.includes('efficiency')) {
            return `
                <strong>⚡ ML Performance Engineering Philosophy:</strong><br><br>
                My approach to ML optimization is fundamentally different from typical "tuning" approaches. I focus on <code>architectural optimization</code> rather than parameter tweaking.<br><br>
                
                <strong>Core Principles:</strong><br>
                • <code>Roofline Analysis</code> - Identify the true performance ceiling, not just current bottlenecks<br>
                • <code>Memory Hierarchy Optimization</code> - Design data flows that respect cache behavior<br>
                • <code>Kernel Fusion</code> - Combine operations to reduce memory bandwidth pressure<br>
                • <code>Static Compilation</code> - Eliminate runtime overhead through ahead-of-time optimization<br><br>
                
                <strong>Typical Results:</strong><br>
                • 25% → 98% framework efficiency<br>
                • 3.2x performance gains<br>
                • 73% memory reduction<br><br>
                
                The key insight: Most ML frameworks are designed for flexibility, not performance. I redesign them for speed.
            `;
        }
        
        // BCI questions
        if (lowerQuestion.includes('bci') || lowerQuestion.includes('brain') || lowerQuestion.includes('neural') || lowerQuestion.includes('interface')) {
            return `
                <strong>🧠 Brain-Computer Interface Infrastructure:</strong><br><br>
                I developed a real-time BCI stack that enables sophisticated neural decoding within strict latency constraints. The challenge: most BCI systems use simplified models to meet real-time requirements, but I wanted to enable complex neural networks.<br><br>
                
                <strong>Technical Approach:</strong><br>
                • <code>Custom Memory Allocators</code> - Eliminated garbage collection pauses<br>
                • <code>Real-Time Scheduling</code> - Guaranteed response times under load<br>
                • <code>Signal Processing Pipeline</code> - Optimized for streaming data<br>
                • <code>Neural Decoder Optimization</code> - Reduced inference time from ms to μs<br><br>
                
                <strong>Results:</strong><br>
                • 180μs neural decode latency<br>
                • 3.2x model complexity within real-time constraints<br>
                • 18% improvement in decode accuracy<br><br>
                
                This project showed me that real-time constraints don't have to limit model sophistication - they just require different architectural thinking.
            `;
        }
        
        // General questions about Rohit
        if (lowerQuestion.includes('who') || lowerQuestion.includes('what') || lowerQuestion.includes('how') || lowerQuestion.includes('why')) {
            return `
                <strong>👨‍💻 About Rohit Suryadevara:</strong><br><br>
                I'm a Machine Learning Performance Engineer who specializes in making ML systems brutally efficient. My work spans from low-level system programming to high-level ML framework optimization.<br><br>
                
                <strong>What I Do:</strong><br>
                I transform resource-constrained systems into high-performance ML infrastructure. This means optimizing everything from memory allocators to neural network compilation.<br><br>
                
                <strong>My Approach:</strong><br>
                I don't just tune parameters - I redesign architectures. When I see a system running at 25% efficiency, I don't ask "how can we optimize it?" I ask "how can we redesign it to hit 98%?"<br><br>
                
                <strong>Why Performance Matters:</strong><br>
                Every percentage point of efficiency unlocks better models within fixed computational budgets. In production systems, this means the difference between a model that's too expensive to deploy and one that runs profitably.<br><br>
                
                <strong>Favorite Programming Language:</strong> C, because it gives me direct control over memory and performance. But I'll use whatever gets the job done fastest.
            `;
        }
        
        // Default response
        return `
            <strong>🤖 AI Response:</strong><br><br>
            That's an interesting question about my work! While I'd love to give you a detailed, personalized answer, I'm currently running on fallback responses.<br><br>
            
            <strong>Try asking about:</strong><br>
            • My HFT operating system work<br>
            • ML optimization approaches<br>
            • BCI infrastructure development<br>
            • General questions about my background<br><br>
            
            <strong>Example questions:</strong><br>
            • <code>ask Tell me about your HFT work</code><br>
            • <code>ask How do you approach ML optimization?</code><br>
            • <code>ask What's your background in BCI?</code>
        `;
    }
    
    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        if (direction === 'up') {
            if (this.historyIndex > 0) {
                this.historyIndex--;
            }
        } else {
            if (direction === 'down') {
                if (this.historyIndex < this.commandHistory.length) {
                    this.historyIndex++;
                }
            }
        }
        
        if (this.historyIndex >= 0 && this.historyIndex < this.commandHistory.length) {
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (this.historyIndex >= this.commandHistory.length) {
            this.input.value = '';
            this.historyIndex = this.commandHistory.length;
        }
        
        this.input.setSelectionRange(this.input.value.length, this.input.value.length);
    }
    
    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('terminalOutput')) {
        new Terminal();
    }
});
