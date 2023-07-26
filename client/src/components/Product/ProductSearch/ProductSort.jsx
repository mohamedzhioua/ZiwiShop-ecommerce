import PropTypes from 'prop-types';
import { ListItemText, Menu, MenuItem } from "@mui/material";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomButton from "../../ui/CustomButton";
import { styled, alpha } from '@mui/material/styles';
import { useState } from "react";
import { createQueryString } from "../../../utils/queryString";


const sortOptions = [
    { label: "Date: Old to new", value: "createdAt.asc" },
    {
        label: "Date: New to old",
        value: "createdAt.desc",
    },
    { label: "Price: Low to high", value: "price.asc" },
    { label: "Price: High to low", value: "price.desc" },
    {
        label: "Alphabetical: A to Z",
        value: "name.asc",
    },
    {
        label: "Alphabetical: Z to A",
        value: "name.desc",
    },
]
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const ProductSort = (props) => {
    const {sort } = props
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };
    const handleMenuItemClick = (value) => {
        const queryString = createQueryString(searchParams,{
            sort: value,
        });

        navigate(`${location.pathname}?${queryString}`);
        setAnchorEl(null);

    };

    return (
        <>
            <CustomButton
                onClick={handleClick}
            >
                Sort
                <ExpandMoreOutlinedIcon />
            </CustomButton>
            <StyledMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem disabled>Sort by</MenuItem>
                {sortOptions.map((option) => (
                    <MenuItem
                        key={option.label}
                        onClick={() =>
                            handleMenuItemClick(option.value)
                        }
                        selected={option.value === sort}

                    >
                        <ListItemText primary={option.label} />
                    </MenuItem>
                ))}
            </StyledMenu>
        </>
    );
};
ProductSort.propTypes = {
    sort: PropTypes.string.isRequired,
 };
export default ProductSort