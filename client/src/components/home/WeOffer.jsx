import { Box,  Card,  Unstable_Grid2 as Grid, Typography } from "@mui/material";
import dollar from "../../assets/weoffer/dollar.svg"
import smiling from "../../assets/weoffer/smiling.svg"
import box from "../../assets/weoffer/box.svg"
import delivery from "../../assets/weoffer/delivery.svg"

const WeOffer = () => {

    const offerContent = [
        {
            id: 1,
            name: "dollar",
            path: dollar,
            title: "Orginal Products",
            descriptions: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        },
        {
            id: 2,
            name: "smiling",
            path: smiling,
            title: "Satisfaction Guarantee",
            descriptions: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        },
        {
            id: 3,
            name: "openBox",
            path: box,
            title: "New Arrival Everyday",
            descriptions: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        },
        {
            id: 4,
            name: "delivery",
            path: delivery,
            title: "Fast & Free Shipping",
            descriptions: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        },
    ];

    return (
        <Box sx={{
            maxWidth: '1576px', m: 'auto', px: { xs: "20px", xl: "40px" },
            mt: { xs: "0px", md: "100px" }
        }}>


            <Box sx={{
                display: "flex", alignItems: "center",
                justifyContent: "left", gap: { xl: "50px" },
                mt: "50px", height: { md: "90px" },
                pl: "10px", mb: "40px",
            }}>

                <Box sx={{
                    height: "100%", width: "100%"
                }}>

                    <Typography variant="h4" component="h3" sx={{
                        fontWeight: "600", fontSize: { xs: "22px", md: "32px" }
                    }}>
                        We provide best
                    </Typography>
                    <Typography variant="h4" component="h3" sx={{
                        fontWeight: "600", fontSize: { xs: "22px", md: "32px" },
                        borderBottom: { xs: "1px solid #6c757d", md: "none" },
                        pb: { xs: "10px", md: "0px" }
                    }}>
                        customer experience
                    </Typography>

                </Box>

                <Box sx={{
                    borderLeft: "2px solid", height: "80%", pl: "15px",
                    width: { md: "80%", xl: "100%", },
                    display: { xs: "none", md: "flex" }, alignItems: "center"
                }}>
                    <Typography>
                        We ensure our customers have the best shopping experince.
                    </Typography>
                </Box>

            </Box>


            <Grid container spacing={5}>

                {offerContent.map(item =>

                    <Grid item xs={12} md={6} xl={3} key={item.id}>

                        <Card key={item.id} sx={{
                             p: "15px",
                            width: { xs: "290px", md: "340px", xl: "270px" },
                         }}>


                            <Box sx={{
                                width: "45px", height: "45px", borderRadius: "5px",
                                backgroundColor: "#ced4da",
                                display: "flex", alignItems: "center",
                                justifyContent: "center", mb: "15px"
                            }}>
                                <img src={item.path} alt={item.name}
                                    width={25} height={25} />
                            </Box>

                            <Typography variant="h5" sx={{
                                cursor: "default", fontWeight: "600",
                                fontSize: { xs: "12px", md: "13px" },
                                mb: "2px"
                            }}>
                                {item.title}
                            </Typography>


                            <Box>
                                <Typography variant="grayText" sx={{
                                    cursor: "default",
                                    fontSize: { xs: "11px", md: "11px" },
                                }}>
                                    {item.descriptions}
                                </Typography>
                            </Box>

                        </Card>
                    </Grid>

                )}

            </Grid>


        </Box>
    );
}

export default WeOffer;