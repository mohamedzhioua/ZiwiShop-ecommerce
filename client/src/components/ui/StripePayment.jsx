import {
    Button, TextField, Unstable_Grid2 as Grid,
} from '@mui/material';
import { Box } from '@mui/system';
import {
    CardElement,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { paymentApi } from '../../api/PaymentApi';
import { useEffect, useState } from 'react';

const StripePayment = (props) => {
    const { totalPrice, id, payOrder } = props
    const [clientSecret, setClientSecret] = useState("");
    console.log("🚀 ~ file: StripePayment.jsx:19 ~ StripePayment ~ clientSecret:", clientSecret)
    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
   const fetchClientSecret = async () =>{
       const clientSecret = await paymentApi.paymentProcess(totalPrice);
       setClientSecret(clientSecret)     }
     fetchClientSecret();
   }, []);

    const handleStripePayment = async () => {
        if (!stripe || !elements) {
            // Handle error or show a message
            return;
        }

        const paymentDetails = {
            paymentMethod: 'stripe',
        };
        await stripe.redirectToCheckout({ sessionId: id })
        // await payOrder(id, paymentDetails);
    };

    return (
        <form onSubmit={handleStripePayment} style={{ width: '100%' }}>
            <Grid container spacing={3}>
                
                <Grid item xs={12} sm={12}>
                    <label style={{ paddingBottom: '5px' }}>Name on Card</label>

                    <TextField fullWidth placeholder='Jhon Doe' name="cardOwner"  />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <label style={{ paddingBottom: '5px' }}>Card Number</label>

                    <Box
                        sx={{
                            width: '100%',
                            border: '1px solid',
                            p: 1.5,
                            borderRadius: '5px',
                        }}
                    >
                        <CardNumberElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '19px',
                                        lineHeight: 1.5,
                                        color: '#444',
                                    },
                                    empty: {
                                        color: '#3a120a',
                                        backgroundColor: 'transparent',
                                        '::placeholder': {
                                            color: '#444',
                                        },
                                    },
                                },
                            }}
                        />
                    </Box>
                </Grid>

            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <label style={{ paddingBottom: '5px' }}>Exp Date</label>


                    <Box
                        sx={{
                            width: '100%',
                            border: '1px solid',
                            p: 1.5,
                            borderRadius: '5px',
                        }}
                    ><CardExpiryElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '19px',
                                        lineHeight: 1.5,
                                        color: '#444',
                                    },
                                    empty: {
                                        color: '#3a120a',
                                        backgroundColor: 'transparent',
                                        '::placeholder': {
                                            color: '#444',
                                        },
                                    },
                                },
                            }}
                        /></Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <label style={{ paddingBottom: '5px' }}>CVV</label>
                    <Box
                        sx={{
                            width: '100%',
                            border: '1px solid',
                            p: 1.5,
                            borderRadius: '5px',
                        }}
                    >
                        <CardCvcElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '19px',
                                        lineHeight: 1.5,
                                        color: '#444',
                                    },
                                    empty: {
                                        color: '#3a120a',
                                        backgroundColor: 'transparent',
                                        '::placeholder': {
                                            color: '#444',
                                        },
                                    },
                                },
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
          
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                    backgroundColor: '#f63b60',
                    '&:hover': {
                        backgroundColor: '#d32f4b',
                    },
                    textTransform: 'none',
                    height: '45px',
                    borderRadius: '5px',
                    fontSize: '18px',
                    fontWeight: 600,
                    marginTop: '10px',
                }}
            >
                Submit
            </Button>
              </form>
    );
};

export default StripePayment;
