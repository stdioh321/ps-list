const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
    "/",
    "/index.html",
    "/assets/images/ps.png",
    "/index.js",
    "/assets/jsons/listaEspecialidades.json",
    "/assets/jsons/result.json"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevCoffee).then(cache => {
            cache.addAll(assets)
        })
    )
})