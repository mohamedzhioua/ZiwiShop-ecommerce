import PropTypes from "prop-types";
import Button from '@mui/material/Button';
const CustomButton = ({ icon: Icon, children, includeSpacing, ...props }) => {
    const buttonStyle = {
      borderColor: "primary",
       fontSize: "14px",

    };
  
    if (includeSpacing) {
      buttonStyle.marginBottom = 2;  
    }
  
    return (
      <Button variant="contained" {...props}
       sx={buttonStyle}
       >
        {Icon && (
          <Icon
            style={{
              width: 24,
              height: 24,
              position: 'absolute',
              left: 10,
              top: 8,
            }}
          />
        )}
        {children}
      </Button>
    );
  };
  CustomButton.propTypes = {
    children: PropTypes.node,
    icon: PropTypes.string,
    includeSpacing: PropTypes.bool
   };

export default CustomButton;
