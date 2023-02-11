import React, { FC, useState } from "react";

type CurrentTrack = {
  name: string;
  artist: string;
  trackUrl: string;
  playing: boolean;
};

const defaultTrack: CurrentTrack = {
  name: "Без названия",
  artist: "Исполнитель",
  trackUrl: "/",
  playing: false,
};

export const AppContext = React.createContext({
  currentTrack: defaultTrack,
  setCurrentTrack: (track: CurrentTrack) => {},
  searchText: "",
  setSearchText: (text: string) => {},
});

type AppContextProps = {
  children: React.ReactNode;
};

export const AppProvider: FC<AppContextProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(defaultTrack);
  const [searchText, setSearchText] = useState("");

  return (
    <AppContext.Provider
      value={{
        currentTrack: currentTrack,
        setCurrentTrack: setCurrentTrack,
        searchText: searchText,
        setSearchText: setSearchText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
