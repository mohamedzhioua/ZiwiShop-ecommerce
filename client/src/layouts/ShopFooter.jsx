import { Box, Unstable_Grid2 as Grid, Typography } from "@mui/material";
import paypal from '../assets/cards/paypal.svg'
import visa from '../assets/cards/visa.svg'
import mastercard from '../assets/cards/mastercard.svg'
import Logo from "../components/ui/Logo";


const ShopFooter = () => {

    return (
        <Grid container spacing={4} sx={{
            marginTop: '1rem',
            marginLeft: '2rem',
            marginRight: '1rem',
            marginBottom: '1rem'
        }}>


            <Grid xs={12} md={4}>
                <Box >
                    <Logo />
                    <Box sx={{ mt: "10px" }}>
                        <Typography variant="grayText" component="p" sx={{
                            fontSize: { xs: "10.5px", md: "12px", xl: "12.5px" },
                            fontWeight: "500", lineHeight: "20px",
                        }}>
                            ZiwiShop offers trendy apparel through its user-friendly e-commerce platform, blending style, convenience, and quality for fashion enthusiasts worldwide.
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={12} md={4}>
                <Box sx={{
                    display: 'flex',
                    gap: { xs: "30px", xl: "50px" }
                }}>

                    <Box sx={{
                        display: 'flex', flexDirection: 'column', gap: '9px',
                    }}>
                        <Typography variant="body2" fontWeight={600}
                            sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                        >
                            Privacy Policy
                        </Typography>
                        <Typography variant="body2" fontWeight={600}
                            sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                        >
                            Contact Us
                        </Typography>
                        <Typography variant="body2" fontWeight={600}
                            sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                        >
                            About Us
                        </Typography>
                        <Typography variant="body2" fontWeight={600}
                            sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                        >
                            affiliates
                        </Typography>
                        <Typography variant="body2" fontWeight={600}
                            sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                        >
                            FAQs
                        </Typography>
                    </Box>

                    <Box display='flex' flexDirection='column' gap='9px'>
                        <Typography variant="body2" fontWeight={600}
                            sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                        >
                            Delivery Information
                        </Typography>
                        <Typography variant="body2" fontWeight={600}
                            sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                        >
                            Terms & Conditions
                        </Typography>
                        <Typography variant="body2" fontWeight={600}
                            sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                        >
                            Track My Order
                        </Typography>
                        <Typography variant="body2" fontWeight={600}
                            sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                        >
                            My Wishlist
                        </Typography>
                    </Box>

                    <Box display='flex' flexDirection='column' gap='9px'>
                        <Typography variant="body2" fontWeight={600}
                            sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "14px" } }}
                        >
                            My Account
                        </Typography>
                        <Typography variant="body2" fontWeight={600}
                            sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "14px" } }}
                        >
                            View Cart
                        </Typography>
                        <Typography variant="body2" fontWeight={600}
                            sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "14px" } }}
                        >
                            Help
                        </Typography>
                    </Box>

                </Box>
            </Grid>
            <Grid xs={12} md={4}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box sx={{
                        display: 'flex', alignItems: "center",
                        justifyContent: "start", gap: "7px",
                    }}>
                        <img src={paypal} alt='paypal' width='100px' height='70px' />
                        <img src={visa} alt='paypal' width='60px' height='60px' />
                        <img src={mastercard} alt='paypal' width='60px' height='60px' />
                    </Box>

                </Box>
            </Grid>

        </Grid>
    );
}

export default ShopFooter
