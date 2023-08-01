import { Box, Container } from "@mui/system"
import Heading from "../../components/ui/Heading"
import { Divider } from "@mui/material"
import OrderHistoryTable from "../../components/Order/orderHistoryTable"
 
function OrderHistory() {
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
    <OrderHistoryTable   />
  </Container >

</>
  )
}

export default OrderHistory