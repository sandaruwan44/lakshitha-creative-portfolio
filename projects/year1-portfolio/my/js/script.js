(function(){
  // Video embed (YouTube recommended)
  const wrap = document.querySelector('.video-embed');
  if(!wrap) return;

  const btn = wrap.querySelector('.video-cover');
  const rawUrl = (wrap.getAttribute('data-video-url') || '').trim();

  function toYouTubeEmbed(url){
    // Accepts:
    // - https://youtu.be/VIDEO_ID
    // - https://www.youtube.com/watch?v=VIDEO_ID
    // - https://www.youtube.com/shorts/VIDEO_ID
    const u = new URL(url);
    if(u.hostname.includes('youtu.be')){
      const id = u.pathname.replace('/', '');
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&rel=0&playsinline=1`;
    }
    if(u.hostname.includes('youtube.com')){
      const shorts = u.pathname.startsWith('/shorts/');
      const id = shorts ? u.pathname.split('/shorts/')[1].split('/')[0] : u.searchParams.get('v');
      if(id) return `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&rel=0&playsinline=1`;
    }
    // Fallback: try direct embed
    return url;
  }

  btn.addEventListener('click', () => {
    if(!rawUrl || rawUrl === 'VIDEO_URL_HERE'){
      alert('VIDEO_URL_HERE をあなたの動画URLに置き換えてください。');
      return;
    }
    let embedUrl = rawUrl;
    try { embedUrl = toYouTubeEmbed(rawUrl); } catch(e) {}
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.title = 'Portfolio video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    wrap.innerHTML = '';
    wrap.appendChild(iframe);
  });
})();