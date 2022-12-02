import { InputHTMLAttributes } from "react";
import styles from "./input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {};

export const Input = ({ ...rest }: InputProps) => {
  return <input className={styles.input} {...rest} />;
};
