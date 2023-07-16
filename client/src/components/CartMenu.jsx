import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../app/feature/cartSlice";
// import { useNavigate } from "react-router-dom";
import CustomButton from "./ui/CustomButton";
import { tokens } from "../theme/theme";
import useTheme from "../hooks/useTheme";
import { toTitleCase } from "../utils/toTitleCase";
import { currencyFormatter } from "../utils/currencyFormatter";
import { toast } from "react-hot-toast";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const { theme } = useTheme();
  const colors = tokens(theme.palette.mode);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + Number(item.quantity) * Number(item.price);
  }, 0);
  const itemCount = cart.reduce(
    (total, item) => total + Number(item.quantity),
    0
  )

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor='background.paper'
      >
        <Box padding="30px" overflow="auto" height="100%">
          <FlexBox mb="15px">
            <Typography variant="h3" sx={{ color: colors.grey[100] }}> SHOPPING BAG  ({itemCount})</Typography>
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              size="large"
              aria-haspopup="true"
              sx={{ color: colors.grey[100] }}>
              <CloseIcon />
            </IconButton>
          </FlexBox>
          <Box>
            {cart?.map((product) => (
              <Box key={`${product?.name}-${product?._id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={product?.name}
                      width="123px"
                      height="164px"
                      src={product.images[0].url}
                      loading="lazy"
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold" sx={{ color: colors.grey[100] }}>
                        {toTitleCase(product?.name)}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: product._id }))
                        }

                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    {product?.category && 
                    <Typography fontSize={11} >
                      {`${product.category[0].name} ${product.category[0].parentCategory ? `/ ${product.category[0].parentCategory}` : ""
                        }`}
                    </Typography>}
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${colors.grey[100]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: product._id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{product.quantity}</Typography>
                        <IconButton
                         onClick={() => {
                          if (product.countInStock < product.quantity + 1) {
                            toast.error('Sorry. Product is out of stock');
                          } else {
                            dispatch(increaseCount({ id: product._id }));
                          }
                        }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography fontWeight="bold" sx={{ color: colors.grey[100] }}>
                        {currencyFormatter.format(product.price)}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold" sx={{ color: colors.grey[100] }}>SUBTOTAL</Typography>
              <Typography fontWeight="bold" sx={{ color: colors.grey[100] }}>{currencyFormatter.format(totalPrice)}</Typography>
            </FlexBox>
            <CustomButton
              sx={{
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              onClick={() => {
                // navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              CHECKOUT
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
