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

self.addEventListener('periodicsync', event => {
  if (event.tag === 'timer-sync') {
    event.waitUntil(syncTimer());
  }
});

async function syncTimer() {
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({ type: 'SYNC_TIMER' });
  });
}