const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

// Add floating animation class to glassy elements
document.querySelectorAll('.glass, .card, .timeline-item, .gallery-card').forEach(el => {
  el.classList.add('floating');
  observer.observe(el);
});

// Count-up stats when visible
const countObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = Number(el.dataset.count || 0);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 90));
        const tick = () => {
          current += step;
          if (current >= target) {
            el.textContent = target.toLocaleString();
            return;
          }
          el.textContent = current.toLocaleString();
          requestAnimationFrame(tick);
        };
        tick();
        countObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// Gallery filter and lightbox removed (no gallery on page)

// Parallax effect for hero visual
const heroVisual = document.querySelector('.hero-visual');
window.addEventListener('scroll', () => {
  const offset = window.scrollY * 0.08;
  if (heroVisual) {
    heroVisual.style.transform = `translateY(${offset}px)`;
  }
});

// Subtle hover tilt on gallery
// Gallery removed, so hover tilt skipped

// Smooth scroll for nav links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
