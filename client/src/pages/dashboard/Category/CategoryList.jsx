import Heading from '../../../components/Heading'
import CustomButton from '../../../components/CustomButton'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import { Box, Container } from '@mui/system';
import { Divider } from '@mui/material';
import CategoryListTable from '../../../components/category/CategoryListTable';
import useCategory from '../../../hooks/useCategory';


function CategoryList() {
  const {categories} = useCategory()
 

  return (
    <>
      <Container maxWidth='xl'>
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
          <Heading title={`Categories (${categories?.length})`} description="Manage Categories for your products" />

          <CustomButton
            component={Link}
            to="/dashboard/categories/add"
          >
            <AddIcon sx={{ marginRight: 1, height: '1rem', width: '1rem' }} /> Add New
          </CustomButton>
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: '1rem',
            marginRight: '1rem',
          }} />
        <CategoryListTable categories={categories} />
      </Container >
    </>
  )
}

export default CategoryList