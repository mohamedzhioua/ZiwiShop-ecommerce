 import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    // position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(1),
    textAlign: "center",
  },
}));

const Footer = () => {
  const classes = useStyles();
 
  return (
    <footer className={classes.footer}>
      {`Copyright © Zhioua Mohamed ${2023}`}
    </footer>
  );
};

export default Footer;
