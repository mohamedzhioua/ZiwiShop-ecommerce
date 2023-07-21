import { useState } from 'react';
import Popover from '@mui/material/Popover';
import { MenuItem, Typography } from '@mui/material';
import useTheme from '../hooks/useTheme';
import { Box } from '@mui/system';

const BrandsPopover = (props) => {
  const { brands } = props
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
        <Typography sx={{ my: 2, color: theme.palette.primary.main, display: 'block', fontWeight: "bold" }}>
          Brands

        </Typography>
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


        {brands.map((brand) => (
          <MenuItem key={brand._id}
            sx={{
              borderRadius: 3, px: 1,
              py: 0.5, display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"

              sx={{
                textDecoration: 'none',
                fontWeight: "bold"
              }}
            >
              {brand.name}
            </Typography>
          </MenuItem>


        ))}
      </Popover>
    </ >

  );
};

export default BrandsPopover

