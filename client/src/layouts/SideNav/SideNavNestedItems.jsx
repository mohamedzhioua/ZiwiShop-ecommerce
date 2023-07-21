import { Typography, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box, ButtonBase, Collapse, SvgIcon } from '@mui/material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { toTitleCase } from '../../utils/toTitleCase';
import useTheme from '../../hooks/useTheme';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import SideNavItem from './SideNavItem';

export const SideNavNestedItems = (props) => {
    const { item, onClose } = props
    const [open, setOpen] = useState(false);
    const { theme } = useTheme();
    const { name, href, childCategories } = item

    const handleToggle = useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, []);

      
    return (
        <>
            <ButtonBase
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
                        color: theme.palette.primary.main,
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
                        <SideNavItem
                            key={`${childItem.name}-${index}`}
                            item={childItem}
                            onClose={onClose}
                        />
                    ))}
                {!childCategories && childCategories && childCategories.length > 0 && (

                    <MenuItem key={name} onClick={onClose} component={Link}
                        to={href ? href : x  } 
                        sx={{
                            width: 150, borderRadius: 3, px: 1,
                            py: 0.5, justifyContent: 'center', color: theme.palette.primary.main,
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
    );




};
SideNavNestedItems.propTypes = {
    onClose: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};
export default SideNavNestedItems;
