import {  IconButton, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import { makeStyles } from "@material-ui/core/styles";
 


const useStyles = makeStyles((theme) => ({
  footer: {
 
    padding: theme.spacing(4, 0),
    display: "flex", alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: " 100%",
    height: "2.5rem",
  },

}));



const Footer = () => {
  const classes = useStyles();


  return (
<>

     <footer className={classes.footer} style={{ borderTop: '1px solid #ccc'  }} >

       <Typography variant="h5" sx={{
        fontWeight: "600",
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
    </>
  );
};

export default Footer;


