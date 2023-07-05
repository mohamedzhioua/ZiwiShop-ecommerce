import { Divider } from '@mui/material'
import { Box, Container } from '@mui/system';
import Heading from '../../../components/Heading'
import CategoryForm from '../../../components/category/CategoryForm';


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
        <CategoryForm />
      </Container >

    </>
  )
}

export default CategoryAdd