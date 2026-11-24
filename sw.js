// SleepyTrain service worker: keeps the whole app on the phone so it opens without internet.
const CACHE = "sleepytrain-68e4a288adf1";
const FILES = ["data.js", "depots.js", "fonts.css", "fonts/BarlowCondensed-500-latin-ext.woff2", "fonts/BarlowCondensed-500-latin.woff2", "fonts/BarlowCondensed-600-latin-ext.woff2", "fonts/BarlowCondensed-600-latin.woff2", "fonts/BarlowCondensed-700-latin-ext.woff2", "fonts/BarlowCondensed-700-latin.woff2", "fonts/IBMPlexSans-400-latin-ext.woff2", "fonts/IBMPlexSans-400-latin.woff2", "fonts/IBMPlexSans-500-latin-ext.woff2", "fonts/IBMPlexSans-500-latin.woff2", "fonts/IBMPlexSans-600-latin-ext.woff2", "fonts/IBMPlexSans-600-latin.woff2", "fonts/JetBrainsMono-400-latin-ext.woff2", "fonts/JetBrainsMono-400-latin.woff2", "fonts/JetBrainsMono-600-latin-ext.woff2", "fonts/JetBrainsMono-600-latin.woff2", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png", "img/logos/arst.png", "img/logos/circumetnea.png", "img/logos/eav.png", "img/logos/fal.png", "img/logos/ferrovie-del-gargano.png", "img/logos/ferrovie-della-calabria.png", "img/logos/fse.png", "img/logos/sad.png", "img/logos/tft.png", "img/logos/trenitalia-tper.png", "img/logos/trenitalia.png", "img/logos/trentino-trasporti.png", "img/logos/tua.png", "img/models/arst-ade.jpg", "img/models/blues.jpg", "img/models/caravaggio.jpg", "img/models/et400.jpg", "img/models/eti400.jpg", "img/models/fal-stadler.jpg", "img/models/fc-m4c.jpg", "img/models/fce-ade.jpg", "img/models/fcu-minuetto.jpg", "img/models/fg-etr330.jpg", "img/models/fse-atr220.jpg", "img/models/ft-etr340.jpg", "img/models/jazz.jpg", "img/models/minuetto-d.jpg", "img/models/pop.jpg", "img/models/rock-tper.jpg", "img/models/rock.jpg", "img/models/sad-etr170.jpg", "img/models/sfsm-etr.jpg", "img/models/ssif-abe.jpg", "img/models/swing.jpg", "img/models/tft-etr425.jpg", "img/models/tper-atr220.jpg", "img/models/tua-minuetto.jpg", "index.html", "logo.svg", "manifest.webmanifest"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["./", ...FILES].map((f) => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("sleepytrain-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return; // aerial photos etc.: straight to the network
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request).catch(() => caches.match("./"))));
});
