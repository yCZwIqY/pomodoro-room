let timeType = 'NONE';
let startTime = 0;
let pauseTime = 0;
let elapsedTime = 0; // 일시정지 상태에서 경과한 시간을 저장
let currentRepeat = 0;
let isPause = false;

let focusTime = 0;
let restTime = 0;
let repeatCount = 0;
let intervalId = null;
let stopFlag = false;

self.onmessage = ({ data }) => {
  switch (data.type) {
    case 'START_TIMER':
      onResetTimer();
      focusTime = data.data.focusTime;
      restTime = data.data.restTime;
      repeatCount = data.data.repeatCount;
      stopFlag = false;

      onStartFocus();
      startTimer();
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

const startTimer = () => {
  startTime = Date.now() - elapsedTime; // 일시정지 상태에서 경과한 시간을 보정
  intervalId = setInterval(updateTime, 1000);
};

const updateTime = () => {
  if(isPause || stopFlag) return;
  const now = Date.now();
  elapsedTime = now - startTime;
  const totalTime = (timeType === 'FOCUS' ? focusTime : restTime) * 60;
  const displayTime = totalTime - Math.floor(elapsedTime / 1000); // 남은 시간 계산

  self.postMessage({
    type: 'INTERVAL',
    time: displayTime,
    repeat: currentRepeat,
    timeType
  });

  if (displayTime <= 0) {
    if (timeType === 'FOCUS') {
      onStartRest();
    } else if (currentRepeat >= repeatCount) {
      onComplete();
    } else {
      currentRepeat++;
      onStartFocus();
    }
    startTime = Date.now(); // 타이머 재설정
    elapsedTime = 0; // 경과 시간 초기화
  }
};

const onStartFocus = () => {
  timeType = 'FOCUS';
  self.postMessage({ type: 'FOCUS', time: focusTime * 60, repeat: currentRepeat + 1});
  startTimer();
};

const onStartRest = () => {
  timeType = 'REST';
  self.postMessage({ type: 'REST', time: restTime * 60, repeat: currentRepeat + 1});
  startTimer();
};

const onPause = () => {
  if (!isPause) {
    clearInterval(intervalId); // 타이머 중지
    pauseTime = Date.now(); // 일시정지 시점 기록
  } else {
    startTime += Date.now() - pauseTime; // 일시정지된 시간만큼 보정
    startTimer(); // 타이머 재개
  }
  isPause = !isPause;
};

const onStop = () => {
  onResetTimer();
  stopFlag = true
};

const onComplete = () => {
  if(stopFlag) return;
  self.postMessage({ type: 'COMPLETE' });
  onResetTimer();
};

const onResetTimer = () => {
  clearInterval(intervalId);
  timeType = 'NONE';
  startTime = 0;
  pauseTime = 0;
  elapsedTime = 0;
  currentRepeat = 0;
  isPause = false;
  focusTime = 0;
  restTime = 0;
  repeatCount = 0;
};
