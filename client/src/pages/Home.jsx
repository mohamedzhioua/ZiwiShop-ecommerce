import { Box } from "@mui/system";
import ShoppingList from "../components/home/ShoppingList";
import Brands from "../components/home/sliders/BrandsSlider";
import MainCarousel from "../components/home/sliders/MainSlider";
import WeOffer from "../components/home/WeOffer";
import JoinUs from "../components/home/JoinUs";
import ShopFooter from "../layouts/ShopFooter";



function Home() {
  return (
    <Box>
      <MainCarousel />
      <Brands />
      <WeOffer/>
      <ShoppingList />
      <JoinUs/>
      <ShopFooter /> 
    </Box>
  );
}

export default Home;
