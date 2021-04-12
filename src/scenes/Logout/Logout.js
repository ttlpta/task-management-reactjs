import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { logout as logoutAction } from "../../redux/slices/authSlice";

export default function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutAction());
  }, []);

  return null;
}
