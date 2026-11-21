// Load the original binary assets losslessly before starting the unchanged WebGPU app.
// All paths are relative so this works at /hkdemo/ on GitHub Pages.
(() => {
  'use strict';
  const assets = [{"id":"tv","file":"assets/tv.bin","bytes":7917120},{"id":"ti","file":"assets/ti.bin","bytes":789431},{"id":"bv","file":"assets/bv.bin","bytes":5838220},{"id":"bi","file":"assets/bi.bin","bytes":1458707},{"id":"cf","file":"assets/cf.bin","bytes":2482595},{"id":"rg","file":"assets/rg.bin","bytes":481757},{"id":"regionJ","file":"assets/regionJ.jpg","bytes":328813},{"id":"territoryJ","file":"assets/territoryJ.jpg","bytes":2515748},{"id":"harbourJ","file":"assets/harbourJ.jpg","bytes":870349},{"id":"pv","file":"assets/pv.bin","bytes":19000658},{"id":"pi","file":"assets/pi.bin","bytes":5453229},{"id":"skyJ","file":"assets/skyJ.jpg","bytes":363253},{"id":"waves","file":"assets/waves.png","bytes":486287},{"id":"shore","file":"assets/shore.png","bytes":18033},{"id":"ph0","file":"assets/ph0.jpg","bytes":954762},{"id":"ph1","file":"assets/ph1.jpg","bytes":1021298},{"id":"ph2","file":"assets/ph2.jpg","bytes":1289501},{"id":"ph3","file":"assets/ph3.jpg","bytes":1215713},{"id":"ph4","file":"assets/ph4.jpg","bytes":1241108},{"id":"ph5","file":"assets/ph5.jpg","bytes":1357256},{"id":"ph6","file":"assets/ph6.jpg","bytes":1085766},{"id":"ph7","file":"assets/ph7.jpg","bytes":1881023},{"id":"ph8","file":"assets/ph8.jpg","bytes":2599246},{"id":"ph9","file":"assets/ph9.jpg","bytes":2602737},{"id":"ph10","file":"assets/ph10.jpg","bytes":2475379},{"id":"ph11","file":"assets/ph11.jpg","bytes":2563756},{"id":"ph12","file":"assets/ph12.jpg","bytes":2551614},{"id":"ph13","file":"assets/ph13.jpg","bytes":2496284},{"id":"ph14","file":"assets/ph14.jpg","bytes":2471352},{"id":"ph15","file":"assets/ph15.jpg","bytes":2524933},{"id":"ph16","file":"assets/ph16.jpg","bytes":2470821},{"id":"ph17","file":"assets/ph17.jpg","bytes":2424189},{"id":"ph18","file":"assets/ph18.jpg","bytes":2417778},{"id":"ph19","file":"assets/ph19.jpg","bytes":2443466},{"id":"ph20","file":"assets/ph20.jpg","bytes":2387914},{"id":"ph21","file":"assets/ph21.jpg","bytes":2316271},{"id":"ph22","file":"assets/ph22.jpg","bytes":2061976},{"id":"ph23","file":"assets/ph23.jpg","bytes":1458133},{"id":"ph24","file":"assets/ph24.jpg","bytes":1645394},{"id":"ph25","file":"assets/ph25.jpg","bytes":2031953},{"id":"ph26","file":"assets/ph26.jpg","bytes":1646691},{"id":"ph27","file":"assets/ph27.jpg","bytes":1502685},{"id":"ph28","file":"assets/ph28.jpg","bytes":1461476},{"id":"ph29","file":"assets/ph29.jpg","bytes":1699520},{"id":"ph30","file":"assets/ph30.jpg","bytes":1754163},{"id":"ph31","file":"assets/ph31.jpg","bytes":1796521},{"id":"ph32","file":"assets/ph32.jpg","bytes":1716507},{"id":"ph33","file":"assets/ph33.jpg","bytes":2138971},{"id":"ph34","file":"assets/ph34.jpg","bytes":1460998},{"id":"ph35","file":"assets/ph35.jpg","bytes":1779911},{"id":"ph36","file":"assets/ph36.jpg","bytes":1923791},{"id":"ph37","file":"assets/ph37.jpg","bytes":1713110},{"id":"ph38","file":"assets/ph38.jpg","bytes":1530971}];
  const progress = document.getElementById('message');
  const loader = document.getElementById('load');
  const loaded = new Map();
  let completed = 0;
  let bytesDone = 0;
  const bytesTotal = assets.reduce((n, a) => n + a.bytes, 0);
  const workers = Math.min(8, assets.length);
  let cursor = 0;
  async function loadWorker() {
    for (;;) {
      const i = cursor++;
      if (i >= assets.length) return;
      const asset = assets[i];
      const response = await fetch(new URL(asset.file, document.baseURI));
      if (!response.ok) throw new Error(`Failed to download ${asset.file}: HTTP ${response.status}`);
      const binary = new Uint8Array(await response.arrayBuffer());
      if (binary.byteLength !== asset.bytes)
        throw new Error(`File size mismatch in ${asset.file}: expected ${asset.bytes}, received ${binary.byteLength}`);
      loaded.set(asset.id, binary);
      bytesDone += binary.byteLength;
      completed += 1;
      if (progress) progress.textContent = `Loading Hong Kong scenery… ${completed}/${assets.length} files · ${Math.round(bytesDone / bytesTotal * 100)}%`;
    }
  }
  Promise.all(Array.from({length:workers}, () => loadWorker())).then(() => {
    window.HKAssetData = loaded;
    if (progress) progress.textContent = 'Preparing WebGPU shaders and scenery…';
    const app = document.createElement('script');
    app.src = new URL('./app.js', document.baseURI).href;
    app.onerror = () => fail(new Error('Failed to load app.js'));
    document.body.appendChild(app);
  }).catch(fail);
  function fail(error) {
    console.error(error);
    if (loader) {
      loader.hidden = false;
      const title = loader.querySelector('b');
      if (title) title.textContent = 'Scenery could not load';
    }
    if (progress) progress.textContent = `${error.message || error}. Check that all files in the assets folder were uploaded to GitHub Pages.`;
  }
})();
