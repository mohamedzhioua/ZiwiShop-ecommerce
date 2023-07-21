import { Box } from '@mui/system';
import { SideNavNestedItems } from './SideNavNestedItems';
import SideNavItem from './SideNavItem';
import PropTypes from 'prop-types';

export const SideNavSection = (props) => {
    const { navigationLinks, onClose } = props;
    const accordionItems = navigationLinks.filter((item) => item.children);
    const linkItems = navigationLinks.filter((item) => !item.children);

    return (
        <Box>
            {SideNavNestedItems(accordionItems, onClose)}

            {linkItems.map((item) => (

                <SideNavItem item={item} onClose={onClose} key={item.name}/>
            ))}
        </Box>
    );
};
SideNavSection.propTypes = {
    onClose: PropTypes.func.isRequired,
    navigationLinks: PropTypes.array.isRequired,
};
export default SideNavSection