import ShoppingList from "../components/home/ShoppingList";
import Brands from "../components/home/sliders/Brands";
 import MainCarousel from "../components/home/sliders/MainCarousel";



function Home() {
  return (
    < >
      <MainCarousel />
          <Brands/>
       <ShoppingList />
    </>
  );
}

export default Home;
