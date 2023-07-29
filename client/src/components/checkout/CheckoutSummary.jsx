import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Unstable_Grid2 as Grid,
    List,
    OutlinedInput,
    Typography
} from '@mui/material';
import { currencyFormatter } from "../../utils/currencyFormatter";
import { useSelector } from "react-redux";
import CartItem from '../Cart/CartItem';
import { Scrollbar } from '../ui/Scrollbar';

const calculateAmounts = (products) => {

    const shippingTax = 12;
    const subtotal = products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
    }, 0);
    const total = shippingTax + subtotal;

    return {
        shippingTax,
        subtotal,
        total
    };
};

export const CheckoutSummary = () => {
    const cart = useSelector((state) => state.cart.cart);

    const { shippingTax, subtotal, total } = calculateAmounts(cart);

    const formattedShippingTax = currencyFormatter.format(shippingTax);
    const formattedSubtotal = currencyFormatter.format(subtotal);
    const formattedTotal = currencyFormatter.format(total);

    return (
        <Grid container spacing={3}>
            <Grid xs={12} md={6} >
                <Box sx={{ maxHeight: '500px' , overflow: 'auto' }}>
                    <List>
                        <Scrollbar>
                            {cart.map((product) => (
                                <CartItem key={product._id} product={product} />
                            ))}
                        </Scrollbar>
                    </List>
                </Box>
            </Grid>
            <Grid xs={12} md={6} >
                <Card>
                    <CardContent >
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Order Summary
                        </Typography>

                        <OutlinedInput fullWidth placeholder="Discount Code" size="small" sx={{ mt: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button type="button">Apply Coupon</Button>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2">Subtotal</Typography>
                            <Typography variant="subtitle2">{formattedSubtotal}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2">Shipping Tax</Typography>
                            <Typography variant="subtitle2">{formattedShippingTax}</Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2">Total</Typography>
                            <Typography variant="subtitle2">{formattedTotal}</Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};


