import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Brands() {

    return (
        <Box sx={{ backgroundColor: "#1E1E1E" }}>

            <Box >
                <BrandsSlider />

            </Box>

        </Box>
    );
}

export default Brands;



function BrandsSlider() {
    const sliderContent = Object.values(import.meta.glob('../../../assets/brands/*', { eager: true, as: 'url' }))

    // const sliderContent = [
    //     { id: 1, name: "adidas", path: "../../../assets/brands/adidas.svg" },
    //     { id: 2, name: "amazon", path: "../../../assets/brands/amazon.svg" },
    //     { id: 5, name: "nike", path: "../../../assets/brands/nike.svg" },
    //     { id: 6, name: "rolex", path: "../../../assets/brands/rolex.svg" },
    //      { id: 9, name: "zara", path: "../../../assets/brands/zara.svg" },
    //     { id: 10, name: "gucci", path: "../../../assets/brands/gucci.svg" },
    //      { id: 12, name: "lancôme", path: "../../../assets/brands/lancôme.svg" },
    //  ]

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                0: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                600: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
                800: {
                    slidesPerView: 6,
                    spaceBetween: 30,
                },
                1576: {
                    slidesPerView: 8,
                    spaceBetween: 30,
                },
            }}
            modules={[Autoplay]}
            className="mySwiper"
        >
            {sliderContent.map((texture, index) => (

                <SwiperSlide key={`carousel-image-${index}`} style={{
                    display: "flex",
                    alignItems: "center", justifyContent: "center"
                }}>
                    <Box sx={{
                        width: { xs: "40px", md: "50px", xl: "60px" },
                        height: { xs: "40px", md: "50px", xl: "60px" },

                    }}>
                        <img src={texture} alt={`carousel-${index}`} width="100%" height="100%" />
                    </Box>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}