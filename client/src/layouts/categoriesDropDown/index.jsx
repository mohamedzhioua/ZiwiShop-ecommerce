import { useState } from 'react';
import Popover from '@mui/material/Popover';
import { Button, SvgIcon } from '@mui/material';
import useTheme from '../../hooks/useTheme';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import MenuItems from './MenuItems'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
 
const CategoriesPopover = (props) => {
  const { categories } = props
     const { theme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

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
        <Button  sx={{ my: 2, color: theme.palette.primary.main, display: 'inline-flex', fontWeight: "bold" }}>
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


        {categories.map((categorie, index) => (

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
CategoriesPopover.propTypes = {
  categories: PropTypes.array.isRequired,
};
export default CategoriesPopover
