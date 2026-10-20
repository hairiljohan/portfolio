import type { ComponentPropsWithRef } from "react";
import styles from "./MenuButton.module.css";
export default function MenuButton({
  className = "",
  type = "button",
  ...props
}: ComponentPropsWithRef<"button">) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      {...props}
    />
  );
}
