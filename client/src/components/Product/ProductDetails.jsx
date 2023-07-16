import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import {useProduct} from "../../hooks/useProduct" 
import { currencyFormatter } from "../../utils/currencyFormatter";
import { toTitleCase } from "../../utils/toTitleCase";
import ProductCard from "./ProductCard";
import { addToCart } from "../../app/feature/cartSlice";


const ItemDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useProduct(id);
    const [value, setValue] = useState("description");
  const [quantity, setQuantity] = useState(1);
//    const [items, setItems] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

//   async function getItems() {
//     const items = await fetch(
//       `http://localhost:2000/api/items?populate=image`,
//       {
//         method: "GET",
//       }
//     );
//     const itemsJson = await items.json();
//     setItems(itemsJson.data);
//   }

//   useEffect(() => {
//      getItems();
//   }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={product?.name}
            width="100%"
            height="100%"
            src={product?.images[0]?.url}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
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
            //   border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setQuantity(Math.max(quantity - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{quantity}</Typography>
              <IconButton onClick={() => setQuantity(quantity + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...product, quantity } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {product?.attributes?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{product?.description}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
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
