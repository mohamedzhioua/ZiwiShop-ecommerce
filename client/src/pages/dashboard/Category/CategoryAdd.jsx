import { Divider } from '@mui/material'
import { Box, Container } from '@mui/system';
import Heading from '../../../components/ui/Heading'
import CategoryForm from '../../../components/dashboard/category/CategoryForm';
import useCategory from '../../../hooks/useCategory';
 
 

function CategoryAdd() {
  const { categoryParents } = useCategory();

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
          <Heading title='Create Category' description='Add a new Category' />
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: '1rem',
            marginRight: '1rem',
          }} />
        <CategoryForm   categoryParents={categoryParents}/>
      </Container >

    </>
  )
}

export default CategoryAdd