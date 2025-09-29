// script.js

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize fire particle effect
    initFireParticles();
    
    // Add smooth scrolling for navigation
    initSmoothScrolling();
    
    // Initialize background music
    initBackgroundMusic();
    
    // Initialize quote form
    initQuoteForm();
});

// Initialize animations
function initAnimations() {
    // Text writing effect for sloka
    const shloka = document.querySelector('.shloka');
    if (shloka) {
        const text = shloka.textContent;
        shloka.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                shloka.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        setTimeout(typeWriter, 500);
    }
    
    // Fade in elements when they come into view
    const fadeElements = document.querySelectorAll('.stat-card, .service-card, .project-card, .tech-category, .skill-item, .contact-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize scroll effects
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax effect for background
        const parallaxElements = document.querySelectorAll('.mandala-bg');
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Rotate chakras on scroll
        const chakras = document.querySelectorAll('.chakra-spin');
        chakras.forEach(chakra => {
            const rotation = scrollPosition * 0.5;
            chakra.style.transform = `rotate(${rotation}deg)`;
        });
    });
}

// Initialize fire particle effect
function initFireParticles() {
    // Create canvas for fire particles
    const canvas = document.createElement('canvas');
    canvas.id = 'fireCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1000';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle system
    const particles = [];
    const particleCount = 100;
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 3 + 1;
            this.speed = Math.random() * 3 + 1;
            this.alpha = Math.random() * 0.5 + 0.5;
            this.color = `rgba(255, ${Math.floor(Math.random() * 100 + 155)}, 0, ${this.alpha})`;
        }
        
        update() {
            this.y -= this.speed;
            this.alpha -= 0.005;
            if (this.alpha <= 0) {
                this.y = canvas.height + Math.random() * 100;
                this.alpha = Math.random() * 0.5 + 0.5;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Start animation
    animate();
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize background music
function initBackgroundMusic() {
    const audio = document.getElementById('background-music');
    const musicControl = document.getElementById('music-control');
    const musicIcon = document.querySelector('.music-icon');
    const musicText = document.querySelector('.music-text');
    
    if (!audio || !musicControl) return;
    
    // Set initial volume
    audio.volume = 0.3;
    
    // Try to autoplay (may be blocked by browser)
    setTimeout(() => {
        audio.play().catch(e => {
            console.log("Auto-play prevented by browser - user interaction required");
            // Show a visual indicator that music is available
            musicControl.style.animation = 'pulse 2s infinite';
        });
    }, 1000);
    
    // Music control button
    musicControl.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().then(() => {
                musicIcon.textContent = '⏸';
                musicText.textContent = 'Pause Music';
                musicControl.style.animation = 'none';
            }).catch(e => {
                console.log("Play failed: ", e);
            });
        } else {
            audio.pause();
            musicIcon.textContent = '♪';
            musicText.textContent = 'Play Music';
        }
    });
    
    // Add pulse animation for CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(255, 215, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize quote form
function initQuoteForm() {
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const project = document.getElementById('project').value;
            const budget = document.getElementById('budget').value;
            
            // Format message for WhatsApp
            const message = `*New Quote Request*

*Name:* ${name}
*Email:* ${email}
*Project Description:* ${project}
*Estimated Budget:* ${budget}`;
            
            // Replace spaces with %20 for URL encoding
            const encodedMessage = encodeURIComponent(message);
            
            // Your WhatsApp number (replace with your actual number)
            const phoneNumber = '91916202815368'; // Include country code without +
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Close the form
            closeQuoteForm();
            
            // Reset form
            quoteForm.reset();
            
            // Show confirmation message
            alert('Thank you for your request! We will get back to you soon via WhatsApp.');
        });
    }
}

// Open quote form popup
function openQuoteForm() {
    document.getElementById('quotePopup').style.display = 'flex';
}

// Close quote form popup
function closeQuoteForm() {
    document.getElementById('quotePopup').style.display = 'none';
}

// Close popup when clicking outside the form
window.addEventListener('click', function(event) {
    const popup = document.getElementById('quotePopup');
    if (event.target === popup) {
        closeQuoteForm();
    }
});

// Add interactive effects to cards
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.stat-card, .service-card, .project-card, .tech-category, .skill-item, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace('translateY(0px)', '') + ' scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace('scale(1.02)', '');
        });
    });
    
    // Add click effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    }
});

// Add the animated name rotation
document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.getElementById('nameAnimation');
    if (nameElement) {
        const roles = ['developer', 'designer', 'creator', 'analyst'];
        let currentIndex = 0;
        
        setInterval(() => {
            nameElement.textContent = roles[currentIndex];
            nameElement.style.color = getColorForRole(roles[currentIndex]);
            currentIndex = (currentIndex + 1) % roles.length;
        }, 2000);
    }
    
    function getColorForRole(role) {
        const colors = {
            'developer': '#39ff14', // neon green
            'designer': '#ffd700',  // gold
            'creator': '#ff9933',   // saffron
            'analyst': '#800080'    // purple
        };
        return colors[role] || '#ffd700'; // default to gold
    }
});
