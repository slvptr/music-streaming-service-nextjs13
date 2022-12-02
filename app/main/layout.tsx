"use client";

import React from "react";
import { Button } from "../components/button";
import styles from "./main.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { SearchInput } from "../components/search-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { signIn, useSession } from "next-auth/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, status } = useSession();
  if (status === "unauthenticated") signIn();

  const pathname = usePathname();

  return (
    <section>
      <section className={styles.controlSection}>
        <div className={styles.topBlock}>
          <Button className={styles.profileButton}>
            <FontAwesomeIcon icon={faUser} />
          </Button>
          <SearchInput className={styles.searchInput} />
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
