import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { toTitleCase } from '../../utils/toTitleCase';
import { Stack } from '@mui/material';

const Heading = (props) => {
    const { title, description ,titleStyle} = props
    return (
        <Stack spacing={1}>
            <Typography variant={titleStyle ? titleStyle : 'h1'} sx={{fontWeight:"bold",  letterSpacing: '0.15px !important' }}>
                {toTitleCase(title)}
            </Typography>
            <Typography variant="h5" sx={{letterSpacing: '0.15px !important' }}>
                {toTitleCase(description)}
            </Typography>
        </Stack>
    );
};

Heading.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    titleStyle: PropTypes.string 
};

export default Heading;
