import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { login, authState, getCurrentUser } from "../../redux/slices/authSlice";
import { showAlert } from "../../redux/slices/uiSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  TextFieldForm,
  Button,
  Card,
  Form,
  CheckboxForm,
} from "../../components";
import { LoginSchema } from "../../schemas";
import LoginStyled from "./LoginStyled";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const handleSubmit = async (data) => {
    try {
      const result = await dispatch(login(data));
      unwrapResult(result);
      dispatch(getCurrentUser());
      const { from } =
        location.state && location.state.from.pathname !== "/logout"
          ? location.state
          : {
              from: { pathname: "/" },
            };

      
      history.replace(from);
    } catch (error) {
      dispatch(
        showAlert({
          show: true,
          message: error.message,
          type: "error",
        })
      );
    }
  };

  const auth = useSelector(authState);

  return (
    <LoginStyled>
      <Card className="loginForm__wrapper">
        <Form
          onSubmit={handleSubmit}
          schema={LoginSchema}
          loading={auth.status === "loading"}
        >
          <TextFieldForm
            name="username"
            label="Username"
            fullWidth
            className="loginForm__txtField--username"
          />
          <TextFieldForm
            type="password"
            name="password"
            label="Password"
            fullWidth
            className="loginForm__txtField--pw"
          />
          <CheckboxForm label="Remember me" name="isRememberMe" />
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
