import { Box, Typography, useMediaQuery } from "@mui/material";
import useTheme from "../../../hooks/useTheme";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


const gallery = Object.values(import.meta.glob('../../../assets/carousel-images/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }))

const MainCarousel = () => {
  const { theme } = useTheme();
  const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

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
                  height: "100%",
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
                top={isMobileScreen ?  "46%" :"40%"}
                left={isMobileScreen ?  "10%" :"5%"}
                right={isMobileScreen ? "10" :undefined }
                margin={isMobileScreen ? "0 auto" :undefined }
                maxWidth={isMobileScreen ?  "200px" : "100%"}
                >
                <Typography variant={isMobileScreen ? 'h5' : 'h2'} sx={{ color: theme.palette.primary.main }}>
                  Level up your style with our collections
                </Typography>
                <Typography
                  variant={isMobileScreen ? 'h6' : 'h4'}
                  fontWeight="bold"
                  sx={{
                    textDecoration: "underline",
                    color: theme.palette.primary.main,
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
