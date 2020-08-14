// Mengimpor Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');


if (workbox) {
    console.log(`Workbox berhasil dimuat`);

    // Precaching App Shell
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/link.html', revision: '1' },
        { url: '/infoTeam.html', revision: '1' },
        { url: '/pages/match.html', revision: '1' },
        { url: '/pages/teams.html', revision: '1' },
        { url: '/pages/favorite.html', revision: '1' },
        { url: '/css/materialize.min.css', revision: '1' },
        { url: '/css/style.css', revision: '1' },
        { url: '/js/materialize.min.js', revision: '1' },
        { url: '/js/link.js', revision: '1' },
        { url: '/js/footballApi.js', revision: '1' },
        { url: '/js/idb.js', revision: '1' },
        { url: '/js/db.js', revision: '1' },
        { url: '/js/notifikasi.js', revision: '1' },
        { url: '/push.js",', revision: '1' },
        { url: '/img/icon-128x128.png', revision: '1' },
        { url: '/img/icon-256x256.png', revision: '1' },
        { url: '/img/icon-512x512.png', revision: '1' },
        { url: '/img/premier-league.svg', revision: '1' },
        { url: '/manifest.json', revision: '1' },
    ], {
        ignoreURLParametersMatching: [/.*/]
    });

    // Routing halaman
    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate()
    );

    // Routing HTML
    workbox.routing.registerRoute(
        new RegExp('/html'),
        workbox.strategies.cacheFirst()
    );

    // Routing materialize icon
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis.com/,
        workbox.strategies.staleWhileRevalidate()
    )

    // Routing API
    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'football-api'
        })
    );
}
else {
    console.log(`Workbox gagal dimuat`);
}


self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});