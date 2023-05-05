const CACHE_NAME = '0.1.0';
const OFFLINE_PAGE_URL = '/offline.html';

import {precache, precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {NetworkFirst, StaleWhileRevalidate} from 'workbox-strategies';

// workbox-webpack-plugin автоматически генерирует список ресурсов для кэширования
precacheAndRoute([...self.__WB_MANIFEST, {url: OFFLINE_PAGE_URL, revision: null}], {cacheName: CACHE_NAME});

// Создайте собственный маршрут кэширования
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
registerRoute(
    // Фильтр для API-запросов (замените 'your-api-url' на URL вашего API)
    ({url}) => url.pathname.startsWith('/meetme'),
    new StaleWhileRevalidate({
        cacheName: 'api-cache',
    })
);
