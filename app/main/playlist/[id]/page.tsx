"use client";

import mainStyles from "../../main.module.scss";
import styles from "./playlist-page.module.scss";
import classNames from "classnames";
import { TrackCard } from "../../../components/track-card";
import { Playlist, Track } from "../../../../models/media";
import { cookies } from "next/headers";
import { Button } from "../../../components/button";
import Link from "next/link";
import {
  deletePlaylist,
  deleteTrack,
  getPlaylistInfo,
  getPlaylistTracks,
} from "../../../../services/media";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../context/appState";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TrackControlsBar } from "../../../components/track-controls-bar";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const { data: session, status } = useSession();

  const [tracks, setTracks] = useState<Track[]>([]);
  useEffect(() => {
    getPlaylistTracks(params.id, appContext.searchText).then((response) =>
      setTracks(response)
    );
  }, [appContext, params.id]);

  const [playlist, setPlaylist] = useState<Playlist>();
  useEffect(() => {
    getPlaylistInfo(params.id).then((response) => setPlaylist(response));
  }, [params.id]);

  const onDeletePlaylistClick = async () => {
    await deletePlaylist(params.id);
    router.push("/main/my");
  };

  const handleDeleteTrackClick = async (trackId: string) => {
    await deleteTrack(trackId, params.id);
    getPlaylistTracks(params.id, appContext.searchText).then((response) =>
      setTracks(response)
    );
  };

  const deletable: boolean =
    session?.user !== null &&
    playlist != null &&
    session?.user?.id === playlist.userId;

  return (
    <div className={mainStyles.pageContainer}>
      {tracks.length > 0 && deletable && <TrackControlsBar deletable={true} />}
      {tracks.length > 0 && !deletable && (
        <TrackControlsBar deletable={false} />
      )}
      <div className={styles.cardContainer}>
        {tracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            handleDeleteTrack={handleDeleteTrackClick}
            className={styles.trackCard}
            deletable={deletable}
          />
        ))}
        {playlist &&
          session &&
          session.user &&
          session.user.id === playlist.userId && (
            <div className={styles.buttonsBar}>
              <Link href={`/main/new-track?playlistId=${params.id}`}>
                <Button className={styles.addTrackButton}>
                  Загрузить трек
                </Button>
              </Link>
              <Button
                className={styles.deletePlaylistButton}
                onClick={onDeletePlaylistClick}
              >
                Удалить плейлист
              </Button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Page;
