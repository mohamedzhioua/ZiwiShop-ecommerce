import { Box, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import {
  setIsCartOpen,
} from "../../app/feature/cartSlice";
// import { useNavigate } from "react-router-dom";
import CustomButton from "../ui/CustomButton";
import { tokens } from "../../theme/theme";
import useTheme from "../../hooks/useTheme";
import CartItem from "./CartItem";
import CartSubtotal from "./CartSubtotal";
import { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const { theme } = useTheme();
  const colors = tokens(theme.palette.mode);
  const cartRef = useRef(null);
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
  useOnClickOutside(cartRef, isCartOpen, () =>
    dispatch(setIsCartOpen({}))
  );
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
        ref={cartRef}
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
              <CartItem key={product._id} product={product} />
            ))}
          </Box>
          <Box m="20px 0">
            <CartSubtotal totalPrice={totalPrice} />
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
