export type Playlist = {
  name: string;
  description: string;
  coverUrl: string;
  id: string;
  userId: string;
};

export type Artist = {
  name: string;
};

export type Genre = {
  name: string;
};

export type Track = {
  id: string;
  userId: string;
  name: string;
  artists: Artist[];
  genres: Genre[];
  coverUrl: string;
  trackUrl: string;
};
