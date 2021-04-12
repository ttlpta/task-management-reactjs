import axios from "../axios";

export const login = async body => {
  const res = await axios.post("/auth/login", body);

  return res;
};
