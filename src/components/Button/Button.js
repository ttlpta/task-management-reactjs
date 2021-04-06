import React from "react";
import { Button as MuiButton } from "@material-ui/core";

import ButtonStyled from "./ButtonStyled";

export default function Button({ boxprops, label, ...props }) {
  return (
    <MuiButton variant="outlined" {...props}>
      {label}
    </MuiButton>
  );
}
