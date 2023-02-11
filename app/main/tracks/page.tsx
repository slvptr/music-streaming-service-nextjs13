"use client";

import { TrackCard } from "../../components/track-card";
import styles from "./tracks-page.module.scss";
import { Playlist, Track } from "../../../models/media";
import classNames from "classnames";
import mainStyles from "../main.module.scss";
import { getGlobalTracks } from "../../../services/media";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/appState";

const Page = () => {
  const appContext = useContext(AppContext);

  const [tracks, setTracks] = useState<Track[]>([]);
  useEffect(() => {
    getGlobalTracks(appContext.searchText).then((response) =>
      setTracks(response)
    );
  }, [appContext.searchText]);

  return (
    <div className={mainStyles.pageContainer}>
      {tracks.length > 0 && (
        <div className={styles.labels}>
          <span className={styles.label}>Играть</span>
          <span className={classNames(styles.label, styles.queueLabel)}>
            В очередь
          </span>
          <span className={styles.label}>В плейлист</span>
        </div>
      )}
      <div className={styles.cardContainer}>
        {tracks.map((track) => (
          <TrackCard
            key={track.id}
            className={styles.trackCard}
            track={track}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
