import React from 'react';
import { useTimer } from 'react-timer-hook';

export default function CountDownTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div style={{textAlign: 'center', border:"2px"}}>
      <div style={{fontSize: '50px'}} className="color-p-timer">
        <span>{days}<span className="font-size-days">Days</span></span><span>{hours}<span className="font-size-days">Hours</span></span><span>{minutes}</span><span className="font-size-days">min</span><span>{seconds}</span><span className="font-size-days">sec</span>
      </div>
      {/* <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button> */}
      {/* <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time)
      }}>Restart</button> */}
    </div>
  );
}