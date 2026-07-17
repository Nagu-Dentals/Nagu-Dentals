document.addEventListener('DOMContentLoaded', () => {
  // Setup interactive FAQ accordion with sliding transitions and accessible keyboard bindings
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(i => {
          i.classList.remove('active');
          const otherBtn = i.querySelector('.faq-question-btn');
          if (otherBtn) {
            otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle clicked item
        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        } else {
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // Sticky navbar logic to transition background blur gently on scroll
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(5, 17, 31, 0.88)';
        nav.style.boxShadow = '0 20px 80px rgba(0,0,0,0.45)';
      } else {
        nav.style.background = 'rgba(5, 17, 31, 0.58)';
        nav.style.boxShadow = '0 20px 60px rgba(0,0,0,0.28)';
      }
    });
  }
});
