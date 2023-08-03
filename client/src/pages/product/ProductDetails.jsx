import { Box, Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProduct"
import ImageSection from "../../components/Product/ProductDetails/ImageSection";
import ActionSection from "../../components/Product/ProductDetails/ActionSection";
import InformationSection from "../../components/Product/ProductDetails/InformationSection";
 import { Link as RouterLink } from 'react-router-dom';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import Splash from "../../components/ui/Splash";

const ProductDetails = () => {

    const { id } = useParams();
    const product = useProduct(id);
    const [selectedImage, setSelectedImage] = useState('');


    useEffect(() => {
        setSelectedImage(product?.images[0])
    }, [product]);

    if (!product) {
        return <Splash />;
    }


    return (
        <Box width="80%" m="80px auto" >
                 <Grid container spacing={3} marginBottom={3}>
                <Grid item>
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        separator={<ChevronRightOutlinedIcon fontSize="small" />}
                        sx={{ mt:3}}
                    >
                        <Link
                            color="textPrimary"
                            component={RouterLink}
                            to="/"
                            variant="h5"
                        >
                            Home
                        </Link>
                       
                        <Typography
                            color="textSecondary"
                            variant="h5"
                        >
                            ProductDetails
                        </Typography>
                    </Breadcrumbs>

                </Grid>
            </Grid>


            <Box display="flex" flexWrap="wrap" columnGap="40px">
                <ImageSection
                    product={product}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                />
                <ActionSection
                    product={product}
                />
            </Box>
            <InformationSection
                description={product?.description}
            />

            <Box mt="50px" width="100%">
                <Typography variant="h3" fontWeight="bold">
                    Related Products
                </Typography>
                <Box
                    mt="20px"
                    display="flex"
                    flexWrap="wrap"
                    columnGap="1.33%"
                    justifyContent="space-between"
                >
                    {/* {items?.slice(0, 4).map((item, i) => (
            <ProductCard key={`${item.name}-${i}`} product={item} />
          ))} */}
                </Box>
            </Box>
        </Box >
    );
};

export default ProductDetails;
