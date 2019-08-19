/*var cacheName = 'geraldo-pwa';
var filesToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
*/
function addToCache(request, networkResponse) {
  return caches.open('web-bluetooth')
    .then(cache => cache.put(request, networkResponse));
}

function getCacheResponse(request) {
  return caches.open('web-bluetooth').then(cache => {
    return cache.match(request);
  });
}

function getNetworkOrCacheResponse(request) {
  return fetch(request).then(networkResponse => {
    addToCache(request, networkResponse.clone());
    return networkResponse;
  }).catch(_ => {
    return getCacheResponse(request)
      .then(cacheResponse => cacheResponse || Response.error());
  });
}

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(getNetworkOrCacheResponse(event.request));
  }
});