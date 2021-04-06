import axios from "../axios";

export const login = async body => {
  try {
    const { data, status } = await axios.post("/login", body);
    if (status !== 201) throw "Error";

    return true;
  } catch (error) {
    throw error;
  }
};
