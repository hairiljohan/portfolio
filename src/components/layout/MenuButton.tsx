import type { Ref } from "react";
import { Button, type ButtonProps } from "../arc/button/button";
export default function MenuButton({
  type = "button",
  ...props
}: ButtonProps & { ref?: Ref<HTMLButtonElement> }) {
  return (
    <Button
      type={type}
      variant="ghost"
      {...props}
    />
  );
}
