import React, { useState } from "react";
import { TextField, Button } from "../../components";

import LoginStyled from "./LoginStyled";
import { Card } from "../../components";
export default function Login() {
  const [txt, setTxt] = useState("click");
  function handleClick() {
    setTxt("clicked");
  }

  return (
    <LoginStyled>
      <Card className="loginForm__wrapper">
        <h1>{txt}</h1>
        <TextField
          label="Username"
          fullWidth
          className="loginForm__txtField--username"
        />
        <TextField
          label="Password"
          fullWidth
          className="loginForm__txtField--pw"
        />
        <Button
          label="Submit"
          fullWidth
          color="secondary"
          className="loginForm__btn--submit"
          onClick={handleClick}
        />
      </Card>
    </LoginStyled>
  );
}
