import PropTypes from 'prop-types';
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addToCart } from '../app/feature/cartSlice';
import { toTitleCase } from '../utils/toTitleCase';
import { currencyFormatter } from '../utils/currencyFormatter';
import CustomButton from './ui/CustomButton';
import { useHover } from '../hooks/useHover';
import useTheme from '../hooks/useTheme';

const ProductCard = (props) => {
  const { product, width } = props
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const { mode, theme } = useTheme();
  const ref = useRef(null);
  const [hoverRef, isHovered] = useHover(ref);

  return (
    <Box width={width}>
      <Box
        position="relative"
        ref={hoverRef}
      >
        <img
          alt={product.name}
          width="300px"
          height="400px"
          src={product.images[0].url}
          onClick={() => navigate(`/product/${product._id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="5%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              borderRadius="3px"
            >
              <CustomButton variant="outlined" sx={{
                color: mode === "dark" ? "black" : "",
                borderColor: mode === "dark" ? "black" : ""
              }}>
                Preview
              </CustomButton>
            </Box>
            <CustomButton onClick={() => {
              dispatch(addToCart({ item: { ...product } }));
            }}>
              Add to Cart
            </CustomButton>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography color={theme.palette.neutral.light}>
          {product.category[0].name}
        </Typography>
        <Typography>{toTitleCase(product.name)}</Typography>
        <Typography fontWeight="bold">{currencyFormatter.format(product.price)}</Typography>
      </Box>
    </Box>
  );
};
ProductCard.propTypes = {
  product: PropTypes.object,
  width: PropTypes.string,
};
export default ProductCard;
