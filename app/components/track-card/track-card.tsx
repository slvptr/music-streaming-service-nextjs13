import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./track-card.module.scss";
import { cutText } from "../../../utils/common";
import { ClassNameProps } from "../../../utils/react-types";
import classNames from "classnames";

type TrackCardProps = ClassNameProps & {
  title: string;
  artist: string;
  coverUrl: string;
  trackUrl: string;
};

const titleMaxLength = 19;
const artistMaxLength = 22;

export const TrackCard = ({
  className,
  title,
  artist,
  coverUrl,
  trackUrl,
}: TrackCardProps) => {
  return (
    <div className={classNames(className, styles.trackCard)}>
      <div className={styles.overviewContainer}>
        <Image
          className={styles.cover}
          width={50}
          height={50}
          src={coverUrl}
          alt="Track cover"
        />
        <div className={styles.descriptionContainer}>
          <span className={styles.title}>{cutText(title, titleMaxLength)}</span>
          <span className={styles.artist}>
            {cutText(artist, artistMaxLength)}
          </span>
        </div>
      </div>

      <div className={styles.iconsContainer}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faPlay} width={50} />
        </div>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faBars} width={50} />
        </div>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faPlus} width={50} />
        </div>
      </div>
    </div>
  );
};
