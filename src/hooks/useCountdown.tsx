import { useState, useEffect } from "react";

const useCountdown = (initialSeconds: number, trigger: number): string => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds); // Reset the countdown whenever `trigger` changes
  }, [trigger, initialSeconds]);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  // Format the seconds into "MM:SS"
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  return formattedTime;
};

export default useCountdown;
