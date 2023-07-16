import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { currencyFormatter } from "../../utils/currencyFormatter";
import useTheme from "../../hooks/useTheme";
import { tokens } from "../../theme/theme";
import { FlexBox } from ".";
 
const CartSubtotal = (props) => {
    const { totalPrice } = props
    const { theme } = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px 0">
            <FlexBox m="20px 0">
                <Typography fontWeight="bold" sx={{ color: colors.grey[100] }}>
                    SUBTOTAL
                </Typography>
                <Typography fontWeight="bold" sx={{ color: colors.grey[100] }}>
                    {currencyFormatter.format(totalPrice)}
                </Typography>
            </FlexBox>
         </Box>
    );
};
CartSubtotal.propTypes = {
    totalPrice: PropTypes.number.isRequired,
};
export default CartSubtotal;
