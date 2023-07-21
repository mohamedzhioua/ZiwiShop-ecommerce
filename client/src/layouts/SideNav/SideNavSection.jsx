import { Box } from '@mui/system';
import SideNavItem from './SideNavItem';
import PropTypes from 'prop-types';

export const SideNavSection = (props) => {
    const { navigationLinks, onClose } = props;


    return (
        <Box>

            {navigationLinks.map((item, index) => (

                <SideNavItem item={item} onClose={onClose} key={`${item.name}-${index}`} />
            ))}
        </Box>
    );
};
SideNavSection.propTypes = {
    onClose: PropTypes.func.isRequired,
    navigationLinks: PropTypes.array.isRequired,
};
export default SideNavSection