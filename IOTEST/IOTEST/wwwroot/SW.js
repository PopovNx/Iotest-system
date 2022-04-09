importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
const CACHE = "page";
const offlineFallbackPage = "Offline.html";
self.addEventListener("message", async (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        await self.skipWaiting();
    }
});
self.addEventListener('install', async (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => cache.add(offlineFallbackPage))
    );
});
if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
}
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const preloadResp = await event.preloadResponse;
                if (preloadResp) {
                    return preloadResp;
                }

                return await fetch(event.request);
            } catch (error) {
                const cache = await caches.open(CACHE);
                return await cache.match(offlineFallbackPage);
            }
        })());
    }
});