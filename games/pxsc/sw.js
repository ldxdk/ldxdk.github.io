const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v3");
    await cache.addAll(resources);
};

const putInCache = async (request, response) => {
    const cache = await caches.open("v3");
    await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise }) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }

    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
        console.info("using preload response", preloadResponse);
        putInCache(request, preloadResponse.clone());
        return preloadResponse;
    }

    try {
        const responseFromNetwork = await fetch(request);
        putInCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch (error) {
        return new Response("Network error happened", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
        });
    }
};

const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
    }
};

self.addEventListener("activate", (event) => {
    event.waitUntil(enableNavigationPreload());
});

self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache([
            '/games/pxsc/',
            '/games/pxsc/css/pxsc.css',
            '/games/pxsc/css/scl.css',
            '/games/pxsc/img/10-12.png',
            '/games/pxsc/img/1-9.png',
            '/games/pxsc/img/android-chrome-192x192.png',
            '/games/pxsc/img/android-chrome-512x512.png',
            '/games/pxsc/img/apple-touch-icon.png',
            '/games/pxsc/img/favicon-16x16.png',
            '/games/pxsc/img/favicon-32x32.png',
            '/games/pxsc/img/skip.png',
            '/games/pxsc/img/wild.png',
            '/games/pxsc/js/PageGame.js',
            '/games/pxsc/js/PagePlayers.js',
            '/games/pxsc/js/PageScore.js',
            '/games/pxsc/js/Player.js',
            '/games/pxsc/js/PlayerRepository.js',
            '/games/pxsc/js/pxsc.js',
            '/games/pxsc/js/Scl.js',
            '/games/pxsc/js/Storage.js',
            '/games/pxsc/index.html'
        ]),
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        cacheFirst({
            request: event.request,
            preloadResponsePromise: event.preloadResponse,
        }),
    );
});

