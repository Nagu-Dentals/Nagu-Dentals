document.addEventListener('DOMContentLoaded', () => {
    // 1. Counter Animation with Intersection Observer
    const counters = document.querySelectorAll('.counter-value');
    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        const suffix = el.getAttribute('data-suffix') || '';

        const update = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);

            if (target > 1000) {
                el.innerText = (value / 1000).toFixed(0) + 'K' + suffix;
            } else {
                el.innerText = value + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                 if (target > 1000) {
                    el.innerText = (target / 1000).toFixed(0) + 'K' + suffix;
                } else {
                    el.innerText = target + suffix;
                }
            }
        };
        requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 2. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 3. Mobile Menu Toggle
    const menuBtns = document.querySelectorAll('#menu-toggle, #menu-toggle-mobile');
    const menuOverlay = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('menu-close');

    if (menuBtns.length > 0 && menuOverlay && closeBtn) {
        menuBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
                document.body.style.overflow = 'hidden';
            });
        });

        closeBtn.addEventListener('click', () => {
            menuOverlay.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = '';
        });

        menuOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuOverlay.classList.add('opacity-0', 'pointer-events-none');
                document.body.style.overflow = '';
            });
        });
    }

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
