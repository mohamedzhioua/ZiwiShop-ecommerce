import { Box, Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProduct"
import ImageSection from "../../components/Product/ProductDetails/ImageSection";
import ActionSection from "../../components/Product/ProductDetails/ActionSection";
import InformationSection from "../../components/Product/ProductDetails/InformationSection";
 import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import Splash from "../../components/ui/Splash";
import { productApi } from "../../api/productApi";
import CartItem from "../../components/Cart/CartItem";
import ProductCard from "../../components/Product/ProductCard";
 const ProductDetails = () => {

    const { id } = useParams();
    const product = useProduct(id);
    const [selectedImage, setSelectedImage] = useState('');
    const [relatedProducts, setRelatedProducts] = useState( );
    console.log("🚀 ~ file: ProductDetails.jsx:18 ~ ProductDetails ~ relatedProducts:", relatedProducts)
    const navigate = useNavigate();

    useEffect(() => {
        const getRelatedProducts = async () => {
          if (product?.category?._id) {
            try {
              const response = await productApi.getRelatedProducts(product.category._id);
              setRelatedProducts(response);
            } catch (error) {
              console.error(error);
            }
          }
        }
      
        getRelatedProducts();
      }, [product]);
      
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
                        sx={{ mt: 3 }}
                    >
                        <Link
                            color="textPrimary"
                            component='button'
                            onClick={() => navigate(-1)}
                            variant="h5"
                        >
                            go Back
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
                    {relatedProducts?.slice(0, 3).map((item, i) => (
            <ProductCard key={`${item.name}-${i}`} product={item} />
          ))}
                </Box>
            </Box>
        </Box >
    );
};

export default ProductDetails;
