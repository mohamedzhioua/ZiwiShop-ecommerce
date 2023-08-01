import PropTypes from 'prop-types';
import {
    Box,
   ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import { currencyFormatter } from '../../utils/currencyFormatter';
const OrderItems = (props) => {
    const { product } = props
     return (
        <ListItem
            disableGutters
            key={product._id}
        >
            <ListItemAvatar sx={{ pr: 2 }}>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        height: 100,
                        justifyContent: 'center',
                        overflow: 'hidden',
                        width: 100,
                        '& img': {
                            width: '100%',
                            height: 'auto'
                        }
                    }}
                >
                    <img
                        alt={product.name}
                        src={product.images[0].url}

                    />
                </Box>
            </ListItemAvatar>
            <ListItemText
                primary={(
                    <Typography
                        sx={{ fontWeight: 'fontWeightBold' }}
                        variant="subtitle2"
                    >
                        {product.name}
                    </Typography>
                )}
                secondary={(
                    <Typography
                        color="text.secondary"
                        sx={{ mt: 1 }}
                        variant="body1"
                    >
                        {currencyFormatter.format(product.price)}
                    </Typography>
                )}
            />
        </ListItem>
    );
}
OrderItems.propTypes = {
    product: PropTypes.object,
};
export default OrderItems