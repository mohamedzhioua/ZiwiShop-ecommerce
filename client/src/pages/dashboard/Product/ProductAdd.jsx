 import { Box, Container } from "@mui/system"
import ProductForm from "../../../components/product/ProductForm"
import Heading from "../../../components/Heading"
import { Divider } from "@mui/material"
 

function ProductAdd() {
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
          <ProductForm />
       </Container >
    </>
  )
}

export default ProductAdd