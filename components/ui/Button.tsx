import { ReactNode } from "react";
import Link from "next/link";

import classes from "./Button.module.css";

interface ButtonProps {
  link?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export const Button = ({ link, children, onClick }: ButtonProps) => {
  if (link) {
    return (
      <Link className={classes.btn} href={link}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={classes.btn} onClick={onClick}>
        {children}
      </button>
    );
  }
};
