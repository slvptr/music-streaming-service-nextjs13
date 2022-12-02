import { ButtonHTMLAttributes } from "react";
import { ChildProps } from "postcss";

import styles from "./button.module.scss";
import classNames from "classnames";
import { DefaultProps } from "../../../utils/react-types";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  DefaultProps & {
    variant: "primary" | "secondary";
  };

export const Button = ({
  className,
  variant,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={classNames(
        className,
        styles.button,
        { [styles.primary]: variant === "primary" },
        { [styles.secondary]: variant === "secondary" }
      )}
    >
      {children}
    </button>
  );
};
