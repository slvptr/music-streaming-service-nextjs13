import styles from "./track-controls-bar.module.scss";
import classNames from "classnames";

type TrackControlsBarProps = {
  deletable: boolean;
};

export const TrackControlsBar = ({ deletable }: TrackControlsBarProps) => {
  if (deletable)
    return (
      <div className={styles.labelsWithDelete}>
        <span className={styles.label}>Удалить</span>
        <div className={styles.rightLabels}>
          <span className={styles.label}>Играть</span>
          <span className={styles.label}>В плейлист</span>
        </div>
      </div>
    );

  return (
    <div className={styles.labelsWithoutDelete}>
      <span className={styles.label}>Играть</span>
      <span className={styles.label}>В плейлист</span>
    </div>
  );
};
