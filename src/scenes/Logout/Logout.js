import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { logout as logoutAction } from "../../redux/slices/authSlice";

export default function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutAction());
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
