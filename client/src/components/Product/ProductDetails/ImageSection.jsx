import PropTypes from "prop-types";
import { ImageList, ImageListItem } from "@mui/material";
import { Box } from "@mui/system";

 
const ImageSection = (props) => {
const { product, selectedImage, setSelectedImage } = props
const hasMultipleImages = product?.images?.length > 1;

    return (
        <Box flex="1 1 40%" mb="40px">
            {product?.images?.length > 0 && (
                <Box>
                    {selectedImage !== '' && (
                        <img
                            src={selectedImage?.url}
                            alt={product?.name}
                            width="100%"
                            height="100%"
                        />
                    )}
                </Box>
            )}
            {hasMultipleImages && (
                <Box style={{ display: 'flex', padding: '16px 0', gap: '64px' }}>
                    <ImageList cols={4} gap={8}>
                        {product.images.slice(0, 4).map((img, i) => (
                            <ImageListItem key={i}>
                                <img
                                    onClick={() => setSelectedImage(img)}
                                    style={{ cursor: 'pointer', height: '8rem', objectFit: 'contain', width: '100%' }}
                                    src={img.url}
                                    alt={product?.name}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
            )}
        </Box>
    )
}
ImageSection.propTypes = {
    product: PropTypes.object.isRequired,
    selectedImage: PropTypes.string.isRequired,
    setSelectedImage: PropTypes.func.isRequired,
  };
export default ImageSection