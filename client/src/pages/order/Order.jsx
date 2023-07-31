
import { Box, Container } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { orderApi } from '../../api/orderApi';
import { useParams } from 'react-router-dom';
import { Divider } from '@mui/material';
import Heading from '../../components/ui/Heading';
import OneOrder from '../../components/Order/OneOrder';

const useOrder = (id) => {
  const [order , setOrder] = useState(null)
  const GetOneOrder = useCallback(async () => {
  try {
    const response = await orderApi.GetOneOrder(id);
    setOrder(response);
  } catch (err) {
    console.error(err);
  }
}, [id]);

useEffect(() => {
  GetOneOrder();
},
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

return order;
};
function Order() {
const { id } = useParams();
const order = useOrder(id);


if (!order) {
  return null;
}

return (
  <>
  <Container maxWidth='xl' >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: '1rem',
        marginRight: '1rem',
        marginTop: '1rem',
       }}
    >
      <Heading title=''  description={`Order ( ${order._id} )`} />
    </Box>
    <Divider
      sx={{
        marginY: 2,
        marginLeft: '1rem',
        marginRight: '1rem',
      }} />
    <OneOrder  order={order}/>
  </Container >

</>
);
}

export default Order