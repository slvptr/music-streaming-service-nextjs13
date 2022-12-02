import React from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, children, ...rest }: ButtonProps) => (
  <button className={classNames(className, styles.button)} {...rest}>
    {children}
  </button>
);
