import React from "react";
 
const Footer = () => {
  
  const year = new Date().getFullYear();

  return <footer>{`Copyright © Zhioua Mohamed Code ${year}`}</footer>;
};


export default Footer;