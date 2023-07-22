import { Box, Typography } from "@mui/material";
import useTheme from "../../../hooks/useTheme";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
 

const gallery = Object.values(import.meta.glob('../../../assets/carousel-images/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }))

const MainCarousel = () => {
  const { theme } = useTheme();

  return (
    <Box>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {gallery.map((texture, index) => (
          <SwiperSlide key={`carousel-image-${index}`} >
            <Box>
              <img
                src={texture}
                alt={`carousel-${index}`}
                style={{
                  width: "100%",
                  maxHeight: "500px",
                  objectFit: "cover",
                  backgroundAttachment: "fixed",
                }}
              />
              <Box
                color="white"
                padding="20px"
                borderRadius="1px"
                textAlign="left"
                backgroundColor="rgb(0, 0, 0, 0.3)"
                position="absolute"
                top="50%"
                left="10%"
                right="20"
                margin="0 auto"
                maxWidth="180px"
                sx={{
                  [theme.breakpoints.down('sm')]: {
                    top: "46%",
                  },
                }}
              >
                <Typography sx={{
                  color: theme.palette.primary.main,
                }} >-- NEW ITEMS</Typography>
                <Typography variant="h4" sx={{
                  color: theme.palette.primary.main,
                }}>Summer Sale</Typography>
                <Typography
                  fontWeight="bold"

                  sx={{
                    textDecoration: "underline", color: theme.palette.primary.main,
                  }}
                >
                  Discover More
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}

      </Swiper>
    </Box>
  );
};

export default MainCarousel;
