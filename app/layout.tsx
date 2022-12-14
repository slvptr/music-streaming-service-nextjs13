"use client";

import React from "react";
import "../styles/globals.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import styles from "./root.module.scss";
import { Player } from "./components/player";
import { SessionProvider } from "next-auth/react";

config.autoAddCss = false;

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body className={styles.rootLayout}>
      <section className={styles.contentLayout}>
        <SessionProvider>{children}</SessionProvider>
      </section>
      <Player />
    </body>
  </html>
);

export default RootLayout;
