import React, { useState, useEffect } from 'react';
import './sprint.scss';
import { TimerParam } from '../../types';

export default function Timer({ time, onTimeUp }: TimerParam) {
  const [timeLeft, setTimeLeft] = useState(time);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((currentTime: number) => {
        if (!currentTime) {
          clearInterval(interval);
          onTimeUp();
          return currentTime;
        }
        return currentTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="timer">
      {timeLeft}
    </div>
  );
}
