/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox){
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/manifest.json', revision: '2' },
    { url: '/push.js', revision: '2' },
    { url: '/detail_match.html', revision: '1' },
    { url: '/detail_player.html', revision: '1' },
    { url: '/detail_team.html', revision: '1' },
    { url: '/images/icon1.png', revision: '2' },
    { url: '/images/icon2.png', revision: '2' },
    { url: '/images/icon1.ico', revision: '1' },
    { url: '/images/stadium.jpg', revision: '1' },
    { url: '/images/fotoprofil.jpg', revision: '1' },
    { url: '/images/klasemen.jpg', revision: '1' },
    { url: '/images/match.jpg', revision: '1' },
    { url: '/images/favorit.jpg', revision: '1' },
    { url: '/css/fontawesome/fontawesome.min.css', revision: '1' },
    { url: '/css/fontawesome/all.min.css', revision: '1' },
    { url: '/css/main.css', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/webfonts/fa-brands-400.eot', revision: '1' },
    { url: '/css/webfonts/fa-brands-400.svg', revision: '1' },
    { url: '/css/webfonts/fa-brands-400.ttf', revision: '1' },
    { url: '/css/webfonts/fa-brands-400.woff', revision: '1' },
    { url: '/css/webfonts/fa-brands-400.woff2', revision: '1' },
    { url: '/css/webfonts/fa-regular-400.eot', revision: '1' },
    { url: '/css/webfonts/fa-regular-400.svg', revision: '1' },
    { url: '/css/webfonts/fa-regular-400.ttf', revision: '1' },
    { url: '/css/webfonts/fa-regular-400.woff', revision: '1' },
    { url: '/css/webfonts/fa-regular-400.woff2', revision: '1' },
    { url: '/css/webfonts/fa-solid-900.eot', revision: '1' },
    { url: '/css/webfonts/fa-solid-900.svg', revision: '1' },
    { url: '/css/webfonts/fa-solid-900.ttf', revision: '1' },
    { url: '/css/webfonts/fa-solid-900.woff', revision: '1' },
    { url: '/css/webfonts/fa-solid-900.woff2', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/script.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/klasemen.js', revision: '1' },
    { url: '/js/matchleague.js', revision: '1' },
    { url: '/js/detail_team.js', revision: '1' },
    { url: '/js/detail_match.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
],{
  ignoreUrlParametersMatching: [/.*/]
});

  workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-1'
  })
  );

  workbox.routing.registerRoute(
  new RegExp('https://crests.football-data.org'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-2'
  })
  );

  workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
    })
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
        }),
      ],
    }),
  );

  // Menyimpan cache dari CSS Google Fonts
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );
  
  // Menyimpan cache untuk file font selama 1 tahun
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );
}
else{
  console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', event => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'images/icon1.png',
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