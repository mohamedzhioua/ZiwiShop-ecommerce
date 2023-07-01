import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const Heading = (props) => {
    const { title, description } = props
    return (
        <div>
            <Typography variant="h2" component="h2" >
                {title}
            </Typography>
            <Typography variant="body2">
                {description}
            </Typography>
        </div>
    );
};

Heading.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default Heading;
