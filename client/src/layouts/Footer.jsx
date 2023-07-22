 import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
     bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

const Footer = () => {
  const classes = useStyles();
 
  return (
    <footer className={classes.footer}>
      {`Copyright © Zhioua Mohamed ${2023} `} 
    </footer>
  );
};

export default Footer;
 


 