
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <Typography
            component={Link}
            variant="h3"
            color='#998e76'
            to="/"
            fontWeight={700}
            fontFamily={"Dancing Script"}
            sx={{
                cursor: "pointer",
                  textDecoration: 'none',
              }}
        >
            ZiwiShop
        </Typography>
    );
}

export default Logo;  