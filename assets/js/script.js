document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('py-2', 'shadow-md');
            header.classList.remove('py-4');
        } else {
            header.classList.add('py-4');
            header.classList.remove('py-2', 'shadow-md');
        }
    });

    // 2. Interactive Stats Counter
    const stats = document.querySelectorAll('[data-target]');
    const countUp = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || (el.innerText.includes('%') ? '%' : '+');
        const duration = 2000; // 2 seconds
        let current = 0;

        const timer = setInterval(() => {
            current += Math.ceil(target / 50);
            if (current >= target) {
                let displayVal = target;
                if (suffix === 'K+') {
                    displayVal = (target / 1000) + 'K+';
                } else {
                    displayVal = target + suffix;
                }
                el.innerText = displayVal;
                clearInterval(timer);
            } else {
                let displayVal = current;
                if (suffix === 'K+') {
                    displayVal = Math.floor(current / 1000) + 'K+';
                } else {
                    displayVal = current + suffix;
                }
                el.innerText = displayVal;
            }
        }, 30);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // 3. Smooth Scroll (Native behavior is already enabled in CSS, but this ensures JS-based triggers also work)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = (show) => {
        if (show) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = '';
        }
    };

    if (menuToggle) menuToggle.addEventListener('click', () => toggleMenu(true));
    if (menuClose) menuClose.addEventListener('click', () => toggleMenu(false));
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // 5. Form Submission Mock
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Booking...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Our specialist will contact you shortly.');
                btn.innerText = originalText;
                btn.disabled = false;
                form.reset();
            }, 1500);
        });
    }
});
