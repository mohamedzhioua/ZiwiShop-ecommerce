import { Box, Container } from "@mui/system"
import ProductForm from "../../../components/product/ProductForm"
import Heading from "../../../components/Heading"
import { Divider } from "@mui/material"
import { productApi } from "../../../api/productApi"
import { useCallback, useEffect, useState } from "react"


function ProductAdd() {
  const [options, setOptions] = useState({
    categories: [],
    sizes: []
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
  }, [getOptions]);
  
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
            marginTop: "5rem",
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
        <ProductForm options={options} />
      </Container >
    </>
  )
}

export default ProductAdd