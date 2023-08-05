import { ButtonBase, Collapse, MenuItem, SvgIcon, Typography } from '@mui/material';
import { useCallback, useState } from 'react'
import { toTitleCase } from '../../../utils/toTitleCase';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import MenuItems from './MenuItems';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import PropTypes from 'prop-types';

const Dropdown = (props) => {
    const { categorie, onClose } = props
    const [open, setOpen] = useState(false);
    const { name, href, childCategories } = categorie

    const handleToggle = useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, []);

    return (
        <>
            <ButtonBase
                // disableRipple
                key={name}
                onClick={handleToggle}
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
            >
                <Box
                    component="span"
                    sx={{
                        flexGrow: 1,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap',
                        fontWeight: "600",
                    }}
                >
                    {toTitleCase(name)}
                </Box>
                <SvgIcon
                    sx={{
                        fontSize: 16,
                        ml: 2,
                    }}
                >
                    {open ? <ExpandMoreOutlinedIcon /> : <ChevronRightOutlinedIcon />}
                </SvgIcon>
            </ButtonBase>
            <Collapse in={open} sx={{ mt: 0.5 }}>
                {childCategories && childCategories && childCategories.length > 0 &&
                    childCategories.map((childItem, index) => (
                        <MenuItems
                            key={`${childItem.name}-${index}`}
                            categorie={childItem}
                            onClose={onClose}
                        />
                    ))}
                {!childCategories && childCategories && childCategories.length > 0 && (

                    <MenuItem key={name} onClick={onClose} component={Link}
                        to={href}
                        sx={{
                            width: 150, borderRadius: 3, px: 1,
                            py: 0.5, justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                textDecoration: 'none',
                                fontWeight: "bold"
                            }}
                        >
                            {toTitleCase(name)}
                        </Typography>
                    </MenuItem>
                )}

            </Collapse>
        </>
    )
}
Dropdown.propTypes = {
    onClose: PropTypes.func.isRequired,
    categorie: PropTypes.object.isRequired,
};
export default Dropdown