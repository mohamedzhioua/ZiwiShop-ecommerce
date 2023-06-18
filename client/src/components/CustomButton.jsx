import Button from '@mui/material/Button';

const CustomButton = ({ icon: Icon, children, ...props }) => {
    return (
        <Button variant="contained"  {...props}>
            {Icon && <Icon style={{
                width: 24,
                height: 24,
                position: 'absolute',
                left: 10,
                top: 8,

            }} />}
            {children}
        </Button>
    );
};

export default CustomButton;
