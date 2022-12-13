import mainStyles from "../../main.module.scss";
import styles from "./playlist-page.module.scss";
import classNames from "classnames";
import { TrackCard } from "../../../components/track-card";
import { Track } from "../../../../models/media";

const getData = async (id: string): Promise<Track[]> => {
  const res = await fetch(`http://localhost:3000/api/playlist/${id}`);
  return res.json();
};

const Page = async ({ params }: { params: { id: string } }) => {
  const tracks: Track[] = await getData(params.id);

  return (
    <div className={mainStyles.pageContainer}>
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
