"use client";

import { PlaylistCard } from "../../components/playlist-card";
import { Playlist } from "../../../models/media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./my-page.module.scss";
import mainStyles from "../main.module.scss";
import Link from "next/link";
import { getMyPlaylists } from "../../../services/account";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/appState";
import { useSession } from "next-auth/react";

const Page = () => {
  const appContext = useContext(AppContext);
  const { data: session, status } = useSession();

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  useEffect(() => {
    if (!session || !session.user) return;

    getMyPlaylists(session.user.id, appContext.searchText).then((response) =>
      setPlaylists(response)
    );
  }, [appContext.searchText, session]);

  return (
    <div className={mainStyles.pageContainer}>
      <div className={styles.cardContainer}>
        <Link href="/main/new-playlist">
          <PlaylistCard
            title="Создать плейлист"
            description="Еще один отличный плейлист"
            coverUrl="/"
            playlistId={"666"}
            coverElement={
              <div className={styles.addCover}>
                <FontAwesomeIcon icon={faPlus} size="2xl" />
              </div>
            }
          />
        </Link>
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            title={playlist.name}
            description={playlist.description}
            coverUrl={playlist.coverUrl}
            playlistId={playlist.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
