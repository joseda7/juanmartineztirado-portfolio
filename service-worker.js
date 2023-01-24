const cacheName = 'cache-v2';
const resourcesToPrecache = [
    '/',
    'index.html',
    '/css/main.css?v=5',
    '/assets/img/trifolium-repens-l.png',
    '/assets/img/icono-mail.png',
    '/assets/img/icono-instagram.png',
    '/assets/img/icono-behance.png',
    '/assets/fonts/Lato-Regular/Lato-Regular.eot',
    '/assets/fonts/Lato-Regular/Lato-Regular.svg',
    '/assets/fonts/Lato-Regular/Lato-Regular.ttf',
    '/assets/fonts/Lato-Regular/Lato-Regular.woff',
    '/assets/fonts/Lato-Regular/Lato-Regular.woff2',
    '/assets/fonts/Merriweather-Regular/Merriweather-Regular.eot',
    '/assets/fonts/Merriweather-Regular/Merriweather-Regular.svg',
    '/assets/fonts/Merriweather-Regular/Merriweather-Regular.ttf',
    '/assets/fonts/Merriweather-Regular/Merriweather-Regular.woff',
    '/assets/fonts/Merriweather-Regular/Merriweather-Regular.woff2',
    '/assets/img/favicon.ico'
];

self.addEventListener('install', event => {
    console.log('SW install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToPrecache)
            })
    )
})

self.addEventListener('activate', event => {
    console.log('Activate event!');
})

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      }),
    );
});

