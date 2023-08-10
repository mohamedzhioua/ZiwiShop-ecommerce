import { Divider } from "@mui/material"
import CustomButton from "../../../components/ui/CustomButton"
import { Box, Container } from "@mui/system"
import AddIcon from '@mui/icons-material/Add';
import Heading from "../../../components/ui/Heading";
import ProductListTable from "../../../components/dashboard/product/ProductListTable";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { productApi } from "../../../api/productApi";
import { useMounted } from "../../../hooks/use-mounted";
import { toast } from "react-hot-toast";

function ProductsList() {
 const isMounted = useMounted()
  const [products, setProducts] = useState([])

  const GetProducts = useCallback(async () => {
    try {
      toast.promise(
        productApi.GetProducts(),
        {
          loading: 'Fetching data...',
          error: 'Error while fetching data',
        },
        { id: 'fetching', success: { style: { display: 'none' } } }
      )
        .then((response) => {
          if (isMounted()) {
            setProducts(response);
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
    GetProducts();
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
          <Heading title={`Products (${products.length})`} description="Manage products for your store" />

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