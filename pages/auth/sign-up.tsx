"use client";

import { NextPage } from "next";
import { Input } from "../../app/components/input";
import { Button } from "../../app/components/button";
import styles from "./auth.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignUp: NextPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  const register = async (e: any) => {
    e.preventDefault();

    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers,
    });

    if (response.ok) {
      setError("");
      router.push("/auth/sign-in");
    } else {
      response.json().then((body) => setError(body.message));
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>
        <form className={styles.form} method="post" onSubmit={register}>
          <h1>Регистрация</h1>
          <Input
            className={styles.formInput}
            type="text"
            name="username"
            placeholder="username"
          />
          <Input
            className={styles.formInput}
            type="password"
            name="password"
            placeholder="password"
          />

          <Link href="/auth/sign-in" className={styles.link}>
            Есть аккаунт? Войти
          </Link>

          <div className={styles.error}>{error}</div>

          <Button type="submit" className={styles.formSubmitButton}>
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
