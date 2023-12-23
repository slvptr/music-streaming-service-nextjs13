import { User } from "../models/account";
import { Playlist } from "../models/media";

export const getMyPlaylists = async (
  userId: string,
  pattern: string
): Promise<Playlist[]> => {
  const params = new URLSearchParams();
  params.append("userId", userId);
  params.append("pattern", pattern);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/my?${params.toString()}`
  );
  if (res.status !== 200) {
    return [];
  }
  return res.json();
};
