import { TrackCard } from "../../components/track-card";
import styles from "./tracks-page.module.scss";
import { Playlist } from "../../../pages/api/playlists";
import { Track } from "../../../pages/api/tracks";
import classNames from "classnames";

const getData = async (): Promise<Track[]> => {
  const res = await fetch("http://localhost:3000/api/tracks");
  return res.json();
};

const Page = async () => {
  const tracks: Track[] = await getData();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.labels}>
        <span className={styles.label}>Играть</span>
        <span className={classNames(styles.label, styles.queueLabel)}>
          В очередь
        </span>
        <span className={styles.label}>В плейлист</span>
      </div>
      <div className={styles.cardContainer}>
        {tracks.map((track) => (
          <TrackCard
            key={track.trackUrl}
            className={styles.trackCard}
            title={track.title}
            artist={track.artist}
            coverUrl={track.coverUrl}
            trackUrl={track.trackUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
