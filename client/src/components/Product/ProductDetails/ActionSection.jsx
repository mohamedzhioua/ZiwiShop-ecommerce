import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { toTitleCase } from "../../../utils/toTitleCase";
import { currencyFormatter } from "../../../utils/currencyFormatter";
import { addToCart } from "../../../app/feature/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useTheme from "../../../hooks/useTheme";
import { tokens } from "../../../theme/theme";
import CustomButton from "../../ui/CustomButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-hot-toast";


const ActionSection = (props) => {
    const { product }=props
    const { theme } = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);

    if (product?.countInStock < quantity) {
        toast.error('Sorry. Product is out of stock');
    }
    const handleDecrease = () => {
      setQuantity(Math.max(quantity - 1, 0));
    };
  
    const handleIncrease = () => {
      setQuantity(quantity + 1);
    };
  
    const handleAddToCart = () => {
      dispatch(addToCart({ item: { ...product, quantity } }));
    };
  
    return (
        <Box flex="1 1 50%" mb="40px">
        <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
        </Box>

        <Box m="65px 0 25px 0">
            <Typography variant="h3">{toTitleCase(product?.name)}</Typography>
            <Typography>{currencyFormatter.format(product?.price)}</Typography>
            <Typography sx={{ mt: "20px" }}>
                {product?.description}
            </Typography>
        </Box>

        <Box display="flex" alignItems="center" minHeight="50px">
            <Box
                display="flex"
                alignItems="center"
                border={`1.5px solid ${colors.grey[100]}`}
                mr="20px"
                p="2px 5px"
            >
                <IconButton onClick={handleDecrease}>
                    <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: "0 5px" }}>{quantity}</Typography>
                <IconButton onClick={handleIncrease}>
                    <AddIcon />
                </IconButton>
            </Box>
            <CustomButton
                sx={{ borderRadius: 0, padding: "10px 40px" }}
                onClick={handleAddToCart}
            >
                ADD TO CART
            </CustomButton>
        </Box>
        <Box>
            <Box m="20px 0 5px 0" display="flex">
                <FavoriteBorderOutlinedIcon />
                <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES:  {`${product?.category?.name} ${product?.category?.parentCategory ? `/ ${product?.category?.parentCategory.name}` : ""
                }`}
            </Typography>
        </Box>
    </Box>
    );
  };

  ActionSection.propTypes = {
    product: PropTypes.object.isRequired,
    quantity: PropTypes.number.isRequired,
    setQuantity: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  
export default ActionSection