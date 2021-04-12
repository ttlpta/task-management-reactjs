import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LayoutStyled from "./LayoutStyled";
import Drawer from "../Drawer/Drawer";

import { toggleDrawer } from "../../redux/slices/uiSlice";
import { logout as logoutAction } from "../../redux/slices/authSlice";

function Layout(props) {
  const dispatch = useDispatch();
  const handleClickMenu = () => {
    dispatch(toggleDrawer());
  };

  const logout = () => {
    dispatch(logoutAction());
  }

  return (
    <LayoutStyled>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClickMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="app__title">
            {props.title}
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer />
      <Box className="app__body">{props.children}</Box>
    </LayoutStyled>
  );
}

export default React.memo(Layout);
