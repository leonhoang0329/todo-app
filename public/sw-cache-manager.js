// This file adds additional caching functionality beyond what Workbox provides
// It will be copied to the dist folder by webpack

// Set up cache timing constants
const CACHE_NAME = 'todo-app-v1';
const DATA_CACHE_NAME = 'todo-app-data-v1';

// Add event listener for service worker installation
self.addEventListener('install', event => {
  console.log('Installing Custom Cache Manager');
  
  // Pre-cache essential assets for offline use
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          './',
          './index.html',
          './manifest.json',
          './icons/icon-192x192.png',
          './icons/icon-512x512.png',
          './offline.html'
        ]);
      })
  );
});

// Add event listener for service worker activation
self.addEventListener('activate', event => {
  console.log('Activating Custom Cache Manager');
  
  // Clean up old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercept fetch requests for localStorage backup
self.addEventListener('fetch', event => {
  // Only intercept specific backup requests
  if (event.request.url.includes('/backup-localStorage')) {
    console.log('Handling backup request:', event.request.url);
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(event.request)
          .then(response => {
            // Store the response in the cache
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => {
            // If network fails, try to return from cache
            return cache.match(event.request);
          });
      })
    );
  }
});