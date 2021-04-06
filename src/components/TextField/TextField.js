import React from "react";
import { TextField as MuiTextField } from "@material-ui/core";

// import TextFieldStyled from "./TextFieldStyled";

export default function TextField({ ...props }) {
  return <MuiTextField variant="outlined" {...props} />;
};
