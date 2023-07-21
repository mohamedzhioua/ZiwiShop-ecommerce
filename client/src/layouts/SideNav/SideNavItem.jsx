import { ButtonBase } from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import useTheme from '../../hooks/useTheme'
import { toTitleCase } from '../../utils/toTitleCase';
import PropTypes from 'prop-types';

const SideNavItem = (props) => {
    const { item, onClose } = props
    const { name, href } = item
    const { theme } = useTheme();

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