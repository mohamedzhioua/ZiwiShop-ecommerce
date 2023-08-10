import { Divider ,Box, Container} from '@mui/material'
import Heading from '../../../components/ui/Heading'
import SizeForm from '../../../components/Dashboard/size/SizeForm';


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