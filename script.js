(() => {
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.nav-links');
  if (menu && navigation) {
    const closeMenu = () => {
      navigation.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open navigation');
    };
    menu.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(isOpen));
      menu.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  const elements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach(element => element.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    }, {threshold: 0.08, rootMargin: '0px 0px 30px 0px'});
    elements.forEach(element => observer.observe(element));
  }
})();
