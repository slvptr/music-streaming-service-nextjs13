import React from "react";
import classNames from "classnames";
import styles from "./button.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export const Button = ({
  className,
  children,
  isLoading = false,
  ...rest
}: ButtonProps) => {
  if (isLoading)
    return (
      <button
        className={classNames(className, styles.button)}
        {...rest}
        disabled
      >
        <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
      </button>
    );
  return (
    <button className={classNames(className, styles.button)} {...rest}>
      {children}
    </button>
  );
};
