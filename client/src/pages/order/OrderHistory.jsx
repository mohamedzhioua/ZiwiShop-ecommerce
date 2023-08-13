 import Heading from "../../components/ui/Heading"
import { Divider ,Box, Container} from "@mui/material"
import OrderHistoryTable from "../../components/Order/OrderHistoryTable"
import { useCallback, useEffect, useState } from "react"
import { orderApi } from "../../api/orderApi"
import { useMounted } from "../../hooks/use-mounted"
import { toast } from 'react-hot-toast';

function OrderHistory() {
  const [orders, setOrders] = useState([])
  const isMounted = useMounted()
  
  const GetMyOrders = useCallback(async () => {
    try {
      toast.promise(
        orderApi.GetMyOrders(),
        {
          loading: 'Fetching data...',
          error: 'Error while fetching data',
        },
        { id: 'fetching', success: { style: { display: 'none' } } }
      )
        .then((response) => {
          if (isMounted()) {
            setOrders(response);
          }
        })
        .catch((error) => {
          if (isMounted()) {
            console.error(error);
          }
        });
    } catch (err) {
      console.error(err);
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