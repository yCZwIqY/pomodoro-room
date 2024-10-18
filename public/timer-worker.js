let timeType = 'NONE';
let startTime = 0;
let currentRepeat = 1;
let isPause = false;
let pausedTime = 0;

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

const calculateRemainingTime = (totalTimeInSeconds) => {
  const now = Date.now();
  const elapsed = Math.floor((now - startTime) / 1000);
  return totalTimeInSeconds - elapsed;
};

const onStartFocus = () => {
  timeType = 'FOCUS';
  startTime = Date.now();
  self.postMessage({ type: 'FOCUS', time: focusTime * 60, repeat: currentRepeat });
  onUpdateTimer(focusTime * 60);
};

const onStartRest = () => {
  timeType = 'REST';
  startTime = Date.now();
  self.postMessage({ type: 'REST', time: restTime * 60, repeat: currentRepeat });
  onUpdateTimer(restTime * 60);
};

const onUpdateTimer = (totalTime) => {
  const interval = setInterval(() => {
    const remainingTime = calculateRemainingTime(totalTime);

    if (isPause) {
      clearInterval(interval);
      return;
    }

    self.postMessage({
      type: 'INTERVAL',
      time: remainingTime,
      repeat: currentRepeat,
      timeType
    });

    if (remainingTime <= 0) {
      clearInterval(interval);
      if (timeType === 'FOCUS') {
        onStartRest();
      } else if (repeatCount === currentRepeat + 1) {
        onComplete();
      } else {
        currentRepeat++;
        onStartFocus();
      }
    }
  }, 1000);
};

const onPause = () => {
  if (isPause) {
    const now = Date.now();
    startTime += now - pausedTime;
  } else {
    pausedTime = Date.now();
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
  timeType = 'NONE';
  startTime = 0;
  currentRepeat = 0;
  isPause = false;
  focusTime = 0;
  restTime = 0;
  repeatCount = 1;
};
