import Heading from "../../../components/ui/Heading"
import { Box, Container, Divider } from "@mui/material"
import { productApi } from "../../../api/productApi"
import { useCallback, useEffect, useState } from "react"
import ProductForm from '../../../components/dashboard/product/ProductForm'


function ProductAdd() {

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  return (
    <>
      <Container maxWidth='xl' >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "1rem",
            marginRight: "1rem",
           }}
        >
          <Heading title="Create product" description="Add a new product" />
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        />
        <ProductForm options={options}/>
      </Container >
    </>
  )
}

export default ProductAdd