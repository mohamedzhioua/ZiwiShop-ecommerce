import { Box } from "@mui/system";
import ShoppingList from "../components/home/ShoppingList";
import Brands from "../components/home/sliders/Brands";
import MainCarousel from "../components/home/sliders/MainCarousel";



function Home() {
  return (
    <Box>
      <MainCarousel />
      <Brands />
      <ShoppingList />
    </Box>
  );
}

export default Home;
