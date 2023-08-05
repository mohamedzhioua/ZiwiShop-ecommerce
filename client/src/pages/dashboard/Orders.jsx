import { Box, Container } from '@mui/system';
import  { useCallback, useEffect, useState } from 'react'
import Heading from '../../components/ui/Heading';
import { Divider } from '@mui/material';
import OrderHistoryTable from '../../components/Order/orderHistoryTable';
import { useMounted } from '../../hooks/use-mounted';
import { orderApi } from '../../api/orderApi';

function Orders() {
    const [orders, setOrders] = useState([])
  const isMounted = useMounted()

  const GetAllOrders = useCallback(async () => {
    try {
      const response = await orderApi.GetAllOrders();
      if (isMounted()) {
        setOrders(response);
       }
    } catch (error) {
      console.error(error);
    }
  }, []);


  useEffect(() => {
    GetAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      <Heading title={`orders (${orders?.length})`} description={``} />
    </Box>
    <Divider
      sx={{
        marginY: 2,
        marginLeft: '1rem',
        marginRight: '1rem',
      }} />
    <OrderHistoryTable  data={orders}  />
  </Container >

</>
  )
}

export default Orders