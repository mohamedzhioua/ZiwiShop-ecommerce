import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { Box } from '@mui/system';
import   { useEffect, useState } from 'react'
import useTheme from '../../hooks/useTheme';

const ScrollToTopBtn = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {

        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });

    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    return (
        <Box>
            {showTopBtn &&
                <Box sx={{
                    position: 'fixed', bottom: '40px',
                    right: { xs: "30px", xl: "30px", xxl: "80px" },
                    zIndex: "10"
                }}>
                    <Box onClick={goToTop} sx={{
                        width: "40px", height: "40px", backgroundColor: '#998e76',
                        ":hover": { backgroundColor: '#7a6a57'}, transition: 'all .2s linear',
                        borderRadius: "5px",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <ArrowDropUpOutlinedIcon style={{
                            fontSize: "40px",  color: theme.palette.primary.main, cursor: "pointer",
                        }} />
                    </Box>
                </Box>
            }
        </Box>
    );
}

export default ScrollToTopBtn