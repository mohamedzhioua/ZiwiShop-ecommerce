import { Divider ,Box, Container} from '@mui/material'
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Heading from '../../../components/ui/Heading';
import { brandApi } from '../../../api/brandApi';
import BrandForm from '../../../components/Dashboard/brand/BrandForm';


const useBrand = (id) => {
  const [brand, setBrand] = useState(null);

  const GetOneBrand = useCallback(async () => {
    try {
      const response = await brandApi.GetOneBrand(id);
      setBrand(response);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    GetOneBrand();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return brand;
};
function BrandEdit() {
  const { id } = useParams();
  const brand = useBrand(id);


  if (!brand) {
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
          <Heading title='Edit brand' description='Edit a brand.' />
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: '1rem',
            marginRight: '1rem',
          }} />
        <BrandForm initialData={brand} />
      </Container >

    </>
  )
}

export default BrandEdit