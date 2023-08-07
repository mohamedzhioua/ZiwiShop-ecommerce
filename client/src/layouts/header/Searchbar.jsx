import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Input, Slide, IconButton, InputAdornment, ClickAwayListener } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/ui/CustomButton';
 

const HEADER_MOBILE = 84;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('Box')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.16)',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const Searchbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
 
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/ZiwiShop/search/?query=${query}` : '/ZiwiShop/search');
    setOpen(false);
  };

  return (
    <form onSubmit={submitHandler}>
      <ClickAwayListener onClickAway={handleClose}>
        <div>
          {!open && (
            <IconButton
              onClick={handleOpen}
              aria-label="Search"
              color="primary"
            >
              <SearchOutlinedIcon />
            </IconButton>
          )}

          <Slide direction="down" in={open} mountOnEnter unmountOnExit>
            <StyledSearchbar>
              <Input
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                fullWidth
                disableUnderline
                placeholder="Search…"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlinedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                  </InputAdornment>
                }
                sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
              />
              <CustomButton variant="contained" type="submit"  >
                Search
              </CustomButton>
            </StyledSearchbar>
          </Slide>
        </div>
      </ClickAwayListener>
    </form>

  );
}
export default Searchbar