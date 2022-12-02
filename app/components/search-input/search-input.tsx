import styles from "./search-input.module.scss";
import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = ({ className, ...rest }: SearchInputProps) => (
  <div className={classNames(styles.wrapper, className)}>
    <input
      type="text"
      className={styles.input}
      placeholder="Введите запрос"
      maxLength={30}
      {...rest}
    />
    <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} />
  </div>
);
