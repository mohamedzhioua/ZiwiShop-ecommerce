import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

  const BrandsSlider = () => {
    const sliderContent = Object.values(import.meta.glob('../../../assets/brands/*', { eager: true, as: 'url' }))

    return (
        <Box sx={{ backgroundColor: "#1E1E1E" }}>

            <Box sx={{
                maxWidth: '1576px', m: '-7px', px: { xs: "20px", xl: "40px" },
                py: "20px" 
            }}>
                <Swiper
                    slidesPerView={1}
                    centeredSlides={true}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 2000,
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

                        <SwiperSlide key={`slider-image-${index}`} style={{
                            display: "flex",
                            alignItems: "center", justifyContent: "center"
                        }}>
                            <Box sx={{
                                width: { xs: "40px", md: "50px", xl: "60px" },
                                height: { xs: "40px", md: "50px", xl: "60px" },

                            }}>
                                <img src={texture} alt={`slider-${index}`} width="100%" height="100%" />
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </Box>

        </Box>
    );
}

export default BrandsSlider;
