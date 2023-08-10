import { Box, Container } from "@mui/system"
import Heading from "../../components/ui/Heading"
import { Divider } from "@mui/material"
import OrderHistoryTable from "../../components/Order/orderHistoryTable"
import { useCallback, useEffect, useState } from "react"
import { orderApi } from "../../api/orderApi"
import { useMounted } from "../../hooks/use-mounted"
 
function OrderHistory() {
  const [orders, setOrders] = useState([])
  const isMounted = useMounted()

  const GetMyOrders = useCallback(async () => {
    try {
      const response = await orderApi.GetMyOrders();
      if (isMounted()) {
        setOrders(response);
       }
    } catch (error) {
      console.error(error);
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    GetMyOrders();
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
      <Heading title='order history'  description={``} />
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

export default OrderHistory