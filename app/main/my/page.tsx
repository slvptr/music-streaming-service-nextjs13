import { PlaylistCard } from "../../components/playlist-card";
import { Playlist } from "../../../pages/api/playlists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./my-page.module.scss";

const getData = async (): Promise<Playlist[]> => {
  const res = await fetch("http://localhost:3000/api/playlists");
  return res.json();
};

const Page = async () => {
  const playlists: Playlist[] = await getData();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.cardContainer}>
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
