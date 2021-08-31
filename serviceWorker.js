const cacheName = "ps-list_v2.8"
const assets = [
    "/",
    "/index.html",
    "/favicon.png",
    "/assets/images/ps.png",
    "/assets/images/ps_192x192.png",
    "/assets/images/ps_512x512.png",
    "/index.js",
    "/assets/jsons/listaEspecialidades.json",
    "/assets/jsons/result.json",
    "/node_modules/vue/dist/vue.min.js",
    "/node_modules/axios/dist/axios.min.js",
    "/node_modules/lodash/lodash.js",
    "/node_modules/bootstrap/dist/css/bootstrap.min.css"
]


// Cache all the files to make a PWA
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            // Our application only has two files here index.html and manifest.json
            // but you can add more such as style.css as your app grows
            return cache.addAll(assets);
        })
    );
});

// Our service worker will intercept all fetch requests
// and check if we have cached the file
// if so it will serve the cached file
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
        .then(cache => cache.match(event.request, { ignoreSearch: true }))
        .then(response => {
            return response || fetch(event.request);
        })
    );
});