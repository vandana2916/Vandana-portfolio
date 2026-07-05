// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animate hamburger
    menuToggle.style.gap = navLinks.classList.contains('active') ? '10px' : '5px';
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.style.gap = '5px';
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== Active Nav Link on Scroll =====
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        if (item.getAttribute('href').slice(1) === current) {
            item.style.color = 'var(--accent-bright)';
        } else {
            item.style.color = 'var(--text-secondary)';
        }
    });
});

// ===== Scroll Reveal Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ===== Particle Effect on Cursor =====
document.addEventListener('mousemove', (e) => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// ===== Counter Animation =====
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerForStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const increment = Math.ceil(finalValue / 50);
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = target.textContent.split('+')[0] + (finalValue > 10 ? '+' : '');
                        clearInterval(counter);
                    } else {
                        target.textContent = currentValue;
                    }
                }, 30);
                
                observerForStats.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observerForStats.observe(stat));
}

// Call counter animation when page loads
window.addEventListener('load', animateCounters);

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    // Apply parallax to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// ===== Glow Effect on Buttons =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--glow-x', x + 'px');
        button.style.setProperty('--glow-y', y + 'px');
    });
});

// ===== Add Stagger Animation to Cards =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.setProperty('--delay', (index * 0.1) + 's');
});

// ===== Prevent Click on Disabled Links =====
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => e.preventDefault());
});

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeInUp 0.8s ease';
});