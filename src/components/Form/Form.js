import React from "react";
import FormStyled from "./FormStyled";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from "@material-ui/core";
import { Spinner } from "..";

export default function Form({ defaultValues, children, onSubmit, schema, loading }) {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { handleSubmit, formState: { errors } } = methods;
  
  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      {
        loading && (<Box className="loading"><Spinner /></Box>)
      }
      {React.Children.map(children, child => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                errors,
                key: child.props.name
              }
            })
          : child;
       })}
    </FormStyled>
  );
}