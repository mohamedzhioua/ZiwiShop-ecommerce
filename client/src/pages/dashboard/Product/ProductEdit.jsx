import { Divider } from '@mui/material'
import { Box, Container } from '@mui/system';
import Heading from '../../../components/ui/Heading'
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { productApi } from '../../../api/productApi';
import ProductForm from '../../../components/product/ProductForm';

const useProduct = (id) => {
  const [product, setProduct] = useState(null);

  const GetOneProduct = useCallback(async () => {
    try {
      const response = await productApi.GetOneProduct(id);
      setProduct(response);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    GetOneProduct();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return product;
};
function ProductEdit() {
  const { id } = useParams();
  const product = useProduct(id);
 
  const [options, setOptions] = useState({
    categories: [],
    sizes: [],
    brands: []
})
const getOptions = useCallback(async () => {
  try {
      const result = await productApi.Getoptions()
      setOptions(result)
  } catch (err) {
      console.error(err);
  }
}, []);

useEffect(() => {
  getOptions();
}, []);

  if (!product) {
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
          marginTop: '5rem',
        }}
      >
        <Heading title='Edit product' description='Edit a product.' />
      </Box>
      <Divider
        sx={{
          marginY: 2,
          marginLeft: '1rem',
          marginRight: '1rem',
        }} />
      <ProductForm initialData={product}  options={options}/>
    </Container >

  </>
  )
}

export default ProductEdit