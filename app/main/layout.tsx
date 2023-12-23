"use client";

import React, { useContext, useEffect } from "react";
import { Button } from "../components/button";
import styles from "./main.module.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import { SearchInput } from "../components/search-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { AppContext } from "../../context/appState";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const pathname = usePathname() as string;

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/sign-in");
    }
  }, [status]);

  const onSearchInputChange = (e: any) => {
    appContext.setSearchText(e.target.value);
  };

  return (
    <section>
      <section className={styles.controlSection}>
        <div className={styles.topBlock}>
          <Button className={styles.profileButton} onClick={() => signOut()}>
            <FontAwesomeIcon icon={faUser} />
          </Button>
          <SearchInput
            className={styles.searchInput}
            onChange={onSearchInputChange}
          />
        </div>
        <nav className={styles.navBlock}>
          <Link href={`/main/my`}>
            <Button
              className={classNames(styles.navButton, {
                [styles.activeButton]: pathname.includes("/my"),
              })}
            >
              мое
            </Button>
          </Link>
          <Link href={`/main/playlists`}>
            <Button
              className={classNames(styles.navButton, {
                [styles.activeButton]: pathname.includes("/playlists"),
              })}
            >
              плейлисты
            </Button>
          </Link>
          <Link href={`/main/tracks`}>
            <Button
              className={classNames(styles.navButton, {
                [styles.activeButton]: pathname.includes("/tracks"),
              })}
            >
              треки
            </Button>
          </Link>
        </nav>
      </section>
      {children}
    </section>
  );
};

export default MainLayout;
