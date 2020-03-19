const cacheName = 'v1';
// const cacheAssets = ['index.html', 'main.css', 'index.js'];

// Installing
self.addEventListener('install', e => {
  /* 
    Effective and Useful approach 
    But not recomended
  */
  // e.waitUntil(
  //   caches
  //     .open(cacheName)
  //     .then(cache => {
  //       cache.addAll(cacheAssets);
  //     })
  //     // When it's done
  //     .then(() => self.skipWaiting())
  // );
});

// Activating
self.addEventListener('activate', e => {
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        // Mapping through all available caches
        cacheNames.map(cache => {
          // If the indexed cache in cacheNames is not equal
          // to current cacheName
          if (cache !== cacheName) {
            // Remove it
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call fetch Events
self.addEventListener('fetch', e => {
  // Recomended approach to cache
  e.respondWith(
    fetch(e.request)
      // Make copy of visited assets (Online)
      .then(res => {
        const resClone = res.clone();
        caches.open(cacheName).then(cache => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      // Retrieve assets from cache if availble (Offline)
      .catch(() => caches.match(e.request))
  );
});
