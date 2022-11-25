import "../Footer/Footer.css";
const Footer = () => {
  const year = new Date().getFullYear();

  return <footer>{`Copyright © Zhioua Mohamed Code ${year}`}</footer>;
};

export default Footer;
