import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { useMounted } from "../../../hooks/use-mounted";
 import Heading from "../Heading"
import CustomButton from '../CustomButton';
const AlertModal = (props) => {
  const { isOpen, onClose, onConfirm, loading } = props;

  const isMounted = useMounted();

  if (!isMounted()) {
    return null;
  }


  return (
    <Dialog
      open={isOpen}
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      sx={{
        backdropFilter: 'blur(5px)',
        minHeight: '100%',
        p: 3
      }}
    >

      <Box
        sx={{
          mx: "auto",
          padding: "30px",
          outline: "none",
          textAlign: "center",
        }}
      >
        <Heading title="Are you sure?" description="This action cannot be undone." />

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <CustomButton
            disabled={loading}
            variant="outlined"
            onClick={onClose}
            sx={{ mr: 2 }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            disabled={loading}
            variant="contained"
            color="error"
            onClick={onConfirm}
          >
            Continue
          </CustomButton>
        </Box>
      </Box>

    </Dialog>



  );
};

AlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AlertModal;
