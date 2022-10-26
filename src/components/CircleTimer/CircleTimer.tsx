import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CircleTimer = ({ timer }: { timer: number }) => {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={timer ? timer : 0}
      colors={["#00EAD9", "#00EAD9"]}
      colorsTime={[timer, 0]}
      strokeLinecap="square"
      trailStrokeWidth={4}
      trailColor="#fff"
      strokeWidth={4}
      size={120}
    >
      {({ remainingTime }) => (
        <div className="text-2xl">
          {`${Math.floor(remainingTime / 60)}:${
            Math.floor(remainingTime % 60) === 0
              ? "00"
              : Math.floor(remainingTime % 60) < 10
              ? `0${Math.floor(remainingTime % 60)}`
              : Math.floor(remainingTime % 60)
          }`}
        </div>
      )}
    </CountdownCircleTimer>
  );
};

export default CircleTimer;
