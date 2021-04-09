import React from "react";
import Box from "@material-ui/core/Box";
import loading from "../../assets/images/loading.gif";

export default function Loading(props) {
  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <img src={loading} alt="loading img" />
    </Box>
  );
}
