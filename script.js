const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

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

const testimonialCards = document.getElementById('testimonialCards');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let totalSlides = 2;

function updateSlider() {
    const cardWidth = testimonialCards.children[0].offsetWidth + 32;
    const visibleCards = window.innerWidth > 968 ? 3 : window.innerWidth > 640 ? 2 : 1;
    totalSlides = Math.max(1, Math.ceil(testimonialCards.children.length / visibleCards) - (visibleCards - 1));
    
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;

    testimonialCards.style.transform = `translateX(-${currentSlide * cardWidth * visibleCards / visibleCards}px)`;
    testimonialCards.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide % dots.length);
    });
}

prevBtn.addEventListener('click', () => {
    currentSlide--;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentSlide++;
    updateSlider();
});

dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
        currentSlide = idx;
        updateSlider();
    });
});

window.addEventListener('resize', updateSlider);
setTimeout(updateSlider, 100);

const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}
