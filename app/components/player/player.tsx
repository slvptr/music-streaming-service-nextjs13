"use client";

import styles from "./player.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faRepeat,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/appState";
import { cutText } from "../../../utils/common";
import { useAudioPlayer } from "../../../hooks/useAudioPlayer";
import { PlayerBar } from "./player-bar";

export const Player = () => {
  const appContext = useContext(AppContext);
  const { curTime, duration, playing, setPlaying, setClickedTime } =
    useAudioPlayer();

  useEffect(() => {
    setPlaying(appContext.currentTrack.playing);
  }, [appContext.currentTrack.playing]);

  const trackTitle = cutText(
    `${appContext.currentTrack.artist} \u2012\ ${appContext.currentTrack.name}`,
    40
  );

  const onPlayClick = () => {
    appContext.setCurrentTrack({
      ...appContext.currentTrack,
      playing: !appContext.currentTrack.playing,
    });
  };

  return (
    <section className={styles.playerLayout}>
      <audio src={appContext.currentTrack.trackUrl} />

      <PlayerBar
        curTime={curTime}
        duration={duration}
        onTimeUpdate={(time) => setClickedTime(time)}
      />
      <div className={styles.controlsBar}>
        <div
          className={classNames(styles.controlWrapper, styles.playWrapper)}
          onClick={onPlayClick}
        >
          {appContext.currentTrack.playing ? (
            <FontAwesomeIcon
              icon={faPause}
              className={styles.pauseIcon}
              size="2xl"
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlay}
              className={styles.playIcon}
              size="xl"
            />
          )}
        </div>
        <div className={styles.titleWrapper}>
          <span>
            {appContext.currentTrack.artist && appContext.currentTrack.name ? (
              <span>{trackTitle}</span>
            ) : (
              <span>Трек</span>
            )}
          </span>
        </div>
      </div>
    </section>
  );
};
