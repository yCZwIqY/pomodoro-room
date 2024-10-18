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

let timeType = 'NONE';
let startTime = 0;
let pausedTime = 0;
let currentRepeat = 1;
let remainingTime = 0;
let isPaused = false;

let focusTime = 0;
let restTime = 0;
let repeatCount = 0;

self.onmessage = ({ data }) => {
  switch (data.type) {
    case 'START_TIMER':
      onResetTimer();
      focusTime = data.data.focusTime;
      restTime = data.data.restTime;
      repeatCount = data.data.repeatCount;

      onStartFocus();
      onStartTimer();
      return;
    case 'PAUSE_TIMER':
      onPause();
      return;
    case 'STOP_TIMER':
      onStop();
      return;
    case 'GET_STATE':
      self.postMessage({
        type: timeType,
        time: remainingTime,
        repeat: currentRepeat
      });
      return;
    default:
      return;
  }
};

const onStartTimer = () => {
  startTime = Date.now() - pausedTime;
  updateTimer();
};

const updateTimer = () => {
  if (isPaused) return;

  const currentTime = Date.now();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  const totalTime = (timeType === 'FOCUS' ? focusTime : restTime) * 60;
  remainingTime = totalTime - elapsedTime;

  self.postMessage({
    type: 'INTERVAL',
    time: remainingTime,
    repeat: currentRepeat,
    timeType
  });

  if (remainingTime <= 0) {
    if (timeType === 'FOCUS') {
      onStartRest();
    } else if (repeatCount === currentRepeat + 1) {
      onComplete();
    } else {
      currentRepeat++;
      onStartFocus();
    }
  } else {
    setTimeout(updateTimer, 100);  // 더 부드러운 업데이트를 위해 100ms 간격으로 설정
  }
};

const onStartFocus = () => {
  timeType = 'FOCUS';
  startTime = Date.now();
  pausedTime = 0;
  self.postMessage({ type: 'FOCUS', time: focusTime * 60, repeat: currentRepeat });
  updateTimer();
};

const onStartRest = () => {
  timeType = 'REST';
  startTime = Date.now();
  pausedTime = 0;
  self.postMessage({ type: 'REST', time: restTime * 60, repeat: currentRepeat });
  updateTimer();
};

const onPause = () => {
  if (isPaused) {
    startTime = Date.now() - pausedTime;
    updateTimer();
  } else {
    pausedTime = Date.now() - startTime;
  }
  isPaused = !isPaused;
};

const onStop = () => {
  onResetTimer();
};

const onComplete = () => {
  self.postMessage({ type: 'COMPLETE' });
  onResetTimer();
};

const onResetTimer = () => {
  timeType = 'NONE';
  startTime = 0;
  pausedTime = 0;
  currentRepeat = 0;
  isPaused = false;
  focusTime = 0;
  restTime = 0;
  repeatCount = 1;
  remainingTime = 0;
};