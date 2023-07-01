import { Box } from "@mui/system"
import Heading from '../Heading';
import { Card, CardContent, CardHeader, Divider } from "@mui/material"
import FileDropzone from "../FileDropzone";

const ProductForm = () => {
    // const initialData = false
    // const title = initialData ? 'Edit product' : 'Create product';
    // const description = initialData ? 'Edit a product.' : 'Add a new product';
    // const toastMessage = initialData ? 'Product updated.' : 'Product created.';
    // const action = initialData ? 'Save changes' : 'Create';
    return (
        <>        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: '1rem',
                marginRight: '1rem',
                marginTop: '5rem',
            }}
        >
            <Heading title="Create product" description="Add a new product" />

        </Box>

            <Divider
                sx={{
                    marginY: 2,
                    marginLeft: '1rem',
                    marginRight: '1rem',
                }} />
                 <Box sx={{ mt: 3 }}>
                <Card>
                  <CardHeader title="Upload Images" />
                  <CardContent>
                    <FileDropzone
                      accept="image/*"
                      files={files}
                      onDrop={handleDrop}
                      onRemove={handleRemove}
                      onRemoveAll={handleRemoveAll}
                    />
                  </CardContent>
                </Card>
              </Box>
        </>

    )
}

export default ProductForm