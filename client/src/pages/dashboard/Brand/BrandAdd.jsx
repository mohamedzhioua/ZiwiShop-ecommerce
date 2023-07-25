import { Divider } from '@mui/material'
import { Box, Container } from '@mui/system';
import Heading from '../../../components/ui/Heading'
import BrandForm from '../../../components/dashboard/brand/BrandForm';


function CategoryAdd() {

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
          <Heading title='Create Brand' description='Add a new brand' />
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: '1rem',
            marginRight: '1rem',
          }} />
        <BrandForm />
      </Container >

    </>
  )
}

export default CategoryAdd