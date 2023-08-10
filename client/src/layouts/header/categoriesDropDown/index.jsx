import { useState } from 'react';
import Popover from '@mui/material/Popover';
import { Button, SvgIcon ,Box} from '@mui/material';
import useTheme from '../../../hooks/useTheme';
import PropTypes from 'prop-types';
import MenuItems from './MenuItems'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
 
const CategoriesDropDown = (props) => {
  const { categories } = props
     const { theme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const allCategory = { name: 'All', href: '/ZiwiShop/search' };
  const categoriesWithAll = [allCategory, ...categories];
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(false);
  };

  return (
    <>
      <Box
        onClick={handlePopoverOpen}
        sx={{
          '&:hover': {
            cursor: "pointer"
          }, alignItems: 'center',
          display: 'flex',

        }}
      >
        <Button  sx={{ my: 2, color: theme.palette.primary.main, display: 'inline-flex',  fontWeight: 'bold',fontSize:'14px' }}>
          categories
          <SvgIcon
                    sx={{
                        fontSize: 16,
                        ml: 2,
                    }}
                >
          {!anchorEl ? <ExpandMoreOutlinedIcon /> : <ExpandLessOutlinedIcon />}
          </SvgIcon>
        </Button>
      </Box>
      <Popover
        slotProps={{
          paper: {
            sx: {
              width: 240,
              borderRadius: 3,
              px: 1,
              py: 0.5,
              mt: '45px'

            }
          }
        }}
        disableScrollLock
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMountedF
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}

        open={Boolean(anchorEl)}
        onClose={handlePopoverClose}
      >


        {categoriesWithAll.map((categorie, index) => (

          <MenuItems
            key={`${categorie.name}-${index}`}
            categorie={categorie}
            onClose={handlePopoverClose}
             />


        ))}
      </Popover>
    </ >

  );
};
CategoriesDropDown.propTypes = {
  categories: PropTypes.array.isRequired,
};
export default CategoriesDropDown

