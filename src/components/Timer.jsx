import React, { useEffect, useState } from 'react';
import { format, differenceInSeconds, addMinutes } from 'date-fns';

const CountdownTimer = ({ start }) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (start) {
      const targetTime = addMinutes(new Date(), 10);

      interval = setInterval(() => {
        const now = new Date();
        const secondsRemaining = differenceInSeconds(targetTime, now);

        if (secondsRemaining <= 0) {
          clearInterval(interval);
          setRemainingTime(0);
        } else {
          setRemainingTime(secondsRemaining);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [start]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${start ? minutes : "10"} min ${start ? seconds : '00'} sec`;
  };

  return <div>{formatTime(remainingTime)}</div>;
};

export default CountdownTimer;
