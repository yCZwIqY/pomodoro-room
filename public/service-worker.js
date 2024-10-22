
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification(event.data.message, {
      body: event.data.body,
      icon: '/pwa-64x64.png',
      requireInteraction: true
    });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
});

