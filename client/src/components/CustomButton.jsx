import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

const CustomButton = ({ icon, children, ...props }) => {
    return (
        <Button variant="contained" {...props}>
            {icon && <Icon>{icon}</Icon>}
            {children}
        </Button>
    );
};

export default CustomButton;
