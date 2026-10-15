LAKSHITHA SANDARUWAN — CREATIVE PORTFOLIO

Open index.html in a browser. This is a buildless HTML/CSS/JavaScript portfolio and can run directly from the local folder.

Included: 23 project entries.
- Nine websites, including the first-year LIMITLESS 44 CLUB, Hamilton Ferrari and Hamilton Biography projects as individual entries mixed with later work.
- Eight graphic design collections containing 16 images, including both Hamilton magazine cover variants and the Lando Norris concept poster study.
- Four photography collections containing 14 selected images: Akihabara After Dark, Tokyo Portrait Session, Asakusa Timeless Portraits and Shinjuku Neon Nights.
- Two video projects: Travel to Osaka (0:31) and the Sri Lanka seminar presentation (full video 3:36).
- Cinematic design inspired by the supplied reference, with animated typography, scroll motion, hover interactions and reduced-motion support.
- Discipline and academic-year filters, project details, artwork galleries, original-image links, email, Instagram and Facebook.
- Self-hosted Orbitron and Space Grotesk variable fonts, with their SIL Open Font License files in assets/fonts/.
- A muted, optimized copy of the original first-year portfolio background video in the new cinematic presentation. The original MOV is preserved.

Source files:
index.html: page copy and sections.
styles.css: appearance and responsive layouts.
script.js: filters, project dialogs and galleries.
cinematic.js: cinematic hero presentation and motion.
content-catalog.json: local source inventory, metadata and original source paths.
assets/previews/manifest.json: optimized image metadata.
assets/photography/manifest.json: imported photography collections, source posts and exact downloaded image resolutions.
assets/videography/manifest.json: the two authored video projects, YouTube links and local thumbnails.
assets/fonts/: locally served fonts and their licenses.
assets/backgrounds/: optimized original background video, poster and provenance manifest.
projects/: retained website copies, with documented nested-path repairs.
tools/build-data.mjs: regenerates projects-data.js after changing the catalog.

To regenerate project data, run Node.js with tools/build-data.mjs. The generated file contains browser-safe display data rather than local filesystem paths. The retained first-year source folder supports the individual imported projects; the old portfolio itself is not shown as a separate project entry.

The two video projects use the user's supplied YouTube links. The Sri Lanka seminar project includes a four-second local preview and a link to the full 3:36 presentation on YouTube. Preview thumbnails are retained locally. The full remote videos were not downloaded. Videos embedded in older coursework websites remain with their source projects and are separate from these two authored video entries. The legacy TikTok profile could not be opened during verification.

Photography retains the downloaded JPEGs and existing photographer watermarks. Thirteen Facebook post previews were available at 443 x 590 pixels; those files were not enlarged. The Akihabara image was available at 3071 x 4096 pixels. Full metadata and original-file hashes are recorded in the photography manifest.

Hosting identity has been reserved in .openai/hosting.json. This local version has not been published. Six retained coursework video files exceed the hosting platform's individual 25 MiB static asset limit. Original local files and playback have been preserved; online publication needs smaller video copies or separate video hosting.
