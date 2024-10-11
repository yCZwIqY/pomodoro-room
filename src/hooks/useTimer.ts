import { useState, useRef, useCallback } from 'react';

export interface TimerFormData {
  focusTime: number;
  restTime: number;
  repeatCount: number;
}

type TimeType = 'NONE' | 'FOCUS' | 'REST';

const useTimer = (onCompleteRoutine: (token: number) => void) => {
  const timeType = useRef<TimeType>('NONE');
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const focusTime = useRef(0);
  const restTime = useRef(0);
  const repeatCount = useRef(0);
  const currentRepeatCount = useRef(0);
  const intervalRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const endTimeRef = useRef<number>(0);

  const getToken = useCallback(() => {
    const baseToken = 2;
    const focusTimeBonus = 0.05 * focusTime.current;
    const repeatBonus = 2 * repeatCount.current;
    return Math.floor(baseToken + focusTimeBonus + repeatBonus);
  }, []);

  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const timeLeft = Math.round((endTimeRef.current - now) / 1000);
      if (timeLeft <= 0) {
        clearInterval(intervalRef.current!);
        if (timeType.current === 'FOCUS') {
          onStartRest();
        } else if (timeType.current === 'REST') {
          currentRepeatCount.current++;
          if (currentRepeatCount.current >= repeatCount.current) {
            const token = getToken();
            timeType.current = 'NONE'
            onCompleteRoutine(token);
          } else {
            onStartFocus();
          }
        }
      } else {
        setRemainingTime(timeLeft);
      }
    }, 1000);
  }, [timeType.current, onCompleteRoutine, getToken]);

  const onStartTimer = useCallback((data: TimerFormData) => {
    focusTime.current = data.focusTime;
    restTime.current = data.restTime;
    repeatCount.current = data.repeatCount;
    currentRepeatCount.current = 0;
    onStartFocus();
  }, []);

  const onStartFocus = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    timeType.current = 'FOCUS';
    const duration = focusTime.current * 60;
    startTimeRef.current = Date.now();
    endTimeRef.current = startTimeRef.current + duration * 1000;
    setRemainingTime(duration);
    startTimer();
  }, [startTimer]);

  const onStartRest = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    timeType.current = 'REST';
    const duration = restTime.current * 60;
    startTimeRef.current = Date.now();
    endTimeRef.current = startTimeRef.current + duration * 1000;
    setRemainingTime(duration);
    startTimer();
  }, [startTimer]);

  const onPauseResume = useCallback(() => {
    if (isPaused) {
      const now = Date.now();
      const timeLeft = Math.round((endTimeRef.current - now) / 1000);
      endTimeRef.current = now + timeLeft * 1000;
      setIsPaused(false);
      startTimer();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsPaused(true);
    }
  }, [isPaused, startTimer]);

  const onStop = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
    timeType.current = 'NONE'
  }, []);

  return {
    timeType: timeType.current,
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
