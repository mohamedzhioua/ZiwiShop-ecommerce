import Heading from '../../../components/Heading'
import CustomButton from '../../../components/CustomButton'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import { Box, Container } from '@mui/system';
import { Divider } from '@mui/material';
import SizeListTable from '../../../components/size/SizeListTable';

function SizeList() {
  const data = [1, 1]
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
          <Heading title={`Sizes (${data?.length})`} description="Manage sizes for your products" />

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
        <SizeListTable />
      </Container >
    </>
  )
}

export default SizeList