import {
    Alert,
    Box,
    Card,
    CardContent,
    Divider,
    Unstable_Grid2 as Grid,
    List,
    Typography,
    useMediaQuery
} from '@mui/material';
import { Scrollbar } from '../ui/Scrollbar';
import PropTypes from 'prop-types';
import { Stack } from '@mui/system';
import OrderItems from './OrderItem';
import { currencyFormatter } from "../../utils/currencyFormatter";
import PaypalButtons from '../ui/PaypalButtons';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { orderApi } from '../../api/orderApi';
import { formatDate } from '../../utils/dateFormatter';

const OneOrder = (props) => {
    const { data } = props
    const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [order, setOrder] = useState(data)

    const payOrder = async (id, details) => {
        try {
            const response = await orderApi.PayOrder(id, details);
            toast.success('Order is paid');
            setOrder(response);
        } catch (err) {
            toast.error(err);
        }
    };
    useEffect(() => {
        setOrder(data);
    }, [data]);

    return (
        <Grid container spacing={3}>
            <Grid xs={12} md={8}>
                <Stack spacing={3}>
                    <Card>
                        <CardContent>
                            <Stack spacing={1} sx={{ marginBottom: 2 }}>
                                <Typography variant="h4" fontWeight="700">
                                    Shipping Address :
                                </Typography>
                                <Box>
                                    <Typography variant="h5" fontWeight="600">Full Name:</Typography>
                                    <Typography variant="subtitle1">
                                        {order.shippingAddress.fullName}
                                    </Typography>
                                    <Typography variant="h5" fontWeight="600">Address:</Typography>
                                    <Typography variant="subtitle1">{`${order.shippingAddress.country} ${order.shippingAddress.street1} ${order.shippingAddress.city} ${order.shippingAddress.state}  ${order.shippingAddress.zipCode}`}</Typography>
                                    <br />
                                    {order.shippingAddress.street2 && (
                                        <>
                                            <Typography variant="subtitle1">{`${order.shippingAddress.street2}`}</Typography>
                                        </>
                                    )}
                                </Box>
                                {
                                    order.isDelivered ?
                                        (
                                            <Alert severity="success" style={{ fontSize: "17px" }}>{`Delivered at ${formatDate(order?.deliveredAt)}`}
                                            </Alert>
                                        ) : (
                                            <Alert severity="error" style={{ fontSize: "17px" }}>Still Not delivred Yet</Alert>
                                        )
                                }

                            </Stack>
                            <Stack spacing={1}>
                                <Typography variant="h4" fontWeight="700">
                                    Payment :
                                </Typography>
                                <Box>
                                    <Typography variant="h5" fontWeight="600">
                                        Payment Method:
                                    </Typography>

                                    <Typography variant="subtitle1">{order.paymentMethod}</Typography>
                                </Box>
                                {
                                    order.isPaid ?
                                        (
                                            <Alert severity="success" style={{ fontSize: "17px" }}>{`Paid at ${formatDate(order?.paidAt)}`}
                                            </Alert>
                                        ) : (
                                            <Alert severity="error" style={{ fontSize: "17px" }}>Still Not Paid Yet</Alert>
                                        )
                                }
                            </Stack>

                            <List
                                sx={{
                                    maxHeight: '800px',
                                    overflow: 'auto',
                                    ...(isMobileScreen && { flexGrow: 1 }),
                                }}
                            >
                                <Scrollbar>
                                    {order?.orderItems?.map((product) => (
                                        <OrderItems key={product._id} product={product} />
                                    ))}
                                </Scrollbar>
                            </List>
                        </CardContent>
                    </Card>
                </Stack>
            </Grid>
            <Grid xs={12} md={4} >
                <Card>
                    <CardContent >
                        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Order Summary
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5">Subtotal</Typography>
                            <Typography variant="h5">{currencyFormatter.format(order.itemsPrice)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5">Shipping Tax</Typography>
                            <Typography variant="h5">{currencyFormatter.format(order.shippingPrice)}</Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5">Order Total</Typography>
                            <Typography variant="h5">{currencyFormatter.format(order.totalPrice)}</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            {!order.isPaid && (
                                <PaypalButtons
                                    totalPrice={order?.totalPrice}
                                    id={order?._id}
                                    payOrder={payOrder}
                                />
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid >)
}
OneOrder.propTypes = {
    data: PropTypes.object,
};
export default OneOrder