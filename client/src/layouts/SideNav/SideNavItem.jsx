import { ButtonBase ,Box} from '@mui/material'
 import { Link } from 'react-router-dom'
import useTheme from '../../hooks/useTheme'
import { toTitleCase } from '../../utils/toTitleCase';
import PropTypes from 'prop-types';
import { SideNavNestedItems } from './SideNavNestedItems';

const SideNavItem = (props) => {
    const { item, onClose } = props
    const { name, href, childCategories, icon } = item
    const { theme } = useTheme();

    if (childCategories && childCategories.length > 0) {
        return <SideNavNestedItems item={item} onClose={onClose} />;
    }

    return (

        <>

            <ButtonBase
                key={name}
                component={Link}
                to={href}

                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pr: '16px',
                    py: '6px',
                    textAlign: 'left',
                    width: '100%',
                }}
                onClick={onClose}
            > 
            {icon && (
                <Box
                    component="span"
                    sx={{
                        alignItems: 'center',
                        color: 'secondary',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        mr: 2,
                    }}
                >
                    {icon}
                </Box>
            )}
                <Box
                    component="span"
                    sx={{
                        color: theme.palette.primary.main,
                        flexGrow: 1,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap',
                        fontWeight: "bold"
                    }}
                >
                    {toTitleCase(name)}
                </Box>

            </ButtonBase>
        </>

    )
}
SideNavItem.propTypes = {
    onClose: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};
export default SideNavItem