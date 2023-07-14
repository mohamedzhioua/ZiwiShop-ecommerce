import Heading from '../../../components/ui/Heading'
import CustomButton from '../../../components/ui/CustomButton'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import { Box, Container } from '@mui/system';
import { Divider } from '@mui/material';
import BrandListTable from '../../../components/brand/BrandListTable';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMounted } from '../../../hooks/use-mounted';
import { brandApi } from '../../../api/brandApi';


function BrandList() {
  const isMounted = useMounted()
  const [brands, setBrands] = useState([])

  const getBrands = useCallback(async () => {
    try {
      toast.promise(
        brandApi.GetBrands(),
        {
          loading: 'Fetching data...',
          error: 'Error while fetching data',
        },
        { id: 'fetching', success: { style: { display: 'none' } } }
      )
        .then((response) => {
          if (isMounted()) {
            setBrands(response);
          }
        })
        .catch((error) => {
          if (isMounted()) {
            console.error(error);
          }
        });
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Heading title={`Brands (${brands?.length})`} description="Manage brands for your products" />

          <CustomButton
            component={Link}
            to="/dashboard/brands/add"
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
        <BrandListTable brands={brands} />
      </Container >
    </>
  )
}

export default BrandList