const CACHE_NAME = 'freepage-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/og-image.svg',
  '/favicon.svg',
  '/vs-google-docs.html',
  '/vs-notion.html',
  '/vs-microsoft-word.html',
  '/free-writing-app-for-students.html',
  '/free-distraction-free-writing-app.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
