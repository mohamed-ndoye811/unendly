import {ExpirationPlugin} from 'workbox-expiration';
import {createHandlerBoundToURL, precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';

import {checkForUpdates} from './updates.js';

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
    ({request}) => request.mode === 'navigate',
    createHandlerBoundToURL('/index.html'),
);

registerRoute(
    ({url}) => url.origin === 'https://i.ytimg.com',
    new StaleWhileRevalidate({
        cacheName: 'yt-thumbnails',
        plugins: [new ExpirationPlugin({maxEntries: 50})],
    }),
);

self.addEventListener('install', () => void self.skipWaiting());
self.addEventListener('activate', () => void self.clients.claim());


self.addEventListener("notificationclick", (e) => {
    // Close the notification popout
    e.notification.close();
    // Get all the Window clients
    e.waitUntil(
        self.clients.matchAll({type: "window"}).then(async (clientsArr) => {
            // If there is an opened window
            if (clientsArr.length) await clientsArr[0].navigate(e.notification.data.url);
            // Otherwise, open a new tab to the applicable URL and focus it.
            else self.clients.openWindow(e.notification.data.url).then((windowClient) => (windowClient ? windowClient.focus() : null));
        })
    );
});

// @ts-expect-error periodicsync is not included in the default SW interface.
self.addEventListener('periodicsync', (event) => {
    console.log("Heyy")
});

self.addEventListener('message', (event) => {
    console.log("Heyy")
});