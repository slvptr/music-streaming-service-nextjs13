"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBars,
  faPlus,
  faPause,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./track-card.module.scss";
import { cutText } from "../../../utils/common";
import { ClassNameProps } from "../../../utils/react-types";
import classNames from "classnames";
import { useContext } from "react";
import { AppContext } from "../../../context/appState";
import Link from "next/link";
import { Track } from "../../../models/media";

type TrackCardProps = ClassNameProps & {
  track: Track;
  handleDeleteTrack?: (trackId: string) => void;
  deletable?: boolean;
};

const titleMaxLength = 19;
const artistMaxLength = 22;

export const TrackCard = ({
  className,
  track,
  handleDeleteTrack,
  deletable = false,
}: TrackCardProps) => {
  const appContext = useContext(AppContext);

  const onPlayClick = () => {
    const playing =
      appContext.currentTrack.trackUrl === track.trackUrl
        ? appContext.currentTrack.playing
        : false;
    appContext.setCurrentTrack({
      name: track.name,
      artist: track.artists.map(({ name }) => name).join(),
      trackUrl: track.trackUrl,
      playing: !playing,
    });
  };

  const onDeleteClick = () => {
    if (handleDeleteTrack) handleDeleteTrack(track.id);
  };

  return (
    <div className={classNames(className, styles.trackCard)}>
      <div className={styles.overviewContainer}>
        {deletable ? (
          <div className={styles.coverWithIconWrapper}>
            <div
              className={classNames(
                styles.iconWrapper,
                styles.deleteIconWrapper
              )}
              onClick={onDeleteClick}
            >
              <FontAwesomeIcon
                className={styles.deleteIcon}
                icon={faTrash}
                width={50}
                height={50}
              />
            </div>
            <Image
              className={classNames(styles.cover, styles.coverWithIcon)}
              width={50}
              height={50}
              src={track.coverUrl}
              alt="Track cover"
            />
          </div>
        ) : (
          <Image
            className={styles.cover}
            width={50}
            height={50}
            src={track.coverUrl}
            alt="Track cover"
          />
        )}
        <div className={styles.descriptionContainer}>
          <span className={styles.title}>
            {cutText(track.name, titleMaxLength)}
          </span>
          <span className={styles.artist}>
            {cutText(
              track.artists.map(({ name }) => name).join(),
              artistMaxLength
            )}
          </span>
        </div>
      </div>

      <div className={styles.iconsContainer}>
        <div className={styles.iconWrapper} onClick={onPlayClick}>
          {appContext.currentTrack.trackUrl === track.trackUrl &&
          appContext.currentTrack.playing ? (
            <FontAwesomeIcon icon={faPause} width={50} />
          ) : (
            <FontAwesomeIcon icon={faPlay} width={50} />
          )}
        </div>
        <Link href={`/main/add-to-playlist?trackId=${track.id}`}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faPlus} width={50} />
          </div>
        </Link>
      </div>
    </div>
  );
};
