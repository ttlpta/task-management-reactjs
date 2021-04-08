import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

export default function Form({ defaultValues, children, onSubmit, schema }) {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { handleSubmit, formState: { errors } } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
    </form>
  );
}