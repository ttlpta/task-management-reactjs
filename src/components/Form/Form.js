import React from "react";
import FormStyled from "./FormStyled";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from "@material-ui/core";
import { Spinner } from "..";

export default function Form({ 
  defaultValues, 
  children, 
  onSubmit, 
  schema, 
  loading
}) {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { handleSubmit } = methods;
  
  return (
    <FormProvider {...methods}>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        {
          loading && (<Box className="loading"><Spinner /></Box>)
        }
        {children}
      </FormStyled>
    </FormProvider>
  );
}