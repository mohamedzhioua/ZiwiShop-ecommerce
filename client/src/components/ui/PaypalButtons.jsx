import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { toast } from "react-hot-toast";
 
const PaypalButtons = (props) => {
  const { totalPrice , id ,payOrder} = props
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();


  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
           
          },
        ],
      })
      .then((id) => {
        return id;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
        payOrder(id, details);    
    });
  }
  const  onError = (err) => {
    toast.error((err));
  }

  useEffect(() => {

    const loadPaypalScript = async () => {
      const { data: clientId } = await axiosInstance.get('/api/keys/paypal');
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    }
    loadPaypalScript();

  }, [paypalDispatch]);

  return (
    <>
      {isPending ? (
        <Typography variant="h4" >Loading PayPal...</Typography>
      ) : (
        <Box>
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        </Box>
      )}
    </>
  )
}
PaypalButtons.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  id:PropTypes.string.isRequired,
  payOrder:PropTypes.func.isRequired
}
export default PaypalButtons