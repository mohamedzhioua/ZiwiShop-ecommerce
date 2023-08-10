import { Divider ,Box, Container} from '@mui/material'
import Heading from '../../../components/ui/Heading'
import useCategory from '../../../hooks/useCategory';
import CategoryForm from '../../../components/Dashboard/category/CategoryForm';
 
 

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