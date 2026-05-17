  // GSAP Scroll Animations
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.reveal').forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out"
    });
  });
