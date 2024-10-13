let timeType = 'NONE';
let timer = 0;
let currentTime = 0;
let currentRepeat = 1;
let isPause = false;

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
    default:
      return;
  }
};

const onStartTimer = () => {
  timer = setInterval(() => {
    currentTime++;
    const displayTime =
      (timeType === 'FOCUS' ? focusTime : restTime) * 60 - currentTime;

    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          timeType: 'INTERVAL',
          time: displayTime,
          repeat: currentRepeat
        });
      });
    });

    if (displayTime === 0) {
      currentTime = 0;
      if (timeType === 'FOCUS') {
        onStartRest();
      } else if (repeatCount === currentRepeat) {
        onComplete();
      } else {
        currentRepeat++;
        onStartFocus();
      }
    }
  }, 1000);
};
const onStartFocus = () => {
  timeType = 'FOCUS';
  if (currentRepeat !== 1) {
    self.registration.showNotification('타이머 완료!', {
      body: '집중 시작!',
      icon: '/pwa-64x64.png'
    });
  }
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        timeType: 'FOCUS'
      });
    });
  });
};

const onStartRest = () => {
  self.registration.showNotification('타이머 완료!', {
    body: '휴식을 취할 시간입니다.',
    icon: '/pwa-64x64.png'
  });
  timeType = 'REST';
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        timeType: 'REST'
      });
    });
  });
};

const onPause = () => {
  if (isPause) {
    onStartTimer();
  } else {
    clearInterval(timer);
  }

  isPause = !isPause;
};

const onStop = () => {
  onResetTimer();
};

const onComplete = () => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        timeType: 'COMPLETE'
      });
    });
  });
  self.registration.showNotification('루틴 완료!', {
    body: '루틴을 완료하셨습니다! 수고하셨어요!',
    icon: '/pwa-64x64.png'
  });
  onResetTimer();
};

const onResetTimer = () => {
  clearInterval(timer);
  timeType = 'NONE';
  timer = 0;
  currentTime = 0;
  currentRepeat = 1;
  isPause = false;
  focusTime = 0;
  restTime = 0;
  repeatCount = 0;
};
