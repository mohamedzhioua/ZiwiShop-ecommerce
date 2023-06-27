import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomButton from '../components/CustomButton';

const NotFound = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
            }}
        >
            <Typography variant="h1" component="h1" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="h3" gutterBottom>
                The page you are looking for does not exist.
            </Typography>
            <CustomButton component={Link} to="/" variant="outlined" color="primary">
                Go Home
            </CustomButton>
        </Box>
    );
};

export default NotFound;
