// cashe name
const casheName = "v1";

// fetch content
self.addEventListener("fetch", event => {
  event.respondWith(
    // try to fetch content online
    fetch(event.request)
      // with network connection
      .then(visitedPage => {
        // copy of the visited page
        const pageClone = visitedPage.clone();
        caches.open(casheName).then(cache => {
          // pair the request with response in the cashe
          cache.put(event.request, pageClone);
        });
        // display the page
        return visitedPage;
      })
      // no network connection: bring what is in the cashe
      .catch(() => caches.match(event.request).then(res => res))
  );
});
