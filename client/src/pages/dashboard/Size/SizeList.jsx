import Heading from '../../../components/Heading'
import CustomButton from '../../../components/CustomButton'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import { Box, Container } from '@mui/system';
import { Divider } from '@mui/material';
import SizeListTable from '../../../components/size/SizeListTable';
import { useCallback, useEffect, useState } from 'react';
 import { toast } from 'react-hot-toast';
import { sizeApi } from '../../../api/sizeApi';


function SizeList() {
  const [sizes, setSizes] = useState([])

  const getSizes = useCallback(async () => {
    try {
      toast.promise(
        sizeApi.GetSizes(),
        {
          loading: 'Fetching data...',
          error: 'Error while fetching data',
        },
        { id: 'fetching', success: { style: { display: 'none' } } }
      )
        .then((response) => {
          setSizes(response);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getSizes();
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
          <Heading title={`Sizes (${sizes?.length})`} description="Manage sizes for your products" />

          <CustomButton
            component={Link}
            to="/dashboard/sizes/add"
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
        <SizeListTable sizes={sizes}/>
      </Container >
    </>
  )
}

export default SizeList