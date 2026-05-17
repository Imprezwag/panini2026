const CACHE = 'panini2026-v2';
const FILES = [
  '/panini2026/',
  '/panini2026/index.html',
  '/panini2026/manifest.json',
  '/panini2026/es/',
  '/panini2026/es/index.html',
  '/panini2026/en/',
  '/panini2026/en/index.html'
];
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/panini2026/')))
  );
});
