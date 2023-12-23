"use client";

import mainStyles from "../main.module.scss";
import styles from "./add-to-playlist.module.scss";
import { Playlist } from "../../../models/media";
import { getMyPlaylists } from "../../../services/account";
import { PlaylistCard } from "../../components/playlist-card";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { addTrackToPlaylist } from "../../../services/media";
import { AppContext } from "../../../context/appState";

const Page = () => {
  const appContext = useContext(AppContext);
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  useEffect(() => {
    if (!session || !session.user) return;
    getMyPlaylists(session?.user.id, appContext.searchText).then((response) =>
      setPlaylists(response)
    );
  }, [session, appContext.searchText]);

  const handleClick = async (playlist: Playlist) => {
    const playlistId = playlist.id;
    if (!searchParams) {
      return;
    }
    const trackId = searchParams.get("trackId");
    if (!trackId) {
      return;
    }

    await addTrackToPlaylist({ playlistId: playlistId, trackId: trackId });
  };

  return (
    <div className={mainStyles.pageContainer}>
      <div className={styles.cardContainer}>
        {playlists.map((playlist) => (
          <div onClick={() => handleClick(playlist)} key={playlist.id}>
            <PlaylistCard
              title={playlist.name}
              description={playlist.description}
              coverUrl={playlist.coverUrl}
              playlistId={playlist.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
