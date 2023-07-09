import { Divider } from '@mui/material'
import { Box, Container } from '@mui/system';
import Heading from '../../../components/Heading'
 import { useParams } from 'react-router-dom';
import CategoryForm from '../../../components/category/CategoryForm';
 

 
function CategoryEdit() {
  const { id } = useParams();
 
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
          <Heading title='Edit category'  description='Edit a category.' />
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: '1rem',
            marginRight: '1rem',
          }} />
        <CategoryForm    id={id}/>
      </Container >

    </>
  )
}

export default CategoryEdit