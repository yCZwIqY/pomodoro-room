import {
  useCallback,
  useRef,
  useState,
  useEffect,
  useLayoutEffect
} from 'react';
import useTokenStore from '@store/useTokenStore.tsx';

export interface TimerFormData {
  focusTime: number;
  restTime: number;
  repeatCount: number;
}

const useTimer = (onCompleteRoutine: () => void) => {
  const [timeType, setTimeType] = useState('NONE');
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const focusTime = useRef(0);
  const repeatCount = useRef(0);
  const currentRepeatCount = useRef(0);
  const workerRef = useRef<Worker | null>(null);

  const { addToken } = useTokenStore();

  useEffect(() => {
    workerRef.current = new Worker('/timer-worker.js');

    workerRef.current.onmessage = ({ data }) => {
      switch (data.type) {
        case 'FOCUS':
          onPostMessage('집중 시작', '집중할 시간입니다.');
          setTimeType('FOCUS');
          setRemainingTime(data.time);
          currentRepeatCount.current = data.repeat;
          break;
        case 'REST':
          onPostMessage('휴식 시작', '휴식을 취할 시간입니다.');
          setTimeType('REST');
          setRemainingTime(data.time);
          currentRepeatCount.current = data.repeat;
          break;
        case 'INTERVAL':
          currentRepeatCount.current = data.repeat;
          setRemainingTime(data.time);
          currentRepeatCount.current = data.repeat;
          break;
        case 'COMPLETE':
            onPostMessage(
              '루틴 완료',
              '모든 루틴을 완료하셨습니다. 수고하셨어요!'
            );
            setTimeType('NONE');
            onCompleteRoutine();
            addToken(getToken());
          break;
        default:
          break;
      }
    };
  }, []);

  const getToken = useCallback(() => {
    const baseToken = 2;
    const focusTimeBonus = 0.05 * focusTime.current;
    const repeatBonus = 2 * repeatCount.current;
    return Math.floor(baseToken + focusTimeBonus + repeatBonus);
  }, []);

  const onStartTimer = (data: TimerFormData) => {
    setRemainingTime(data.focusTime * 60);
    focusTime.current = data.focusTime;
    repeatCount.current = data.repeatCount;

    workerRef.current?.postMessage({
      type: 'START_TIMER',
      data
    });

    // 서비스 워커를 통해 알림 표시
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      onPostMessage('루틴 시작', '뽀모도로 루틴을 시작합니다!');
    }
  };

  const onPostMessage = (title, body) => {
    navigator.serviceWorker.controller.postMessage({
      type: 'SHOW_NOTIFICATION',
      message: title,
      body: body
    });
  };

  const onPauseResume = () => {
    setIsPaused(!isPaused);
    workerRef.current?.postMessage({
      type: 'PAUSE_TIMER'
    });
  };

  const onStop = () => {
    setTimeType('NONE');
    setIsPaused(false);
    setRemainingTime(0);
    workerRef.current?.postMessage({
      type: 'STOP_TIMER'
    });
  };

  return {
    timeType,
    isPaused,
    remainingTime,
    currentRepeatCount: currentRepeatCount.current,
    onStartTimer,
    onPauseResume,
    onStop,
    getToken
  };
};

export default useTimer;
