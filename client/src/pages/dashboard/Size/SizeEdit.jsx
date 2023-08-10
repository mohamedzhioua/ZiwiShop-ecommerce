import { Divider ,Box, Container} from '@mui/material'
import Heading from '../../../components/ui/Heading'
import SizeForm from '../../../components/dashboard/size/SizeForm';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { sizeApi } from '../../../api/sizeApi';


const useSize = (id) => {
  const [size, setSize] = useState(null);

  const GetOneSize = useCallback(async () => {
    try {
      const response = await sizeApi.GetOneSize(id);
      setSize(response);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    GetOneSize();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return size;
};
function SizeAdd() {
  const { id } = useParams();
  const size = useSize(id);
 

  if (!size) {
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
          <Heading title='Edit size'  description='Edit a size.' />
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: '1rem',
            marginRight: '1rem',
          }} />
        <SizeForm  initialData={size}/>
      </Container >

    </>
  )
}

export default SizeAdd