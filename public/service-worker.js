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
  // 필요한 경우 여기에 추가 로직을 구현할 수 있습니다.
});