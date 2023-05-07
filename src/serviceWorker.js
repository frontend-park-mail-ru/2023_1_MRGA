const CACHE_NAME = '0.1.0';
const OFFLINE_PAGE_URL = '/offline.html';

import {precache, precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheFirst, NetworkFirst, NetworkOnly, StaleWhileRevalidate} from 'workbox-strategies';

// workbox-webpack-plugin автоматически генерирует список ресурсов для кэширования
precacheAndRoute([...self.__WB_MANIFEST], {cacheName: CACHE_NAME});

registerRoute(
    // Для всех навигационных запросов
    ({request}) => request.mode === 'navigate',
    async ({event}) => {
        try {
            // Сначала пытаемся получить ресурс из сети
            const response = await new NetworkFirst().handle({event});
            return response || (await caches.match(OFFLINE_PAGE_URL));
        } catch (error) {


            // Если возникает ошибка или нет интернет-соединения, возвращаем закешированный offline.html
            return caches.match(OFFLINE_PAGE_URL);
        }
    }
);

// Создайте собственный маршрут кэширования для API-запросов
// registerRoute(
//     // Фильтр для API-запросов (замените 'your-api-url' на URL вашего API)
//     ({url}) => url.pathname.startsWith('/meetme'),
//     new StaleWhileRevalidate({
//         cacheName: 'api-cache',
//     })
// );

registerRoute(
    // Условие для кэширования запросов к /meetme или /api
    ({url}) => {
        return (url.pathname.startsWith('/meetme') ||
            url.pathname.startsWith('/api')) &&
            !url.pathname.startsWith('/meetme/user');
    },
    // Используйте стратегию Stale-While-Revalidate
    new StaleWhileRevalidate({
        cacheName: 'api-cache',
    })
);


self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.pathname.startsWith('/meetme/user')) {
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




















