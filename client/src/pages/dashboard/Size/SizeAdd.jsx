import { Divider } from '@mui/material'
import { Box, Container } from '@mui/system';
import Heading from '../../../components/ui/Heading'
import SizeForm from '../../../components/dashboard/size/SizeForm';


function SizeAdd() {

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
            marginTop: '5rem',
          }}
        >
          <Heading title='Create size' description='Add a new size' />
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: '1rem',
            marginRight: '1rem',
          }} />
        <SizeForm />
      </Container >

    </>
  )
}

export default SizeAdd