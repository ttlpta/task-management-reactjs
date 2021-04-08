import React from "react";

import ButtonStyled from "./ButtonStyled";

export default function Button({ label, ...props }) {
  return (
    <ButtonStyled variant="outlined" {...props}>
      {label}
    </ButtonStyled>
  );
}
