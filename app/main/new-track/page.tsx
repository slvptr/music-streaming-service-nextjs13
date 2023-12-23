"use client";

import mainStyles from "../main.module.scss";
import styles from "./new-track.module.scss";
import { Input } from "../../components/input";
import classNames from "classnames";
import { Button } from "../../components/button";
import { useSession } from "next-auth/react";
import { addTrack } from "../../../services/media";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!session || !session.user) return;

    const name = e.target.name.value;
    const artist = e.target.artist.value;
    const genre = e.target.genre.value;
    const cover = e.target.cover.files[0];
    const track = e.target.track.files[0];
    if (!searchParams) {
      return;
    }
    const playlistId = searchParams.get("playlistId");
    if (!playlistId) {
      console.error("playlistId is not defined");
      return;
    }

    setLoading(true);
    await addTrack({
      name: name,
      artist: artist,
      genre: genre,
      cover: cover,
      track: track,
      userId: session.user.id,
      playlistId: playlistId,
    });
    setLoading(false);

    router.push(`/main/playlist/${playlistId}`);
  };
  return (
    <div className={classNames(mainStyles.pageContainer, styles.pageContainer)}>
      <span className={styles.title}>Новый трек</span>
      <div className={styles.controlsContainer}>
        <form onSubmit={onSubmit}>
          <Input
            className={styles.control}
            placeholder="Название"
            name="name"
            required
          />
          <Input
            className={styles.control}
            placeholder="Исполнитель"
            name="artist"
            required
          />
          <Input
            className={styles.control}
            placeholder="Жанр"
            name="genre"
            required
          />

          <span className={styles.label}>Загрузите обложку (.jpg .png)</span>
          <Input
            className={styles.control}
            type="file"
            name="cover"
            required
            accept="image/png, image/jpeg"
          />

          <span className={styles.label}>Загрузите трек (.mp3)</span>
          <Input
            className={styles.control}
            type="file"
            name="track"
            required
            accept=".mp3"
          />
          <Button
            className={classNames(styles.control, styles.addTrackButton)}
            type="submit"
            isLoading={isLoading}
          >
            Загрузить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
