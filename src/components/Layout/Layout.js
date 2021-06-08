import React from "react";
import { useDispatch } from "react-redux";
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
import UserInfo from "./UserInfo";

function Layout(props) {
  const dispatch = useDispatch();

  const handleClickMenu = () => dispatch(toggleDrawer());
  const logout = () => dispatch(logoutAction())

  console.log('layout render');
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
          <Box display="flex" alignItems="center">
            <Box mr="10px">
              <UserInfo />
            </Box>
            <Button color="inherit" onClick={logout} variant="outlined" size="small">Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer />
      <Box className="app__body">{props.children}</Box>
    </LayoutStyled>
  );
}

export default React.memo(Layout);
