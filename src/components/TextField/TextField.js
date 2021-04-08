import React from "react";
import TextFieldStyled from "./TextFieldStyled";

export default function TextField({ ...props }) {

  return <TextFieldStyled variant="outlined" {...props} />;
}
