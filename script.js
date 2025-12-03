// ===========================
// Portfolio Static Website
// JavaScript for Interactivity
// ===========================

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to light mode
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeIcon('light');
    } else {
        body.classList.remove('dark-mode');
        updateThemeIcon('dark');
    }
}

// Update theme icon
function updateThemeIcon(nextTheme) {
    const icon = themeToggle.querySelector('.theme-icon');
    icon.textContent = nextTheme === 'dark' ? '🌙' : '☀️';
}

// Toggle dark mode
themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-mode');
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon(isDarkMode ? 'light' : 'dark');
});

// Initialize theme on page load
initTheme();

// Navigation Active Link
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !subject || !message) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide');
        return;
    }
    
    // Show success message
    alert(`Merci ${name}! Votre message n'a pas été envoyer, ceci est une demonstration.`);
    
    // Reset form
    contactForm.reset();
    
    // Note: In a real application, you would send this data to a server
    console.log('Form Data:', { name, email, subject, message });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe portfolio cards and CV items for fade-in animation
document.querySelectorAll('.portfolio-card, .cv-item, .skill-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Add scroll animation to hero section
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroDecoration = document.querySelector('.decoration-circle');
    if (heroDecoration) {
        heroDecoration.style.transform = `translateY(calc(-50% + ${scrollY * 0.5}px))`;
    }
});

// Prevent form submission if no backend is available
console.log('Portfolio website loaded successfully!');
console.log('Note: Contact form is a demo. To enable email functionality, integrate with a backend service like Formspree, Netlify Forms, or EmailJS.');
