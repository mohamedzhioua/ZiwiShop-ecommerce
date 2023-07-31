import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Unstable_Grid2 as Grid,
     List,
    OutlinedInput,
    Typography,
    useMediaQuery
  } from '@mui/material';
import { Scrollbar } from '../ui/Scrollbar';
import PropTypes from 'prop-types';
import { Stack } from '@mui/system';


const OneOrder = (props) => {
    const {order} =props
    const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Grid container spacing={3}>
    <Grid xs={12} md={6}>
        {!isMobileScreen ? (
            <List sx={{ maxHeight: '800px', overflow: 'auto' }}>
                <Scrollbar>
                    {order.map((product) => (
                        <CartItem key={product._id} product={product} />
                    ))}
                </Scrollbar>
            </List>
        ) : (
            <List>
                <Scrollbar>
                    {cart.map((product) => (
                        <CartItem key={product._id} product={product} />
                    ))}
                </Scrollbar>
            </List>
        )}
    </Grid>
    <Grid xs={12} md={6} >
        <Stack spacing={3}>

            <Card>
                <CardContent>
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Preview Order
                    </Typography>
                    <Box>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant="h4" fontWeight="600">
                                    Billing Address:
                                </Typography>
                                <CustomButton variant="outlined" size="small" >
                                    Edit
                                </CustomButton>
                            </Box>
                            <Typography variant="subtitle1">Full Name:</Typography>
                            <Typography variant="body1">
                                {`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}
                            </Typography>
                            <Typography variant="subtitle1">Address:</Typography>
                            <Typography variant="body1">{order.shippingAddress.street1}</Typography>
                            <br />
                            {order.shippingAddress.street2 && (
                                <>
                                    <Typography variant="body1">{`${order.shippingAddress.street2}, `}</Typography>
                                    <Typography variant="body1">{order.shippingAddress.city}</Typography>
                                </>
                            )}
                            <Typography variant="body1">{`${order.shippingAddress.state} ${order.shippingAddress.zipCode}`}</Typography>
                            <Typography variant="body1">{order.shippingAddress.country}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h4" fontWeight="600">
                                Contact Information:
                            </Typography>
                            <CustomButton variant="outlined" size="small" >
                                Edit
                            </CustomButton>
                        </Box>
                        <Typography variant="subtitle1">Email:</Typography>
                        <Typography variant="body1">{order.email}</Typography>
                        <Typography variant="subtitle1">Phone Number:</Typography>
                        <Typography variant="body1">{order.phoneNumber}</Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h4" fontWeight="600">
                                Payment Method:
                            </Typography>
                            <CustomButton variant="outlined" size="small"  >
                                Edit
                            </CustomButton>
                        </Box>
                        <Typography variant="body1">{order.paymentMethod}</Typography>
                    </Box>
                </CardContent>
            </Card>
            <Card>
                <CardContent >
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Order Summary
                    </Typography>
                    <OutlinedInput fullWidth placeholder="Discount Code" size="small" sx={{ mt: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button type="button">Apply Coupon</Button>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5">Subtotal</Typography>
                        <Typography variant="h5">{formattedSubtotal}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5">Shipping Tax</Typography>
                        <Typography variant="h5">{formattedShippingTax}</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5">Total</Typography>
                        <Typography variant="h5">{formattedTotal}</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Stack>
    </Grid>
</Grid>  )
}
OneOrder.propTypes = {
    order: PropTypes.object,
};
export default OneOrder