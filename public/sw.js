const CACHE_NAME = "offline-cache-v1";

const CACHE_FILES = ["/", "/favicon.ico", "/logo.svg"];

self.addEventListener("install", (event) => {
  console.log(event.data.toString())
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_FILES)),
  // );
  // self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  console.log(event.data.toString())
  // event.respondWith(
  //   fetch(event.request).catch(() =>
  //     caches
  //       .match(event.request)
  //       .then((cachedResponse) => cachedResponse),
  //   ),
  // );
});

self.addEventListener("activate", (event) => {
  console.log(event.data.toString())
  // event.waitUntil(
  //   caches
  //     .keys()
  //     .then((cacheNames) =>
  //       Promise.all(
  //         cacheNames
  //           .filter((name) => name !== CACHE_NAME)
  //           .map((name) => caches.delete(name)),
  //       ),
  //     ),
  // );
  // self.clients.claim();
});
