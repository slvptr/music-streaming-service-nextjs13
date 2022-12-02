import Image from "next/image";
import styles from "./playlist-card.module.scss";
import { cutText } from "../../../utils/common";
import Link from "next/link";
import { ClassNameProps } from "../../../utils/react-types";
import classNames from "classnames";

type PlaylistCardProps = ClassNameProps & {
  title: string;
  description: string;
  coverUrl: string;
  playlistId: string;
  coverElement?: JSX.Element;
};

const titleMaxLength = 23;
const descriptionMaxLength = 28;

export const PlaylistCard = ({
  className,
  title,
  description,
  coverUrl,
  playlistId,
  coverElement,
}: PlaylistCardProps) => {
  return (
    <div className={classNames(className, styles.playlistCard)}>
      {coverElement ? (
        coverElement
      ) : (
        <Link href={`/playlist/${playlistId}`}>
          <Image
            className={styles.coverImage}
            src={coverUrl}
            alt="Playlist cover"
            width={140}
            height={140}
          />
        </Link>
      )}
      <span className={styles.title}>{cutText(title, titleMaxLength)}</span>
      <span className={styles.description}>
        {cutText(description, descriptionMaxLength)}
      </span>
    </div>
  );
};
