import {
    Box, 
    Divider, 
    TextField, Typography
} from "@mui/material";
import CustomButton from "../ui/CustomButton";
import { Link } from "react-router-dom";
import { Stack } from "@mui/system";
import useTheme from "../../hooks/useTheme";

const JoinUs = () => {
    const { theme } = useTheme();

    return (
        <>
         
        <Box sx={{
            maxWidth: '750px', m: 'auto', px: { xs: "20px", xl: "40px" },
            mt: "100px"
        }}>

            <Stack  spacing={2} sx={{
                display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column"
            }}>

                 <Typography variant="h2" sx={{
                    fontWeight: "600",
                    mb: "10px", textAlign: "center",
                 }}>
                    Subscribe our newsletter to get updates to our latest collections
                </Typography>

                 <Typography  variant="h5"  sx={{
                    mb: "15px", fontWeight: "500", textAlign: "center",
                 }}>
                    Get 20% off on your first order just by subscribing to our newsletter!
                </Typography>

                 <Box sx={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "3px", mb: "5px"
                }}>

                    <Box>
                        <TextField id="outlined-basic" label="Email Address"
                            variant="outlined" size="small"
                            InputLabelProps={{ style: { fontSize: "13px" } }}
                        />
                    </Box>

                    <CustomButton variant='contained'  >

                       
                            Subscribe
 
                    </CustomButton>

                </Box>

                 <Typography variant="h5"  sx={{
                    width: "300px", textAlign: "center",
                    wordSpacing: "0.5px"
                }}>
                    You will be able to unsubscribe at any time.
                    Read our Privacy Policy
                    <Link to="https://github.com/mohamedzhioua" style={{ marginLeft: "3px", color: "#8d99ae" }}>
                        here
                    </Link>
                </Typography>

            </Stack>

        </Box>
        <Divider sx={{ my: 2, borderColor: theme.palette.primary.main }} />
        </>
    );
}

export default JoinUs;