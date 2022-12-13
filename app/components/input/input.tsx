import { InputHTMLAttributes } from "react";
import styles from "./input.module.scss";
import classNames from "classnames";
import { ClassNameProps } from "../../../utils/react-types";

type InputProps = InputHTMLAttributes<HTMLInputElement> & ClassNameProps;

export const Input = ({ className, ...rest }: InputProps) => {
  return <input className={classNames(className, styles.input)} {...rest} />;
};
