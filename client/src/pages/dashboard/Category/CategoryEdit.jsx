import { Divider } from '@mui/material'
import { Box, Container } from '@mui/system';
import Heading from '../../../components/ui/Heading'
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import CategoryForm from '../../../components/dashboard/category/CategoryForm';
import { categoryApi } from '../../../api/categoryApi';
import useCategory from '../../../hooks/useCategory';


const useCategorie = (id) => {
  const [category, setCategory] = useState(null);

  const GetOneCategory = useCallback(async () => {
    try {
      const response = await categoryApi.GetOneCategory(id);
      setCategory(response);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    GetOneCategory();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return category;
};
function CategoryEdit() {
  const { id } = useParams();
  const category = useCategorie(id);
  const { categoryParents } = useCategory();


  if (!category) {
    return null;
  }



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
          <Heading title='Edit category' description='Edit a category.' />
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: '1rem',
            marginRight: '1rem',
          }} />
        <CategoryForm initialData={category} categoryParents={categoryParents} />
      </Container >

    </>
  )
}

export default CategoryEdit