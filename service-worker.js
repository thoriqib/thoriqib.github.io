const CACHE_NAME = "football-app-v1";
const urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/manifest.json",
  "/push.js",
  "/detail_match.html",
  "/detail_player.html",
  "/detail_team.html",
  "/pages/home.html",
  "/pages/jadwal.html",
  "/pages/klasemen.html",
  "/pages/tentang.html",
  "/pages/favorit.html",
  "/images/icon1.png",
  "/images/icon2.png",
  "/images/icon2.ico",
  "/images/stadium.jpg",
  "/images/fotoprofil.jpg",
  "/images/klasemen.jpg",
  "/images/match.jpg",
  "/images/favorit.jpg",
  "/css/fontawesome/fontawesome.min.css",
  "/css/fontawesome/all.min.css",
  "/css/materialize.min.css",
  "/css/main.css",
  "/css/webfonts/fa-brands-400.eot",
  "/css/webfonts/fa-brands-400.svg",
  "/css/webfonts/fa-brands-400.ttf",
  "/css/webfonts/fa-brands-400.woff",
  "/css/webfonts/fa-brands-400.woff2",
  "/css/webfonts/fa-regular-400.eot",
  "/css/webfonts/fa-regular-400.svg",
  "/css/webfonts/fa-regular-400.ttf",
  "/css/webfonts/fa-regular-400.woff",
  "/css/webfonts/fa-regular-400.woff2",
  "/css/webfonts/fa-solid-900.eot",
  "/css/webfonts/fa-solid-900.svg",
  "/css/webfonts/fa-solid-900.ttf",
  "/css/webfonts/fa-solid-900.woff",
  "/css/webfonts/fa-solid-900.woff2",
  "https://fonts.googleapis.com/css?family=Muli:400,400i|Roboto+Condensed:400,600,700",
  "https://fonts.gstatic.com/s/muli/v22/7Aulp_0qiz-aVz7u3PJLcUMYOFnOkEk30e6fwniDtzM.woff",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/main.js",
  "/js/klasemen.js",
  "/js/matchleague.js",
  "/js/detail_team.js",
  "/js/detail_match.js",
  "/js/idb.js",
  "/js/db.js",
  "/js/api.js"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  const base_url1 = "https://api.football-data.org/v2/";
  const base_url2 = "https://crests.football-data.org";

  if (event.request.url.indexOf(base_url1) > -1 || event.request.url.indexOf(base_url2) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { 'ignoreSearch': true }).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

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