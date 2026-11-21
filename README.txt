HONG KONG HARBOUR FLIGHT — GITHUB PAGES EDITION

HOW TO PUBLISH
1. Extract this ZIP to a temporary location on your Windows computer.
2. Open GitHub Desktop, select the existing hkdemo repository.
3. Select Repository > Show in Explorer (opens the local hkdemo folder).
4. Copy index.html, app.js, boot.js, .nojekyll, and the entire assets folder
   from the extracted ZIP into that local hkdemo folder. Replace index.html.
   (README.txt is optional.)
5. In GitHub Desktop: commit the changes, then Push origin.
6. GitHub Pages is already configured for main / (root). After deployment,
   visit https://wyhauyeung.github.io/hkdemo/

IMPORTANT
- Keep all files together and retain the assets/ subfolder.
- All original geography and photographic data are byte-for-byte preserved.
- This edition requires HTTP(S): for local testing, run python -m http.server
  in the extracted folder, then visit http://localhost:8000/ in Chrome.
- Double-clicking index.html using file:// may fail because browsers usually
  prevent fetch() from reading local files.
- Each file is well below GitHub's 100 MiB individual file limit.
- No Git LFS is required.
