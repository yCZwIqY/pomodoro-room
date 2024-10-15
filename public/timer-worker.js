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

    self.postMessage({
      type: 'INTERVAL',
      time: displayTime,
      repeat: currentRepeat,
      timeType
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
  self.postMessage({ type: 'FOCUS' });
};

const onStartRest = () => {
  timeType = 'REST';
  self.postMessage({ type: 'REST' });
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
  self.postMessage({ type: 'COMPLETE' });
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