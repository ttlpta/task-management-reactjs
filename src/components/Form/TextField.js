import React from "react";
import TextField from "../TextField/TextField";

export default function TextFieldForm({ register, name, errors, ...props }) {
  const { ref, ...methods } = register(name);

  return (
    <TextField
      helperText={!!errors[name] && errors[name].message}
      inputRef={ref}
      error={!!errors[name]}
      variant="outlined"
      {...methods}
      {...props}
    />
  );
}
