import { clsx } from "clsx";
import { InputLeftAddonProps } from "./types";
import { inputLeftAddonStyle } from "./style.css";
import { vars } from "@fastcampus/themes";
import * as React from "react";

const InputLeftAddon = (props: InputLeftAddonProps) => {
  const { size = "md", color = "gray", children } = props;

  return (
    <div
      className={clsx([
        inputLeftAddonStyle({
          size,
        }),
      ])}
      style={{
        color: vars.colors.$scale[color][900],
      }}
    >
      {children}
    </div>
  );
};

InputLeftAddon.displayName = "InputLeftAddon";
export { InputLeftAddon };
