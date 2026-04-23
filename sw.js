/**
 * ADDU Nation Alumni Network — Service Worker
 * PWA Caching Strategy:
 *  - Shell/App assets → Cache First (instant offline load)
 *  - Google Fonts     → Stale While Revalidate (fast + fresh)
 *  - API / dynamic   → Network First with cache fallback
 */

const CACHE_VERSION = 'v1.0.0';
const SHELL_CACHE   = `addu-shell-${CACHE_VERSION}`;
const FONTS_CACHE   = `addu-fonts-${CACHE_VERSION}`;
const DATA_CACHE    = `addu-data-${CACHE_VERSION}`;

// Assets to pre-cache on install (App Shell)
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// ── INSTALL ─────────────────────────────────────────────
self.addEventListener('install', event => {
  console.log('[SW] Installing ADDU Nation Service Worker…');

  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => {
        console.log('[SW] Pre-caching App Shell');
        return Promise.allSettled(
          SHELL_ASSETS.map(url =>
            cache.add(url).catch(err =>
              console.warn(`[SW] Failed to cache: ${url}`, err)
            )
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ─────────────────────────────────────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activating new Service Worker…');

  const VALID_CACHES = [SHELL_CACHE, FONTS_CACHE, DATA_CACHE];

  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(name => !VALID_CACHES.includes(name))
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        )
      )
      .then(() => self.clients.claim())
  );
});

// ── FETCH ─────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and chrome-extension requests
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // ── Google Fonts: Stale While Revalidate ──
  if (url.origin === 'https://fonts.googleapis.com' ||
      url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(request, FONTS_CACHE));
    return;
  }

  // ── App Shell (HTML, manifest, icons): Cache First ──
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
    return;
  }

  // ── Everything else: Network First with fallback ──
  event.respondWith(networkFirst(request, DATA_CACHE));
});

// ── STRATEGY: Cache First ────────────────────────────────
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    console.log('[SW] Cache hit:', request.url);
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    console.warn('[SW] Network failed, serving fallback');
    return new Response('<h1>You are offline</h1>', {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// ── STRATEGY: Network First ──────────────────────────────
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    console.warn('[SW] Network failed, checking cache:', request.url);
    const cached = await caches.match(request);
    if (cached) return cached;

    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }
  }
}

// ── STRATEGY: Stale While Revalidate ────────────────────
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached);

  return cached || fetchPromise;
}

// ── BACKGROUND SYNC ───────────────────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-donations') {
    event.waitUntil(syncOfflineDonations());
  }
});

async function syncOfflineDonations() {
  console.log('[SW] Syncing offline donation queue…');
}

// ── PUSH NOTIFICATIONS ────────────────────────────────────
self.addEventListener('push', event => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || 'You have a new notification from ADDU Nation.',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' },
    actions: [
      { action: 'view',    title: 'View',    icon: '/icons/icon-72.png' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'ADDU Nation', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  }
});
