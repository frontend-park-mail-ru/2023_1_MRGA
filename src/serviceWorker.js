const CACHE_NAME = '0.1.0';

self.__BMWP_MANIFEST.push('/')

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(self.__BMWP_MANIFEST);
            })
    );
});

self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    if (self.__BMWP_MANIFEST.includes(url.pathname)) {
        event.respondWith(
            fetchFromCache(request)
                .catch(() => fetch(request))
                .catch(() => returnOfflineResponse())
        );
    }
    if (url.pathname.startsWith('/api/auth/user')) {
        event.respondWith(
            fetch(event.request).catch(() => {
                // В случае ошибки или отсутствия интернет-соединения
                // возвращаем пользовательский ответ с телом JSON
                return new Response(
                    JSON.stringify({status: 999, offline: true}),
                    {headers: {'Content-Type': 'application/json'}}
                );
            })
        );
    }
});

function fetchFromCache(request) {
    return caches.open(CACHE_NAME)
        .then(cache => cache.match(request))
        .then(response => {
            if (!response) {
                throw new Error('Resource not found in cache');
            }
            return response;
        });
}

function returnOfflineResponse() {
    return new Response('Offline mode. Please check your internet connection.');
}





















