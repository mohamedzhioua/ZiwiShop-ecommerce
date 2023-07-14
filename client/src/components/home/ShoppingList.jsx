import { useCallback, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
 import { productApi } from "../../api/productApi";
import { useMounted } from "../../hooks/use-mounted";


const ShoppingList = () => {
  const [value, setValue] = useState("all");
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const [products, setProducts] = useState([])
  const isMounted = useMounted()

  const GetClientProducts = useCallback(async () => {
    try {
      const response = await productApi.GetClientProducts();
      if (isMounted()) {
        setProducts(response);
        // dispatch(setItems(response));

      }
    } catch (error) {
      console.error(error);
    }
  }, []);


  useEffect(() => {
    GetClientProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const topRatedItems = items.filter(
  //   (item) => item.attributes.category === "topRated"
  // );
  // const newArrivalsItems = items.filter(
  //   (item) => item.attributes.category === "newArrivals"
  // );
  // const bestSellersItems = items.filter(
  //   (item) => item.attributes.category === "bestSellers"
  // );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          products.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
        {/* {value === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "bestSellers" &&
          bestSellersItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))} */}
      </Box>
    </Box>
  );
};

export default ShoppingList;
