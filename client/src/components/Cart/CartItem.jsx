import PropTypes from "prop-types";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { decreaseCount, increaseCount, removeFromCart } from "../../app/feature/cartSlice";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { toTitleCase } from "../../utils/toTitleCase";
import { toast } from "react-hot-toast";
import useTheme from "../../hooks/useTheme";
import { tokens } from "../../theme/theme";
import { FlexBox } from ".";


const CartItem = (props) => {
  const { product } = props
  const { _id, name, images, category, quantity, price, countInStock, parentCategory } = product;
  const { theme } = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  return (
    <Box key={`${name}-${_id}`} mb={2}>
      <FlexBox p="15px 0">
        <Box flex="1 1 40%" >
          <img
            alt={name}
            width="123px"
            height="160px"
            src={images[0].url}
            loading="lazy"
          />
        </Box>
        <Box flex="1 1 60%">
          <FlexBox mb="5px">
            <Typography fontWeight="bold" sx={{ color: colors.grey[100] }}>
              {toTitleCase(name)}
            </Typography>
            <IconButton
              onClick={() =>
                dispatch(removeFromCart({ id: _id }))
              }

            >
              <CloseIcon />
            </IconButton>
          </FlexBox>
          {category &&
            <Typography fontSize={11} >
              {` ${`${category[0]?.name} `} / ${parentCategory ? `${parentCategory[0]?.name} ` : ''}`}
            </Typography>}
          <FlexBox m="15px 0">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${colors.grey[100]}`}
            >
              <IconButton
                onClick={() =>
                  dispatch(decreaseCount({ id: _id }))
                }
              >
                <RemoveIcon />
              </IconButton>
              <Typography>{quantity}</Typography>
              <IconButton
                onClick={() => {
                  if (countInStock < quantity + 1) {
                    toast.error('Sorry. Product is out of stock');
                  } else {
                    dispatch(increaseCount({ id: _id }));
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Typography fontWeight="bold" sx={{ color: colors.grey[100] }}>
              {currencyFormatter.format(price)}
            </Typography>
          </FlexBox>
        </Box>
      </FlexBox>
      <Divider />
    </Box>
  );
};
CartItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
    category: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        parentCategory: PropTypes.string,
      })
    ),
    parentCategory: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    ),
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    countInStock: PropTypes.number.isRequired,
  }).isRequired,
};
export default CartItem;
