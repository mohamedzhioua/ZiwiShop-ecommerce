import Heading from '../../../components/ui/Heading'
import CustomButton from '../../../components/ui/CustomButton'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import { Box, Container } from '@mui/system';
import { Divider } from '@mui/material';
import CategoryListTable from '../../../components/dashboard/category/CategoryListTable';
import useCategory from '../../../hooks/useCategory';
import { toast } from 'react-hot-toast';
import { useCallback, useEffect } from 'react';
import { categoryApi } from '../../../api/categoryApi';


function CategoryList() {
  const { categories, saveCategories } = useCategory()

  const getCategories = useCallback(async () => {
    try {
      toast.promise(
        categoryApi.GetCategories(),
        {
          loading: 'Fetching data...',
          error: 'Error while fetching data',
        },
        { id: 'fetching', success: { style: { display: 'none' } } }
      )
        .then((response) => {
          saveCategories(response);

        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth='xl'  sx={{marginBottom:'14px'}}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: '1rem',
            marginRight: '1rem',
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