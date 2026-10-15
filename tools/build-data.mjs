import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'content-catalog.json'), 'utf8'));
const previews = JSON.parse(fs.readFileSync(path.join(root, 'assets/previews/manifest.json'), 'utf8'));
const descriptions = {
  pufe: 'A late-night parfait website with themed product details, responsive layouts and a reservation message flow.',
  noire: 'A fragrance shopping concept with a product catalogue, filtering, product pages, a local cart and demonstration checkout.',
  sneaker: 'An animated four-product sneaker showcase with click and keyboard navigation, visual transitions and a cart counter.',
  yakitori: 'A Japanese restaurant homepage with food photography, category tabs, a mobile menu and location information.',
  'japan-guide': 'A first-year travel website introducing places in Japan through English and Japanese content, destination cards and interactive details.',
  'sri-lanka-guide': 'A first-year travel website sharing destinations, landscapes and culture from Sri Lanka, with a gallery and English and Japanese content.',
  'limitless-44': 'A first-year fan club concept with English and Japanese pages, a Ferrari video background, a media gallery, member cards, event information and a map.',
  'hamilton-ferrari': 'A first-year Hamilton and Ferrari website with translucent cards, animated statistics, a career timeline, scroll reveals and a parallax hero image.',
  'hamilton-biography': 'A first-year biography website combining a manually controlled three-image slider with alternating photo and article sections.'
};
const shortTitles = {
  pufe: '24:15 Midnight Parfait', noire: 'NOIRÉ Fragrance', sneaker: '44 Sneaker Slider', yakitori: 'Yakitori Urushi',
  'japan-guide': 'Japan Tourists Guide', 'sri-lanka-guide': 'Visit Sri Lanka',
  'limitless-44': 'LIMITLESS 44 CLUB', 'hamilton-ferrari': 'Hamilton — Scuderia Ferrari', 'hamilton-biography': 'Hamilton Biography',
  'open-campus': 'Open Campus Campaign', 'japan-book': 'Japan Magic Country', 'hamilton-dvd': 'Hamilton 44',
  'hamilton-vogue': 'Hamilton — Cover Study', 'demon-slayer': 'Demon Slayer — Editorial',
  'sri-lankan-festival': 'Sri Lankan Festival', 'ninja-vibe': 'Ninja Vibe',
  'osaka-travel': 'Travel to Osaka', 'sri-lanka-seminar': 'Sri Lanka — Heritage & Hospitality'
};
const websites = catalog.websites.map(project => {
  const previewId = project.preview_id || (project.id === 'sri-lanka-guide' ? 'sri-lanka' : project.id);
  const asset = previews.websites.find(item => item.id === previewId);
  const cover = asset?.preview || `${project.retained}/${project.preview}`;
  return { id: project.id, type: 'web', title: shortTitles[project.id] || project.title,
    year: project.academic_year, tool: 'HTML / CSS / JavaScript',
    subtitle: project.subtitle || 'Web design & development',
    description: descriptions[project.id] || project.description || project.features.join('. '),
    tags: project.stack || ['HTML', 'CSS', 'JavaScript'], url: `${project.retained}/${project.entry}`,
    cover, coverAlt: `${project.title} — project image`, coverWidth: asset?.width || project.preview_width, coverHeight: asset?.height || project.preview_height,
    contain: project.id === 'sneaker', images: [{src: cover, thumbnail: cover, label: 'Project visual', alt: `${project.title} — image used in the website`, width: asset?.width || project.preview_width, height: asset?.height || project.preview_height}]
  };
});
const graphics = catalog.graphics.map(project => {
  const optimized = previews.graphics.find(item => item.id === project.id);
  return {id: project.id, type: 'graphic', title: shortTitles[project.id] || project.title,
    year: project.academic_year, tool: project.tool, subtitle: `${project.category} · ${project.tool}`,
    description: project.description, tags: [project.tool, project.category, 'Student design study'],
    cover: optimized?.cover || project.cover, coverAlt: project.title,
    contain: ['japan-book', 'hamilton-dvd', 'demon-slayer'].includes(project.id),
    images: project.files.map(file => {
      const asset = optimized?.files.find(item => item.source === file.retained);
      return {src: asset?.preview || file.retained, thumbnail: asset?.thumbnail || file.retained,
        original: file.retained, label: file.label, alt: `${project.title} — ${file.label}`,
        width: asset?.width, height: asset?.height};
    })
  };
});
const photoManifest = path.join(root, 'assets/photography/manifest.json');
const photography = fs.existsSync(photoManifest) ? JSON.parse(fs.readFileSync(photoManifest, 'utf8')).photography.map(photo => ({
  id: photo.id, type: 'photo', title: photo.title, year: null, tool: 'Photography', subtitle: photo.subtitle || 'Street & automotive photography',
  description: photo.description, tags: photo.tags || ['Photography', 'Personal work'], sourceUrl: photo.source_post_url,
  cover: photo.thumbnail.path, coverAlt: photo.title, coverWidth: photo.thumbnail.width, coverHeight: photo.thumbnail.height,
  images: (photo.images || [{original:photo.original,preview:photo.preview,thumbnail:photo.thumbnail,label:'Night street photography'}]).map((item,i)=>({
    src: item.preview.path, thumbnail: item.thumbnail.path, original: item.original.path,
    label: item.label || 'Photograph ' + (i+1), alt: photo.title + ' — ' + (item.label || 'Photograph ' + (i+1)), width:item.preview.width,height:item.preview.height
  }))
})) : [];
const videoManifest = path.join(root, 'assets/videography/manifest.json');
const verifiedVideoFallbacks = [
  {id:'osaka-travel',title:'Travel to Osaka',subtitle:'Travel video · 0:31',description:'A short Osaka travel video shared on my Gaming Mello channel.',source_url:'https://www.youtube.com/watch?v=YQMzI5l7iTs',embed_url:'https://www.youtube.com/embed/YQMzI5l7iTs',thumbnail:{path:'https://i.ytimg.com/vi/YQMzI5l7iTs/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AH8CYAC0AWKAgwIABABGE8gWShlMA8=&rs=AOn4CLBBVMF_dHxx2VRv0kA3H7ev_zdavw',width:480,height:360}},
  {id:'sri-lanka-seminar',title:'Sri Lanka — Heritage & Hospitality',subtitle:'Seminar presentation · 3:36',description:'A video about Sri Lanka created for my seminar presentation, introducing the country through a visual story of its heritage and hospitality.',source_url:'https://www.youtube.com/watch?v=qisv9WsInZU',embed_url:'https://www.youtube.com/embed/qisv9WsInZU',tags:['Seminar presentation','Sri Lanka','Video editing'],thumbnail:{path:'https://i.ytimg.com/vi/qisv9WsInZU/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGHIgSCgzMA8=&rs=AOn4CLBn5uembFhQMzficefPRwhFnbKdgQ',width:1280,height:720}}
];
const videoManifestData = fs.existsSync(videoManifest) ? JSON.parse(fs.readFileSync(videoManifest,'utf8')) : null;
const videoSources = videoManifestData ? videoManifestData.videography || videoManifestData.videos : verifiedVideoFallbacks;
if (!Array.isArray(videoSources)) throw new Error('The videography manifest must contain a videography array.');
const localVideos = {
  'sri-lanka-seminar': 'projects/year1-portfolio/my/img/スリランカ ― 遺産とおもてなしの国 🇱🇰(Sri Lanka –The Land of Heritage and Hospitality) - Gaming Mello (1080p, h264).mp4'
};
const videos = videoSources.map(video=>({
  id:video.id,type:'video',title:shortTitles[video.id] || video.title,year:null,period:video.id==='sri-lanka-seminar'?'SEMINAR PROJECT':'TRAVEL FILM',tool:'Videography',
  subtitle:(video.id==='sri-lanka-seminar'?'Seminar presentation':'Travel video')+' · '+(video.duration || (video.id==='sri-lanka-seminar'?'3:36':'0:31')),
  description:video.description,tags:video.tags || (video.id==='sri-lanka-seminar'?['Seminar presentation','Sri Lanka','Video editing']:['Video editing','Travel','YouTube']),
  cover:video.thumbnail.path,coverAlt:video.title+' — video preview',coverWidth:video.thumbnail.width,coverHeight:video.thumbnail.height,
  url:video.source_url,embedUrl:video.embed_url,localVideo:video.local_video || localVideos[video.id],
  localVideoLabel:video.id==='sri-lanka-seminar'?'Local preview':undefined,
  duration:video.duration || (video.id==='sri-lanka-seminar'?'3:36':'0:31'),images:[]
}));
const order = ['noire','pufe','open-campus','tokyo-portraits','asakusa-portraits','shinjuku-nights','sri-lanka-seminar','osaka-travel','yakitori','sneaker','japan-book','akihabara-night-car','limitless-44','hamilton-ferrari','hamilton-biography','japan-guide','sri-lanka-guide','ninja-vibe','hamilton-vogue','lando-poster','hamilton-dvd','demon-slayer','sri-lankan-festival'];
const projects = [...websites, ...graphics, ...photography, ...videos].sort((a,b) => order.indexOf(a.id) - order.indexOf(b.id));
for (const project of projects) {
  for (const reference of [project.cover, project.url, project.localVideo, ...project.images.flatMap(image => [image.src, image.thumbnail, image.original])].filter(Boolean)) {
    if (!/^https?:\/\//.test(reference) && !fs.existsSync(path.join(root, reference))) throw new Error(`Missing project asset: ${reference}`);
  }
}
const data = {name: catalog.profile.name, email: catalog.profile.email,
  instagram: catalog.profile.instagram, facebook: catalog.profile.facebook,
  tiktok: catalog.profile.additional_social_found?.tiktok,
  skills: catalog.profile.skills_listed_in_original_portfolio || [], projects};
fs.writeFileSync(path.join(root, 'projects-data.js'), '/* Generated from the local content catalogue. Run tools/build-data.mjs to update. */\nwindow.PORTFOLIO_DATA = ' + JSON.stringify(data, null, 2) + ';\n');
console.log(`Prepared ${websites.length} websites, ${graphics.length} design collections (${graphics.reduce((n,p)=>n+p.images.length,0)} artworks), ${photography.length} photography collections and ${videos.length} videos.`);
