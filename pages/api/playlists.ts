import type { NextApiRequest, NextApiResponse } from "next";

export type Playlist = {
  title: string;
  description: string;
  coverUrl: string;
  playlistId: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Playlist[]>
) {
  const data: Playlist[] = [
    {
      title: "ANTIHYPETRAIN",
      description: "Слава КПСС, ЗАМАЙ",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/5234847/9f33fe72.a.16632681-1/200x200",
      playlistId: "1",
    },
    {
      title: "Дора дура",
      description: "Дора",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/2266607/25bb0801.a.8888246-1/200x200",
      playlistId: "2",
    },
    {
      title: "Вечный жид",
      description: "Oxxxymiron",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/49707/d17ba4a5.a.298230-1/200x200",
      playlistId: "3",
    },
    {
      title: "ANTIHYPETRAIN",
      description: "Слава КПСС, ЗАМАЙ",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/5234847/9f33fe72.a.16632681-1/200x200",
      playlistId: "4",
    },
    {
      title: "Дора дура",
      description: "Дора",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/2266607/25bb0801.a.8888246-1/200x200",
      playlistId: "5",
    },
    {
      title: "Вечный жид",
      description: "Oxxxymiron",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/49707/d17ba4a5.a.298230-1/200x200",
      playlistId: "6",
    },
    {
      title: "ANTIHYPETRAIN",
      description: "Слава КПСС, ЗАМАЙ",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/5234847/9f33fe72.a.16632681-1/200x200",
      playlistId: "7",
    },
    {
      title: "Дора дура",
      description: "Дора",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/2266607/25bb0801.a.8888246-1/200x200",
      playlistId: "8",
    },
    {
      title: "Вечный жид",
      description: "Oxxxymiron",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/49707/d17ba4a5.a.298230-1/200x200",
      playlistId: "9",
    },
    {
      title: "ANTIHYPETRAIN",
      description: "Слава КПСС, ЗАМАЙ",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/5234847/9f33fe72.a.16632681-1/200x200",
      playlistId: "10",
    },
    {
      title: "Дора дура",
      description: "Дора",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/2266607/25bb0801.a.8888246-1/200x200",
      playlistId: "11",
    },
    {
      title: "Вечный жид",
      description: "Oxxxymiron",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/49707/d17ba4a5.a.298230-1/200x200",
      playlistId: "12",
    },
  ];

  res.status(200).json(data);
}
