import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProduct"
import ImageSection from "../../components/Product/ProductDetails/ImageSection";
import ActionSection from "../../components/Product/ProductDetails/ActionSection";
import InformationSection from "../../components/Product/ProductDetails/InformationSection";


const ItemDetails = () => {

    const { id } = useParams();
    const product = useProduct(id);
    const [selectedImage, setSelectedImage] = useState('');


    useEffect(() => {
        setSelectedImage(product?.images[0])
    }, [product]);

    if (!product) {
        return <div>Loading...</div>;
    }


    return (
        <Box width="80%" m="80px auto">
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
        </Box>
    );
};

export default ItemDetails;
