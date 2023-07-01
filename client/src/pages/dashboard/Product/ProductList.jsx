import { Divider } from "@mui/material"
import CustomButton from "../../../components/CustomButton"
import { Box, Container } from "@mui/system"
import AddIcon from '@mui/icons-material/Add';
import Heading from "../../../components/Heading";
import ProductListTable from "../../../components/product/ProductListTable";
import { Link } from "react-router-dom";

function ProductsList() {
  const data = [1, 1]
  const products = []
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
          <Heading title={`Products (${data.length})`} description="Manage products for your store" />

          <CustomButton
            component={Link}
            to="/dashboard/products/add"
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
        <Box sx={{ mt: 3 }}>
          <ProductListTable products={products} />
        </Box>
      </Container >
    </>
  )
}

export default ProductsList