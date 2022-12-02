import { getCsrfToken } from "next-auth/react";
import { GetServerSideProps, NextPage } from "next";
import styles from "./sign-in.module.scss";
import { Input } from "../components/input";
import { Button } from "../components/button";

type SignInPageProps = {
  csrfToken: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
};

const SignIn: NextPage<SignInPageProps> = ({ csrfToken }) => {
  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>
        <form
          className={styles.form}
          method="post"
          action="/api/auth/signin/email"
        >
          <h1>Вход</h1>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="email@example.com"
          />
          <Button
            type="submit"
            className={styles.formSubmitButton}
            variant="primary"
          >
            Войти через Email
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
