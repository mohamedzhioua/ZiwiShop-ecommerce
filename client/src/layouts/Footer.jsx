import { IconButton, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
  footer: {
     padding: theme.spacing(4, 0),
    display: "flex", alignItems: "center",
    justifyContent: "center",
  },

}));



const Footer = () => {
  const classes = useStyles();


  return (

    <footer className={classes.footer} >

      <Typography variant="body2" sx={{
        mt: "10px", fontSize: { xs: "11px", md: "12px", xl: "12.5px" },
        textAlign: "center", fontWeight: "600"
      }}>
        Copyright © 2023, Zhioua Mohamed
      </Typography>

      <Link to="https://github.com/mohamedzhioua" >
        <a target="_blank">
          <Tooltip title='github'>
            <IconButton color='primary'>
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </a>
      </Link>

    </footer>
  );
};

export default Footer;


