# Portfolio project inventory — 15 October 2026

The received work is integrated into the local animated portfolio at `index.html`: **23 entries — nine websites, eight graphic design collections, four photography collections and two video projects.** First-year projects are mixed with later work as individual entries. The design follows the supplied cinematic reference with animated typography, scroll motion, hover interactions and reduced-motion support.

## Websites

| Project | Academic year | Entry |
| --- | --- | --- |
| 24:15 Midnight Parfait | 2 | `projects/pufe/index.html` |
| NOIRÉ Fragrance | 2 | `projects/noire/index.html` |
| 44 Sneaker Slider | 2 | `projects/sneaker/sneaker-click-slider.html` |
| Yakitori Urushi | 2 | `projects/yakitori/index.html` |
| Japan Tourists Guide | 1 | `projects/japan-guide/index.html` |
| Visit Sri Lanka | 1 | `projects/sri-lanka-guide/index.html` |
| LIMITLESS 44 CLUB | 1 | `projects/year1-portfolio/1204/index.html` |
| Lewis Hamilton — Scuderia Ferrari | 1 | `projects/year1-portfolio/Lewis Hamilton/index.html` |
| Hamilton Biography — Slider Study | 1 | `projects/year1-portfolio/Test/index.html` |

The three Hamilton websites appear as individual projects in the new portfolio. Their source folders and the old portfolio's supporting photo/video gallery are retained locally. The old portfolio is not a separate project card. Retained copies have subdirectory asset-link repairs; original folders are unchanged.

The original first-year portfolio background clip is also reused in the new cinematic presentation. Its 30.62-second MOV is preserved. A 30.63-second, 1920 × 1080 H.264 MP4 derivative removes audio, enables fast start and reduces the file from 54,743,073 to 14,320,611 bytes. Its poster and provenance are stored in `assets/backgrounds/`.

## Graphic design

The 16 retained graphic design images are grouped into eight collections:

- Illustrator: Hamilton 44 DVD jacket; Japan Magic Country book jacket.
- Photoshop: Open Campus campaign (five images); Ninja Vibe packaging (three images); Hamilton magazine cover studies (pink and monochrome variants); Lando Norris concept poster study; Demon Slayer editorial layouts (two images); Sri Lankan Festival 2025 poster.

The monochrome Hamilton cover and Lando Norris poster were also retained in the supplied first-year photo/design gallery. The Lando artwork is presented as a student concept poster, without treating the lettering in its design as a factual championship claim.

The collection viewer shows each image, supports previous/next controls and thumbnails, and links to full-resolution originals.

## Photography

Four collections contain 14 selected photographs from the user's supplied public Facebook posts:

| Collection | Images | Source |
| --- | --- | --- |
| Akihabara After Dark | 1 | [Public photograph](https://www.facebook.com/photo/?fbid=2328468067907571&set=pcb.2328468171240894) |
| Tokyo — Portrait Session | 3 | [Public post](https://www.facebook.com/story.php?story_fbid=2327469884674056&id=100022332010934) |
| Asakusa — Timeless Portraits | 5 | [Public post](https://www.facebook.com/story.php?story_fbid=2312932809461097&id=100022332010934) |
| Shinjuku — Neon Nights | 5 | [Public post](https://www.facebook.com/story.php?story_fbid=2298783707542674&id=100022332010934) |

The downloaded JPEGs and existing photographer watermarks are preserved, with SHA256 provenance in `assets/photography/manifest.json`. The Akihabara image was available at 3071 × 4096 pixels. The other 13 selected post images were available at 443 × 590 pixels and were retained without upscaling. Optimized WebP copies serve the gallery.

## Videography

| Project | Full duration | Source |
| --- | --- | --- |
| Travel to Osaka | 0:31 | [YouTube](https://www.youtube.com/watch?v=YQMzI5l7iTs) |
| Sri Lanka — Heritage & Hospitality | 3:36 | [YouTube](https://www.youtube.com/watch?v=qisv9WsInZU) |

The user identified both as their own work and described the Sri Lanka video as a seminar presentation. The seminar entry includes a four-second local preview and a link to the full 3:36 YouTube video. Downloaded preview thumbnails are retained locally; the full remote videos were not downloaded. Metadata is recorded in `assets/videography/manifest.json`.

## Profile and links

- Lakshitha Sandaruwan.
- Email: lakshithasandaruwan118@gmail.com.
- Instagram: https://www.instagram.com/lakshitha_siriwardhana/.
- Facebook: https://www.facebook.com/lakshitha.sandaruwan.167189/.
- Skills carried from the supplied first-year portfolio: HTML5, CSS3, JavaScript, React, Photoshop, SQL Server / SSMS, Illustrator and After Effects.

## Typography and media notes

Orbitron and Space Grotesk variable fonts are self-hosted from the official [Google Fonts repository](https://github.com/google/fonts). Their SIL Open Font License 1.1 files are retained in `assets/fonts/` alongside the fonts. Orbitron supplies the futuristic headline style; Space Grotesk supports interface text.

The legacy TikTok profile `@lakshithasandaru22` returned “Couldn't find this account” during verification. Additional selected video links can be added later. Website background videos remain supporting website content; they are separate from the two authored video entries.

## Local and online state

The complete local portfolio includes the original coursework media. A private Site identity was reserved, but no online deployment has been reported as successful. Six retained video files exceed the individual static asset hosting limit of 25 MiB. Smaller video derivatives or separate hosting are needed for full publication: [Cloudflare asset limits](https://developers.cloudflare.com/workers/platform/limits/).
