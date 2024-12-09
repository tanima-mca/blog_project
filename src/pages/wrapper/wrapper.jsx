import React, { useEffect } from "react";
import Header from "../header/header";


export default function Wrapper({ children }) {
  return (
    <>
   
     <Header/>
      {children}
      
    </>
  );
}