import { useCallback, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { productApi } from "../../api/productApi";
import { useMounted } from "../../hooks/use-mounted";
import ProductCard from "../Product/ProductCard";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomButton from "../ui/CustomButton";
import { useNavigate } from "react-router-dom";
import Splash from "../ui/Splash";


const ShoppingList = () => {
  const [value, setValue] = useState("all");
  const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleSeeMoreClick = () => {
    navigate("/ZiwiShop/search");
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [data, setData] = useState()
  const isMounted = useMounted()
  const [loading, setLoading] = useState(true);

  const GetClientProducts = useCallback(async () => {
    try {

      const response = await productApi.GetClientProducts();
      if (isMounted()) {
        setData(response);
        setLoading(false)
      }
    } catch (error) {
      console.error(error);
      setLoading(false)
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
    <Box width="80%" margin="40px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isMobileScreen ? "block" : "none" } }}
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
           {loading && !data  ? (
        <Splash/>
      ) : (
        value === "all" && data?.products?.length > 0 ? (
          data?.products.map((product) => (
            <ProductCard product={product} key={`${product.name}-${product._id}`} />
          ))
        ) : (
          <Typography textAlign="center">Sorry, No results</Typography>
        )
      )}
        {/* {value === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <ProductCard item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "bestSellers" &&
          bestSellersItems.map((item) => (
            <ProductCard item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <ProductCard item={item} key={`${item.name}-${item.id}`} />
          ))} */}
      </Box>
      <Box textAlign="center" mt={2} onClick={handleSeeMoreClick}>
        <CustomButton
        endIcon={ <ArrowForwardIcon />}
        >
          See More
        </CustomButton>
      </Box>
    </Box>
  );
};

export default ShoppingList;
