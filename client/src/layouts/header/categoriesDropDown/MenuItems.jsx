import { ButtonBase, MenuItem, Box } from '@mui/material'
import { toTitleCase } from '../../../utils/toTitleCase'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'
import PropTypes from 'prop-types';

const MenuItems = (props) => {
    const { categorie, onClose } = props
    const { name, href, childCategories } = categorie
    if (childCategories && childCategories.length > 0) {
        return <Dropdown categorie={categorie} onClose={onClose} />;
    }

    return (

        <MenuItem
            sx={{
                borderRadius: 2, px: 2,
                py: 0.5, display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
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
                <Box
                    component="span"
                    sx={{
                        flexGrow: 1,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap',
                        fontWeight: "bold"
                    }}
                >
                    {toTitleCase(name)}
                </Box>

            </ButtonBase>
        </MenuItem >

    )

}
MenuItems.propTypes = {
    onClose: PropTypes.func.isRequired,
    categorie: PropTypes.object.isRequired,
};
export default MenuItems