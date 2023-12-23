import { Playlist, Track } from "../models/media";
import { v4 as uuidv4 } from "uuid";

export const getPlaylistTracks = async (
  id: string,
  pattern: string
): Promise<Track[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/playlist/${id}?pattern=${pattern}`
  );
  if (res.status !== 200) {
    return [];
  }
  return res.json();
};

export const getPlaylistInfo = async (id: string): Promise<Playlist> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/playlist/${id}/info`
  );
  return res.json();
};

export const getGlobalTracks = async (pattern: string): Promise<Track[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tracks?pattern=${pattern}`
  );
  if (res.status !== 200) {
    return [];
  }
  return res.json();
};

export const getGlobalPlaylists = async (
  pattern: string
): Promise<Playlist[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/playlists?pattern=${pattern}`
  );
  if (res.status !== 200) {
    return [];
  }
  return res.json();
};

export const deletePlaylist = async (playlistId: string) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/playlist/${playlistId}`,
    {
      method: "delete",
    }
  );
};

export const deleteTrack = async (trackId: string, playlistId: string) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/track/${trackId}?playlistId=${playlistId}`,
    {
      method: "delete",
    }
  );
};

export const addTrackToPlaylist = async ({
  playlistId,
  trackId,
}: {
  playlistId: string;
  trackId: string;
}) => {
  const params = new URLSearchParams();
  params.append("playlistId", playlistId);
  params.append("trackId", trackId);

  await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/add-track-to-playlist?${params.toString()}`
  );
};

export const addPlaylist = async ({
  name,
  description,
  cover,
  userId,
}: {
  name: string;
  description: string;
  cover: File;
  userId: string;
}) => {
  const coverId = uuidv4();

  try {
    const uploadCoverParams = new URLSearchParams();
    uploadCoverParams.append("path", "playlist-covers");
    uploadCoverParams.append("fileId", coverId);

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/upload-media?${uploadCoverParams.toString()}`,
      {
        method: "put",
        body: cover,
      }
    );

    if (!response.ok) {
      return;
    }

    const uploadInfoParams = new URLSearchParams();
    uploadInfoParams.append("name", name);
    uploadInfoParams.append("description", description);
    uploadInfoParams.append("userId", userId);
    uploadInfoParams.append("coverId", coverId);

    await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/playlist?${uploadInfoParams.toString()}`,
      {
        method: "post",
      }
    );
  } catch (error) {
    console.error(error);
  }
  return coverId;
};

export const addTrack = async ({
  name,
  artist,
  genre,
  cover,
  track,
  userId,
  playlistId,
}: {
  name: string;
  artist: string;
  genre: string;
  cover: File;
  track: File;
  userId: string;
  playlistId: string;
}) => {
  const coverId = uuidv4();
  const uploadCoverParams = new URLSearchParams();
  uploadCoverParams.append("path", "track-covers");
  uploadCoverParams.append("fileId", coverId);
  await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/upload-media?${uploadCoverParams.toString()}`,
    {
      method: "put",
      body: cover,
    }
  );

  const trackId = uuidv4();
  const uploadTrackParams = new URLSearchParams();
  uploadTrackParams.append("path", "tracks");
  uploadTrackParams.append("fileId", trackId);
  await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/upload-media?${uploadTrackParams.toString()}`,
    {
      method: "put",
      body: track,
    }
  );

  const uploadInfoParams = new URLSearchParams();
  uploadInfoParams.append("name", name);
  uploadInfoParams.append("artist", artist);
  uploadInfoParams.append("genre", genre);
  uploadInfoParams.append("coverId", coverId);
  uploadInfoParams.append("trackId", trackId);
  uploadInfoParams.append("userId", userId);
  uploadInfoParams.append("playlistId", playlistId);

  await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/track?${uploadInfoParams.toString()}`,
    {
      method: "post",
    }
  );
};
