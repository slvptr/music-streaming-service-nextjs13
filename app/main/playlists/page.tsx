import { PlaylistCard } from "../../components/playlist-card";
import { Playlist } from "../../../models/media";
import styles from "./playlists-page.module.scss";
import mainStyles from "../main.module.scss";

const getData = async (): Promise<Playlist[]> => {
  const res = await fetch("http://localhost:3000/api/playlists");
  return res.json();
};

const Page = async () => {
  const playlists: Playlist[] = await getData();

  return (
    <div className={mainStyles.pageContainer}>
      <div className={styles.cardContainer}>
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.playlistId}
            title={playlist.title}
            description={playlist.description}
            coverUrl={playlist.coverUrl}
            playlistId={playlist.playlistId}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
