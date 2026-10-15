(() => {
  'use strict';

  function initCinematic() {
    const projects = window.PORTFOLIO_DATA?.projects;
    if (!Array.isArray(projects)) return;

    const selections = [
      ['akihabara-night-car', 'AFTER', 'DARK'],
      ['shinjuku-nights', 'NEON', 'STORIES'],
      ['hamilton-dvd', 'DRIVEN', 'BY DESIGN'],
      ['noire', 'DIGITAL', 'FEELING'],
      ['ninja-vibe', 'BOLD', 'BY NATURE'],
      ['japan-book', 'JAPAN', 'IN PRINT']
    ];
    const projectSlides = selections.flatMap(([id, first, second]) => {
      const project = projects.find(item => item.id === id);
      return project ? [{ project, lines: [first, second], image: project.images?.[0]?.src || project.cover }] : [];
    });
    if (!projectSlides.length) return;
    const introPoster = 'assets/backgrounds/portfolio-cinematic.webp';
    const introProject = {
      id: 'creative-reel', type: 'all', title: 'Lakshitha Sandaruwan',
      cover: introPoster, coverAlt: 'Portfolio background film', images: [{ src: introPoster }]
    };
    const slides = [{ project: introProject, lines: ['VISUAL', 'STORIES'], image: introPoster, isIntro: true }, ...projectSlides];

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const categoryNames = { all: 'all work', photo: 'photography', graphic: 'graphic design', web: 'web development', video: 'videography' };
    const make = (tag, className, text) => {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (text !== undefined) element.textContent = text;
      return element;
    };

    const hero = document.querySelector('#cinematic-hero');
    const heroImage = document.querySelector('#hero-image');
    const heroVideo = document.querySelector('#hero-video');
    const title = document.querySelector('#hero-title');
    const titleLines = title ? [...title.querySelectorAll('[data-title-line]')] : [];
    const projectName = document.querySelector('#hero-project-name');
    const counter = document.querySelector('#hero-counter');
    const explore = document.querySelector('#hero-view-work');
    const pause = document.querySelector('#hero-pause');
    const prev = document.querySelector('#hero-prev');
    const next = document.querySelector('#hero-next');
    const thumbnails = document.querySelector('#hero-thumbnails');
    const timeline = document.querySelector('#hero-timeline');

    if (hero && heroImage && titleLines.length >= 2 && projectName && counter && explore && pause && prev && next && thumbnails && timeline) {
      const fill = make('span', 'hero-timeline-fill');
      timeline.replaceChildren(fill);
      timeline.setAttribute('aria-hidden', 'true');
      const thumbButtons = [];
      let current = 0;
      let paused = false;
      let cycleTimer = null;
      let imageTimer = null;
      let transitionTimer = null;
      let scrambleFrame = null;
      let timelineFrame = null;
      let transitionVersion = 0;
      let lastEligibility = null;
      const initialBounds = hero.getBoundingClientRect();
      let heroVisible = initialBounds.bottom > 0 && initialBounds.top < window.innerHeight;

      titleLines.forEach(line => line.setAttribute('aria-hidden', 'true'));

      function stopScramble() {
        if (scrambleFrame !== null) cancelAnimationFrame(scrambleFrame);
        scrambleFrame = null;
        slides[current].lines.forEach((line, index) => { titleLines[index].textContent = line; });
      }

      function updateTitle(animate) {
        stopScramble();
        const lines = slides[current].lines;
        title.setAttribute('aria-label', lines.join(' '));
        if (!animate || reducedMotion.matches) return;
        const started = performance.now();
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        function frame(now) {
          const progress = Math.min((now - started) / 320, 1);
          lines.forEach((line, lineIndex) => {
            const revealed = Math.ceil(line.length * progress);
            titleLines[lineIndex].textContent = [...line].map((character, index) => {
              if (character === ' ' || index < revealed || progress === 1) return character;
              return alphabet[(index * 7 + Math.floor(progress * 16) + lineIndex * 3) % alphabet.length];
            }).join('');
          });
          if (progress < 1) scrambleFrame = requestAnimationFrame(frame);
          else scrambleFrame = null;
        }
        scrambleFrame = requestAnimationFrame(frame);
      }

      function canAutoCycle() {
        return !paused && !reducedMotion.matches && heroVisible && !document.hidden
          && !document.querySelector('dialog[open]') && !document.body.classList.contains('modal-open');
      }

      function syncHeroVideo() {
        if (!heroVideo) return;
        const shouldPlay = slides[current].isIntro && canAutoCycle();
        if (!shouldPlay) { heroVideo.pause(); return; }
        heroVideo.muted = true;
        heroVideo.loop = true;
        heroVideo.playsInline = true;
        if (heroVideo.paused) {
          const playback = heroVideo.play();
          playback?.catch(() => { /* The poster remains available when automatic playback is blocked. */ });
        }
      }

      function syncCycle(force = false) {
        const eligible = canAutoCycle();
        syncHeroVideo();
        if (!force && eligible === lastEligibility) return;
        lastEligibility = eligible;
        clearTimeout(cycleTimer);
        cycleTimer = null;
        if (timelineFrame !== null) cancelAnimationFrame(timelineFrame);
        fill.style.transition = 'none';
        fill.style.transform = 'scaleX(0)';
        fill.style.transformOrigin = 'left center';
        hero.classList.toggle('is-paused', !eligible);
        if (!eligible) return;
        const interval = slides[current].isIntro ? 32000 : 7000;
        timelineFrame = requestAnimationFrame(() => {
          timelineFrame = requestAnimationFrame(() => {
            timelineFrame = null;
            if (!canAutoCycle()) return;
            fill.style.transition = 'transform ' + interval + 'ms linear';
            fill.style.transform = 'scaleX(1)';
          });
        });
        cycleTimer = setTimeout(() => {
          cycleTimer = null;
          if (canAutoCycle()) showSlide(current + 1, true);
          else syncCycle(true);
        }, interval);
      }

      function updatePauseButton() {
        const stopped = paused || reducedMotion.matches;
        pause.disabled = reducedMotion.matches;
        pause.setAttribute('aria-pressed', String(stopped));
        pause.textContent = reducedMotion.matches ? 'Motion reduced' : paused ? 'Play slideshow' : 'Pause slideshow';
        pause.setAttribute('aria-label', reducedMotion.matches ? 'Automatic slideshow disabled by your reduced motion setting' : pause.textContent);
      }

      function showSlide(index, animate = true) {
        current = (index + slides.length) % slides.length;
        const slide = slides[current];
        const version = ++transitionVersion;
        clearTimeout(imageTimer);
        clearTimeout(transitionTimer);
        updateTitle(animate);
        hero.classList.toggle('intro-active', Boolean(slide.isIntro));
        hero.dataset.project = slide.project.id;
        projectName.textContent = slide.project.title;
        counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
        explore.href = '#work';
        explore.textContent = 'Explore ' + (categoryNames[slide.project.type] || 'project');
        thumbButtons.forEach((button, buttonIndex) => {
          const selected = buttonIndex === current;
          button.classList.toggle('is-active', selected);
          button.setAttribute('aria-pressed', String(selected));
          button.tabIndex = selected ? 0 : -1;
        });
        const applyImage = () => {
          if (version !== transitionVersion) return;
          heroImage.src = slide.image;
          heroImage.alt = slide.project.images?.[0]?.alt || slide.project.coverAlt || slide.project.title;
          transitionTimer = setTimeout(() => hero.classList.remove('is-switching'), 160);
        };
        if (animate && !reducedMotion.matches) {
          hero.classList.add('is-switching');
          imageTimer = setTimeout(applyImage, 120);
        } else {
          applyImage();
          hero.classList.remove('is-switching');
        }
        syncCycle(true);
      }

      thumbnails.replaceChildren();
      slides.forEach((slide, index) => {
        const button = make('button', 'hero-thumb');
        button.type = 'button';
        const thumbLabel = slide.isIntro ? 'Creative reel' : slide.project.title;
        button.setAttribute('aria-label', 'Show ' + thumbLabel);
        const image = make('img');
        image.src = slide.project.cover;
        image.alt = '';
        image.loading = 'lazy';
        image.decoding = 'async';
        button.append(image, make('span', 'hero-thumb-label', thumbLabel));
        button.addEventListener('click', () => showSlide(index));
        button.addEventListener('keydown', event => {
          let destination;
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') destination = (current + 1) % slides.length;
          else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') destination = (current - 1 + slides.length) % slides.length;
          else if (event.key === 'Home') destination = 0;
          else if (event.key === 'End') destination = slides.length - 1;
          else return;
          event.preventDefault();
          showSlide(destination);
          thumbButtons[destination].focus({ preventScroll: true });
        });
        thumbButtons.push(button);
        thumbnails.append(button);
      });
      prev.addEventListener('click', () => showSlide(current - 1));
      next.addEventListener('click', () => showSlide(current + 1));
      pause.addEventListener('click', () => {
        paused = !paused;
        updatePauseButton();
        syncCycle(true);
      });
      explore.addEventListener('click', event => {
        event.preventDefault();
        const category = slides[current].project.type;
        document.querySelector('[data-year="all"]')?.click();
        document.querySelectorAll('[data-category]').forEach(button => {
          if (button.dataset.category === category) button.click();
        });
        document.querySelector('#work')?.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
      });
      document.addEventListener('visibilitychange', () => syncCycle());
      if ('IntersectionObserver' in window) {
        const visibility = new IntersectionObserver(entries => {
          heroVisible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.12;
          syncCycle();
        }, { threshold: [0, 0.12, 0.5] });
        visibility.observe(hero);
      } else {
        window.addEventListener('scroll', () => {
          const bounds = hero.getBoundingClientRect();
          heroVisible = bounds.bottom > 0 && bounds.top < window.innerHeight;
          syncCycle();
        }, { passive: true });
      }
      if ('MutationObserver' in window) {
        const modalState = new MutationObserver(records => {
          if (records.some(record => record.target === document.body || record.target.tagName === 'DIALOG')) syncCycle();
        });
        modalState.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['open', 'class'] });
      }
      const onMotionChange = () => {
        updatePauseButton();
        showSlide(current, false);
      };
      if (heroVideo) {
        const markVideoReady = () => {
          heroVideo.classList.add('is-ready');
          hero.classList.add('is-ready');
          syncHeroVideo();
        };
        heroVideo.addEventListener('loadeddata', markVideoReady);
        heroVideo.addEventListener('error', () => {
          heroVideo.classList.remove('is-ready');
          hero.classList.remove('is-ready');
        });
        if (heroVideo.readyState >= 2) markVideoReady();
      }
      reducedMotion.addEventListener('change', onMotionChange);
      updatePauseButton();
      showSlide(0, false);
    }

    const showcaseTrack = document.querySelector('#showcase-track');
    const showcasePause = document.querySelector('#showcase-pause');
    const showcaseShell = showcaseTrack?.closest('.showcase-shell');
    if (showcaseTrack && showcasePause && showcaseShell) {
      let showcasePaused = false;
      const buildGroup = duplicate => {
        const group = make('div', 'showcase-group');
        if (duplicate) {
          group.setAttribute('aria-hidden', 'true');
        }
        projectSlides.forEach(({ project }) => {
          const button = make('button', 'showcase-card');
          button.type = 'button';
          button.dataset.project = project.id;
          button.setAttribute('aria-label', 'View ' + project.title);
          if (duplicate) button.tabIndex = -1;
          const image = make('img');
          image.src = project.images?.[0]?.src || project.cover;
          image.alt = duplicate ? '' : project.coverAlt || project.title;
          image.loading = 'lazy';
          image.decoding = 'async';
          const meta = make('div', 'showcase-card-meta');
          meta.append(make('span', '', (categoryNames[project.type] || project.type).toUpperCase()), make('strong', '', project.title));
          button.append(image, meta);
          button.addEventListener('click', () => {
            button.dispatchEvent(new CustomEvent('portfolio:open-project', { bubbles: true, detail: { id: project.id, trigger: button } }));
          });
          group.append(button);
        });
        return group;
      };
      showcaseTrack.replaceChildren(buildGroup(false), buildGroup(true));
      const syncShowcase = () => {
        const stopped = showcasePaused || reducedMotion.matches;
        showcaseShell.classList.toggle('is-paused', stopped);
        showcasePause.disabled = reducedMotion.matches;
        showcasePause.setAttribute('aria-pressed', String(stopped));
        showcasePause.textContent = reducedMotion.matches ? 'Motion reduced' : stopped ? 'Play showcase' : 'Pause showcase';
      };
      showcasePause.addEventListener('click', () => {
        showcasePaused = !showcasePaused;
        syncShowcase();
      });
      reducedMotion.addEventListener('change', syncShowcase);
      syncShowcase();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCinematic, { once: true });
  else initCinematic();
})();
