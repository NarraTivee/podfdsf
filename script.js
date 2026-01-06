document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Портфолио загружено');

    initNavbar();
    initTypingEffect();
    initOrbitAnimations();
    initSmoothScroll();
    initSectionAnimations();
    initContactForm();
});

// ===== НАВИГАЦИЯ =====
function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    });

    sections.forEach(section => observer.observe(section));
}

// ===== ТИПИНГ ЭФФЕКТ =====
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;

    const phrases = [
        'Web Developer',
        'Front-End',
        'Problem Solver',
        'Code Explorer',
        'AI Explorer',
        'Innovator'
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

// ===== АНИМАЦИЯ ОРБИТ =====
function initOrbitAnimations() {
    const planets = document.querySelectorAll('.random-orbit');

    planets.forEach((planet, index) => {
        const startAngle = Math.random() * 360;
        const radius = 120 + (index * 40);
        const duration = 15 + Math.random() * 15;
        const direction = Math.random() > 0.5 ? 'normal' : 'reverse';

        planet.style.transform = `rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg)`;

        const animationName = `orbit${index}`;
        const keyframes = `
            @keyframes ${animationName} {
                from {
                    transform: rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg);
                }
                to {
                    transform: rotate(${startAngle + 360}deg) translateX(${radius}px) rotate(-${startAngle + 360}deg);
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);

        planet.style.animation = `${animationName} ${duration}s linear infinite ${direction}`;

        planet.addEventListener('mouseenter', () => {
            planet.style.animationPlayState = 'paused';
        });

        planet.addEventListener('mouseleave', () => {
            planet.style.animationPlayState = 'running';
        });
    });
}

// ===== ПЛАВНЫЙ СКРОЛЛ =====
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== АНИМАЦИЯ СЕКЦИЙ =====
function initSectionAnimations() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0, 0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => elementObserver.observe(element));
}

// ===== КОНТАКТНАЯ ФОРМА =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        console.warn('⚠️ Контактная форма не найдена');
        return;
    }

    console.log('📝 Контактная форма найдена');

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        console.log('📤 Отправка формы...');

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;

        try {
            const timeField = document.createElement('input');
            timeField.type = 'hidden';
            timeField.name = 'time';
            timeField.value = new Date().toLocaleString('ru-RU');
            this.appendChild(timeField);

            console.log('📨 Отправляю данные...');
            console.log('Имя:', this.user_name.value);
            console.log('Email:', this.user_email.value);
            console.log('Сообщение:', this.message.value);

            const response = await emailjs.sendForm(
                "service_aegwa4n",
                "template_45o2ltu",
                this
            );

            console.log('✅ Успех! Статус:', response.status);
            console.log('Ответ:', response.text);

            showNotification('success', '✅ Сообщение отправлено! Я отвечу вам в ближайшее время.');

            contactForm.reset();

        } catch (error) {
            console.error('❌ Ошибка отправки:', error);

            let errorMessage = 'Ошибка отправки. ';

            if (error.text) {
                console.error('Детали ошибки:', error.text);
                errorMessage += error.text;
            }

            errorMessage += '\nНапишите мне напрямую: ilyaaleksandrovich00@gmail.com';

            showNotification('error', errorMessage);

        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(type, message) {
    console.log(`📢 Уведомление (${type}):`, message);

    const oldNotification = document.querySelector('.custom-notification');
    if (oldNotification) oldNotification.remove();

    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;

    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-text">${message}</div>
            <button class="notification-close">&times;</button>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);

    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });

    setTimeout(() => {
        if (notification.parentElement) {
            closeNotification(notification);
        }
    }, 5000);
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 300);
}

// ===== АДАПТАЦИЯ ПРИ ИЗМЕНЕНИИ РАЗМЕРА =====
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (isMobile && hamburger && navMenu) {
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        }
    } else {
        document.body.style.overflow = '';
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    }
}

window.addEventListener('DOMContentLoaded', handleResize);
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleResize);