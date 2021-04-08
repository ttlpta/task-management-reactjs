import React from "react";
import { TextFieldForm, Button, Card, Form } from "../../components";
import { LoginSchema } from "../../schemas";

import LoginStyled from "./LoginStyled";
export default function Login() {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <LoginStyled>
      <Card className="loginForm__wrapper">
        <Form onSubmit={handleSubmit} schema={LoginSchema}>
          <TextFieldForm
            name="username"
            label="Username"
            fullWidth
            className="loginForm__txtField--username"
          />
          <TextFieldForm
            name="password"
            label="Password"
            fullWidth
            className="loginForm__txtField--pw"
          />
          <Button
            label="Submit"
            fullWidth
            type="submit"
            color="secondary"
            className="loginForm__btn--submit"
          />
        </Form>
      </Card>
    </LoginStyled>
  );
}
