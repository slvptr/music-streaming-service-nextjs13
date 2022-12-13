import { NextApiRequest, NextApiResponse } from "next";
import { Playlist, Track } from "../../../models/media";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Track[]>
) {
  const { id } = req.query;

  const data: Track[] = [
    {
      title: "Окно Овертона",
      artist: "Слава КПСС, ЗАМАЙ",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/5234847/9f33fe72.a.16632681-1/200x200",
      trackUrl: "/",
    },
    {
      title: "Аскорбинка",
      artist: "МЭЙБИ БЭЙБИ",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/98892/30eb944d.a.5570088-1/200x200",
      trackUrl: "/",
    },
    {
      title: "Барбисайз",
      artist: "Дора, МЭЙБИ БЭЙБИ",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/98892/30eb944d.a.5570088-1/200x200",
      trackUrl: "/",
    },
    {
      title: "Мы из антихайпа",
      artist: "Слава КПСС, ЗАМАЙ, Валентин Дядька, Воровская лапа, MR M",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/95061/c2dff58d.a.7373101-1/50x50",
      trackUrl: "/",
    },
    {
      title: "Waltz in A Minor",
      artist: "Фридерик Шопен",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/33216/499f4141.a.2024994-1/50x50",
      trackUrl: "/",
    },
    {
      title: "Спонтанное самовозгорание",
      artist: "Oxxxymiron",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/49707/d17ba4a5.a.298230-1/50x50",
      trackUrl: "/",
    },
    {
      title: "Вечный жид",
      artist: "Oxxxymiron",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/49707/d17ba4a5.a.298230-1/50x50",
      trackUrl: "/",
    },
    {
      title: "Барбисайз",
      artist: "Дора, МЭЙБИ БЭЙБИ",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/98892/30eb944d.a.5570088-1/200x200",
      trackUrl: "/",
    },
    {
      title: "Мы из антихайпа",
      artist: "Слава КПСС, ЗАМАЙ, Валентин Дядька, Воровская лапа, MR M",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/95061/c2dff58d.a.7373101-1/50x50",
      trackUrl: "/",
    },
    {
      title: "Waltz in A Minor",
      artist: "Фридерик Шопен",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/33216/499f4141.a.2024994-1/50x50",
      trackUrl: "/",
    },
    {
      title: "Спонтанное самовозгорание",
      artist: "Oxxxymiron",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/49707/d17ba4a5.a.298230-1/50x50",
      trackUrl: "/",
    },
    {
      title: "Вечный жид",
      artist: "Oxxxymiron",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/49707/d17ba4a5.a.298230-1/50x50",
      trackUrl: "/",
    },
    {
      title: "Спонтанное самовозгорание",
      artist: "Oxxxymiron",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/49707/d17ba4a5.a.298230-1/50x50",
      trackUrl: "/",
    },
    {
      title: "Вечный жид",
      artist: "Oxxxymiron",
      coverUrl:
        "https://avatars.yandex.net/get-music-content/49707/d17ba4a5.a.298230-1/50x50",
      trackUrl: "/",
    },
  ];

  res.status(200).json(data);
}
