import PropTypes from "prop-types";
import useTheme from "../../../hooks/useTheme";
import { tokens } from "../../../theme/theme";
import { Box } from "@mui/material";

const ProductSizeBox = (props) => {
  const { size, selectedSize, handleSizeSelect } = props;
  const { theme } = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      onClick={handleSizeSelect}
      style={{
        width: "40px",
        height: "40px",
        border: `1px solid ${colors.grey[200]}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        margin: "5px",
        fontSize: "18px",
        fontWeight: "bold",
        backgroundColor: size.value === selectedSize ? colors.greenAccent[600] : "transparent",
      }}
    >
      <span>{size?.value}</span>
    </Box>
  );
};

ProductSizeBox.propTypes = {
  size: PropTypes.object.isRequired,
  selectedSize: PropTypes.string,
  handleSizeSelect: PropTypes.func.isRequired,
};

export default ProductSizeBox;
