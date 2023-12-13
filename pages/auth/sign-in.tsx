"use client";

import styles from "./auth.module.scss";
import { Input } from "../../app/components/input";
import { Button } from "../../app/components/button";
import "../../styles/globals.scss";
import { signIn } from "next-auth/react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignIn: NextPage = () => {
  const router = useRouter();

  const login = async (e: any) => {
    e.preventDefault();

    await signIn("credentials", {
      username: e.target.username.value,
      password: e.target.password.value,
      redirect: false,
    });

    router.push("/main/playlists");
  };

  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>
        <form className={styles.form} method="post" onSubmit={login}>
          <h1>Вход</h1>
          <Input
            className={styles.formInput}
            type="text"
            name="username"
            placeholder="username"
            required
          />
          <Input
            className={styles.formInput}
            type="password"
            name="password"
            placeholder="password"
            required
          />
          <Link href="/auth/sign-up" className={styles.link}>
            Нет аккаунта? Зарегистрироваться
          </Link>
          <Button type="submit" className={styles.formSubmitButton}>
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
