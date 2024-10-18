let timeType = 'NONE';
let startTime = 0;
let endTime = 0;
let currentRepeat = 1;
let isPaused = false;

let focusTime = 0;
let restTime = 0;
let repeatCount = 0;

self.onmessage = ({ data }) => {
  switch (data.type) {
    case 'START_TIMER':
      focusTime = data.data.focusTime * 60;
      restTime = data.data.restTime * 60;
      repeatCount = data.data.repeatCount;
      startFocusTimer();
      return;
    case 'PAUSE_TIMER':
      togglePause();
      return;
    case 'STOP_TIMER':
      stopTimer();
      return;
    default:
      return;
  }
};

const startFocusTimer = () => {
  timeType = 'FOCUS';
  startTime = Date.now();
  endTime = startTime + focusTime * 1000;
  postTimeUpdate();
};

const startRestTimer = () => {
  timeType = 'REST';
  startTime = Date.now();
  endTime = startTime + restTime * 1000;
  postTimeUpdate();
};

const postTimeUpdate = () => {
  const interval = setInterval(() => {
    if (isPaused) return;

    const currentTime = Date.now();
    const remainingTime = Math.max(0, Math.floor((endTime - currentTime) / 1000));

    self.postMessage({
      type: 'INTERVAL',
      time: remainingTime,
      repeat: currentRepeat,
      timeType,
    });

    if (remainingTime <= 0) {
      clearInterval(interval);

      if (timeType === 'FOCUS') {
        if (currentRepeat < repeatCount) {
          currentRepeat++;
          startRestTimer();
        } else {
          completeRoutine();
        }
      } else if (timeType === 'REST') {
        startFocusTimer();
      }
    }
  }, 1000);
};

const completeRoutine = () => {
  self.postMessage({ type: 'COMPLETE' });
  resetTimer();
};

const resetTimer = () => {
  timeType = 'NONE';
  startTime = 0;
  endTime = 0;
  currentRepeat = 1;
  isPaused = false;
};

const togglePause = () => {
  isPaused = !isPaused;

  if (!isPaused) {
    const remainingTime = endTime - Date.now();
    startTime = Date.now();
    endTime = startTime + remainingTime;
    postTimeUpdate();
  }
};

const stopTimer = () => {
  resetTimer();
};
