(() => {
  'use strict';
  const data = window.PORTFOLIO_DATA;
  const grid = document.querySelector('#project-grid');
  const status = document.querySelector('#filter-status');
  const dialog = document.querySelector('#project-dialog');
  const image = document.querySelector('#gallery-image');
  const caption = document.querySelector('#gallery-caption');
  const thumbnails = document.querySelector('#gallery-thumbs');
  const previous = document.querySelector('#gallery-prev');
  const next = document.querySelector('#gallery-next');
  const visit = document.querySelector('#dialog-visit');
  const original = document.querySelector('#gallery-original');
  const sourceLink = document.querySelector('#gallery-source');
  const videoStage = document.querySelector('#video-stage');
  const videoPlayer = document.querySelector('#video-player');
  const videoNote = videoStage.querySelector('p');
  let localVideoPlayer = null;
  const galleryStage = document.querySelector('.gallery-stage');
  let activeCategory = 'all', activeYear = 'all', activeProject = null, imageIndex = 0, trigger = null;
  const motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (motion && 'IntersectionObserver' in window) document.documentElement.classList.add('js-motion');

  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 }) : null;
  document.querySelectorAll('.reveal').forEach(el => observer?.observe(el));

  if (!data) {
    status.textContent = 'The project collection could not load. Please reload the page.';
    return;
  }
  document.querySelectorAll('[data-project-count]').forEach(el => { el.textContent = data.projects.length; });
  document.querySelectorAll('[data-web-count]').forEach(el => { el.textContent = String(data.projects.filter(p => p.type === 'web').length).padStart(2, '0'); });

  function renderProjects() {
    const projects = data.projects.filter(p => (activeCategory === 'all' || p.type === activeCategory) && (activeYear === 'all' || String(p.year) === activeYear));
    grid.replaceChildren();
    projects.forEach((project, index) => {
      const card = make('article', 'project-card');
      card.style.animationDelay = motion ? Math.min(index * 35, 250) + 'ms' : '0ms';
      const button = make('button', 'project-button');
      button.type = 'button';
      button.setAttribute('aria-label', 'View ' + project.title);
      const visual = make('div', 'project-image' + (project.contain ? ' contain' : ''));
      const thumb = make('img');
      thumb.src = project.cover;
      thumb.alt = project.coverAlt;
      thumb.loading = 'lazy';
      thumb.decoding = 'async';
      thumb.width = project.coverWidth || 900;
      thumb.height = project.coverHeight || 700;
      visual.append(thumb, make('span', 'project-overlay'), make('span', 'project-tag', project.type === 'web' ? 'WEB DEVELOPMENT' : project.tool.toUpperCase()), make('span', 'project-arrow', '↗'));
      if (project.type === 'video') { const play = make('span','project-play','▶'); play.setAttribute('aria-hidden','true'); visual.append(play); }
      const meta = make('div', 'project-meta');
      meta.append(make('h3', '', project.title), make('span', '', project.year === 1 ? '1ST YEAR' : project.year === 2 ? '2ND YEAR' : project.period || 'PERSONAL WORK'));
      button.append(visual, meta, make('p', 'project-subtitle', project.subtitle));
      button.addEventListener('click', () => openProject(project, button));
      card.append(button);
      grid.append(card);
    });
    status.textContent = projects.length + ' project' + (projects.length === 1 ? '' : 's') + ' / ' + (activeCategory === 'web' ? 'Web development' : activeCategory === 'graphic' ? 'Graphic design' : activeCategory === 'photo' ? 'Photography' : activeCategory === 'video' ? 'Videography' : 'All disciplines') + ' / ' + (activeYear === 'all' ? 'All periods' : activeYear === '1' ? 'First year' : 'Second year');
    if (!projects.length) {
      const empty = make('p', 'empty-state', 'No projects in this selection yet. Try another discipline or year.');
      grid.append(empty);
    }
  }
  document.querySelectorAll('[data-category]').forEach(button => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      if (activeCategory === 'photo' || activeCategory === 'video') {
        activeYear = 'all';
        document.querySelectorAll('[data-year]').forEach(b => {
          const selected = b.dataset.year === 'all';
          b.classList.toggle('active', selected); b.setAttribute('aria-pressed', String(selected));
        });
      }
      document.querySelectorAll('[data-category]').forEach(b => {
        const selected = b === button;
        b.classList.toggle('active', selected); b.setAttribute('aria-pressed', String(selected));
      });
      renderProjects();
    });
  });
  document.querySelectorAll('[data-year]').forEach(button => {
    button.addEventListener('click', () => {
      activeYear = button.dataset.year;
      document.querySelectorAll('[data-year]').forEach(b => {
        const selected = b === button;
        b.classList.toggle('active', selected); b.setAttribute('aria-pressed', String(selected));
      });
      renderProjects();
    });
  });

  function showImage(index) {
    if (!activeProject || !activeProject.images.length) return;
    imageIndex = (index + activeProject.images.length) % activeProject.images.length;
    const item = activeProject.images[imageIndex];
    image.src = item.src;
    image.alt = item.alt || activeProject.title + ' — ' + item.label;
    image.width = item.width || 1600; image.height = item.height || 1100;
    caption.textContent = (imageIndex + 1) + ' / ' + activeProject.images.length + ' — ' + item.label;
    document.querySelector('.gallery-stage').classList.toggle('web-image', activeProject.type === 'web');
    previous.disabled = activeProject.images.length < 2;
    next.disabled = activeProject.images.length < 2;
    thumbnails.querySelectorAll('button').forEach((b, i) => { b.setAttribute('aria-pressed', String(i === imageIndex)); });
    original.hidden = !item.original;
    original.textContent = activeProject.type === 'photo' ? 'Open downloaded photograph ↗' : 'Open original artwork ↗';
    if (item.original) original.href = item.original; else original.removeAttribute('href');
  }
  function resetVideoPlayers() {
    videoPlayer.removeAttribute('src');
    videoPlayer.hidden = true;
    if (!localVideoPlayer) return;
    localVideoPlayer.pause();
    if (localVideoPlayer.readyState > 0) localVideoPlayer.currentTime = 0;
    localVideoPlayer.removeAttribute('src');
    localVideoPlayer.load();
    localVideoPlayer.hidden = true;
  }
  function showVideo(project) {
    resetVideoPlayers();
    if (project.localVideo) {
      if (!localVideoPlayer) {
        localVideoPlayer = make('video', 'local-video-player');
        localVideoPlayer.id = 'local-video-player';
        localVideoPlayer.controls = true;
        localVideoPlayer.preload = 'metadata';
        localVideoPlayer.playsInline = true;
        Object.assign(localVideoPlayer.style, {display:'block', width:'100%', aspectRatio:'16 / 9', background:'#08090b'});
        localVideoPlayer.addEventListener('error', () => {
          if (!activeProject?.localVideo || !localVideoPlayer.hasAttribute('src')) return;
          videoNote.textContent = 'The video could not load. You can also open it with “Watch on YouTube” above.';
          videoNote.hidden = false;
        });
        videoStage.insertBefore(localVideoPlayer, videoNote);
      }
      localVideoPlayer.src = project.localVideo;
      localVideoPlayer.poster = project.cover;
      const playerLabel = project.title + ' — ' + (project.localVideoLabel || 'Local video');
      localVideoPlayer.title = playerLabel;
      localVideoPlayer.setAttribute('aria-label', playerLabel);
      localVideoPlayer.hidden = false;
      videoNote.textContent = project.localVideoLabel === 'Local preview'
        ? 'Local preview. Watch the full ' + project.duration + ' seminar presentation with “Watch full video on YouTube” above.'
        : 'Use the controls to play this video.';
      videoNote.hidden = false;
    } else {
      videoPlayer.src = project.embedUrl;
      videoPlayer.title = project.title;
      videoPlayer.hidden = false;
      videoNote.textContent = 'Press Play to watch. You can also use “Watch on YouTube” above.';
      videoNote.hidden = false;
    }
  }
  function openProject(project, button) {
    activeProject = project; trigger = button;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-year').textContent = (project.year === 1 ? 'FIRST YEAR' : project.year === 2 ? 'SECOND YEAR' : project.period || 'PERSONAL WORK') + ' / ' + project.subtitle;
    document.querySelector('#dialog-category').textContent = project.type === 'web' ? 'WEB DEVELOPMENT' : project.type === 'photo' ? 'PHOTOGRAPHY' : project.type === 'video' ? 'VIDEOGRAPHY' : 'GRAPHIC DESIGN / ' + project.tool.toUpperCase();
    document.querySelector('#dialog-description').textContent = project.description;
    const tags = document.querySelector('#dialog-tags'); tags.replaceChildren();
    project.tags.forEach(tag => tags.append(make('span', '', tag)));
    visit.hidden = !project.url;
    visit.textContent = project.type === 'video' ? (project.localVideoLabel === 'Local preview' ? 'Watch full video on YouTube ↗' : 'Watch on YouTube ↗') : 'Open website ↗';
    if (project.url) visit.href = project.url; else visit.removeAttribute('href');
    sourceLink.hidden = !project.sourceUrl;
    if (project.sourceUrl) sourceLink.href = project.sourceUrl; else sourceLink.removeAttribute('href');
    thumbnails.replaceChildren();
    project.images.forEach((item, i) => {
      const thumbButton = make('button');
      thumbButton.type = 'button';
      thumbButton.setAttribute('aria-label', 'Show ' + item.label);
      thumbButton.setAttribute('aria-pressed', String(i === 0));
      const thumb = make('img'); thumb.src = item.thumbnail || item.src; thumb.alt = ''; thumb.loading = 'lazy';
      thumbButton.append(thumb); thumbButton.addEventListener('click', () => showImage(i)); thumbnails.append(thumbButton);
    });
    thumbnails.hidden = project.images.length < 2;
    const isVideo = project.type === 'video';
    galleryStage.hidden = isVideo;
    videoStage.hidden = !isVideo;
    if (isVideo) { showVideo(project); original.hidden = true; }
    else { resetVideoPlayers(); showImage(0); }
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('modal-open');
    document.querySelector('#dialog-close').focus({ preventScroll: true });
  }
  document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
  document.addEventListener('portfolio:open-project', event => {
    const project = data.projects.find(item => item.id === event.detail?.id);
    if (project && !dialog.open) openProject(project, event.detail.trigger);
  });
  dialog.addEventListener('close', () => { resetVideoPlayers(); document.body.classList.remove('modal-open'); activeProject = null; trigger?.focus({ preventScroll: true }); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  previous.addEventListener('click', () => showImage(imageIndex - 1));
  next.addEventListener('click', () => showImage(imageIndex + 1));
  dialog.addEventListener('keydown', event => {
    if (activeProject?.type === 'video') return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(imageIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showImage(imageIndex + 1); }
  });
  const progress = document.querySelector('.scroll-progress');
  let scheduled = false;
  function updateScroll() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (total > 0 ? window.scrollY / total * 100 : 0) + '%';
    scheduled = false;
  }
  window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
  window.addEventListener('resize', updateScroll);
  renderProjects();
  updateScroll();
})();
