"use client";

import { PlaylistCard } from "../../components/playlist-card";
import { Playlist } from "../../../models/media";
import styles from "./playlists-page.module.scss";
import mainStyles from "../main.module.scss";
import { getGlobalPlaylists } from "../../../services/media";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/appState";

const Page = () => {
  const appContext = useContext(AppContext);

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  useEffect(() => {
    getGlobalPlaylists(appContext.searchText).then((response) =>
      setPlaylists(response)
    );
  }, [appContext.searchText]);

  return (
    <div className={mainStyles.pageContainer}>
      <div className={styles.cardContainer}>
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
