import React from "react";
import CardStyled from "./CardStyled";

export default function Card({children, ...props}) {
  
  return (
    <CardStyled variant="outlined" {...props}>
      {children}
    </CardStyled>
  );
}

