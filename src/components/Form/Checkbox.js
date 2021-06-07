import React from "react";
import { useFormContext } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "../Checkbox/Checkbox";

export default function CheckboxForm({
  name,
  label,
  ...props
}) {

  const { register, formState: { errors } } = useFormContext();
  const { ref, ...methods } = register(name);

  return (
    <FormControl error={!!errors[name]}>
      <FormControlLabel
        control={
          <Checkbox
            inputRef={ref}
            name={name}
            {...methods}
            {...props}
          />
        }
        label={label}
      />
      <FormHelperText>{!!errors[name] && errors[name].message}</FormHelperText>
    </FormControl>
  );
}
