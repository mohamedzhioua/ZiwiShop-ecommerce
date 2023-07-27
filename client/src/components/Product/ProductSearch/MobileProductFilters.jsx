import PropTypes from 'prop-types';
import useTheme from '../../../hooks/useTheme';
 import ProductFilters from './ProductFilters';
import { Drawer } from '@mui/material';

const MobileProductFilters = (props) => {
    const { onClose, open , sizes , brands } = props
    const { theme } = useTheme();
    return (
        <Drawer
            anchor="bottom"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    height: 'calc(100% - 64px)',
                    top: 64,
                    width: "100%",
                    backdropFilter: 'blur(6px)',
                    backgroundColor: theme.palette.background.paper,
                }
            }}
        >

                 <ProductFilters onClose={onClose} sizes={sizes} brands={brands}  />
         </Drawer>
    );
}
MobileProductFilters.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    sizes: PropTypes.array.isRequired,
    brands: PropTypes.array.isRequired,
};
export default MobileProductFilters