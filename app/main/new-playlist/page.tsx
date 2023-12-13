"use client";

import mainStyles from "../main.module.scss";
import styles from "./new-playlist.module.scss";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addPlaylist } from "../../../services/media";
import { useState } from "react";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!session || !session.user) return;

    const name = e.target.name.value;
    const description = e.target.description.value;
    const cover = e.target.cover.files[0];

    setLoading(true);
    await addPlaylist({
      name: name,
      cover: cover,
      description: description,
      userId: session.user.id,
    });
    setLoading(false);

    router.push("/main/my");
  };

  return (
    <div className={classNames(mainStyles.pageContainer, styles.pageContainer)}>
      <span className={styles.title}>Новый плейлист</span>
      <div className={styles.controlsContainer}>
        <form onSubmit={onSubmit}>
          <Input
            className={styles.control}
            placeholder="Имя"
            name="name"
            required
          />
          <Input
            className={styles.control}
            placeholder="Описание"
            name="description"
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
          <Button
            className={classNames(styles.control, styles.addPlaylistButton)}
            type="submit"
            isLoading={isLoading}
          >
            Создать
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
