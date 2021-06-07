import React from "react";
import { useFormContext } from "react-hook-form";
import TextField from "../TextField/TextField";

export default function TextFieldForm({ name, ...props }) {
  const { register, formState: { errors } } = useFormContext();
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
