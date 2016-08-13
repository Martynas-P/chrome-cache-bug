self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache')
      .then((cache) => {
        return cache.addAll([
          '',
          'some-assets.js'
        ]);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.open('my-cache').
    then(cache =>
      cache.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    )
  );
});