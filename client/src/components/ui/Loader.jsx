import { Backdrop, CircularProgress } from "@mui/material"
import PropTypes from 'prop-types';

 
const Loader = (props) => {
const {open}= props
  return (
    <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <CircularProgress color="primary" />
  </Backdrop>
  )
}
Loader.propTypes = {
    open:PropTypes.bool.isRequired,
  };
export default Loader