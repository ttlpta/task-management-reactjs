import axios from "../axios";

export const login = async body => {
  const { data, status } = await axios.post("/auth/login", body);

  console.log(data, status);
};
