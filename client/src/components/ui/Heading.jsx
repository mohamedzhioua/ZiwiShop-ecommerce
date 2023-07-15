import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { toTitleCase } from '../../utils/toTitleCase';

const Heading = (props) => {
    const { title, description } = props
    return (
        <div>
            <Typography variant="h1" sx={{fontWeight:"bold"}}>
                {toTitleCase(title)}
            </Typography>
            <Typography variant="h5">
                {toTitleCase(description)}
            </Typography>
        </div>
    );
};

Heading.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default Heading;
