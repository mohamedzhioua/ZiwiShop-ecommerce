import { Divider } from "@mui/material"
import Heading from "../../components/ui/Heading"
import { Box, Container } from "@mui/system"
 
 
function Overview() {
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
      <Heading  title="Dashboard" description="Overview of your store"/>
    </Box>
    <Divider
      sx={{
        marginY: 2,
        marginLeft: '1rem',
        marginRight: '1rem',
      }} />
            
   </Container >

</>
  )
}

export default Overview