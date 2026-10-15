# Lakshitha Sandaruwan — Creative Portfolio

A cinematic portfolio bringing together two years of web development, graphic design, photography and video work.

The collection contains **23 projects**:

- 9 websites from first- and second-year studies.
- 8 graphic design collections with 16 artworks.
- 4 photography collections with 14 selected photographs.
- 2 video projects, including a Sri Lanka seminar presentation.

The first-year portfolio's profile, skills, individual websites, unique artworks and original background film are integrated into the main portfolio.

## Preview locally

Open `index.html` directly, or serve this directory with Python:

```sh
python -m http.server 5174 --bind 127.0.0.1
```

Visit [localhost:5174](http://127.0.0.1:5174/). The portfolio uses plain HTML, CSS and JavaScript and needs no dependency installation.

## Features

- Original background reel, featured-project thumbnails and animated titles.
- Moving showcase, discipline and academic-year filters.
- Project details, multi-image galleries and links to individual websites.
- Responsive layouts, keyboard controls, pause controls and reduced-motion support.
- Locally hosted Orbitron and Space Grotesk fonts with their OFL licenses.

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html`, `styles.css` | Main page and responsive design |
| `script.js`, `cinematic.js` | Collection, galleries and animation |
| `projects-data.js` | Generated browser data |
| `content-catalog.json` | Portable project catalogue |
| `assets/` | Artwork, photographs, previews, background reel and fonts |
| `projects/` | Retained coursework websites and supporting media |
| `tools/build-data.mjs` | Rebuilds the browser data using Node.js |

After changing the catalogue or asset manifests, regenerate the data:

```sh
node tools/build-data.mjs
```

## Media

Original coursework files and photographer watermarks are retained. Some media files are large. Selected Facebook previews keep their downloaded resolution. The Sri Lanka video includes a four-second local preview and a link to the full 3:36 presentation on YouTube; the full remote videos are not downloaded.

Graphic pieces featuring existing brands, public figures or characters are presented as student design studies and concepts. The font license files are included in `assets/fonts/`.

This repository contains the portfolio source. GitHub Pages deployment is not configured.
