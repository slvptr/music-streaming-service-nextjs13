import { useState, useEffect } from "react";

export const useAudioPlayer = () => {
  const [duration, setDuration] = useState<number>(0);
  const [curTime, setCurTime] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState<number | null>();

  useEffect(() => {
    const audio = document.querySelector("audio") as HTMLAudioElement;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    };

    const setAudioTime = () => setCurTime(audio.currentTime);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    playing ? audio.play() : audio.pause();

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, [playing, clickedTime, curTime]);

  return {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
  };
};
