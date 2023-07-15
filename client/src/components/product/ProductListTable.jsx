
import PropTypes from 'prop-types';
import { Box, Card, IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useEffect, useState } from 'react';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import { Scrollbar } from '../ui/Scrollbar';
import TableSearchBar from '../TableSearchBar';
import AlertModal from '../ui/modals/AlertModal';
import { formatter } from '../../utils/currencyFormatter';
import { formatDate } from '../../utils/dateFormatter';
import { toast } from 'react-hot-toast';
import { productApi } from '../../api/productApi';
import { toTitleCase } from '../../utils/toTitleCase';




const applyFilters = (products, query) => {
  return products.filter((product) => {
    return product.name.toLowerCase().includes(query.toLowerCase());
  });
};

const applyPagination = (products, page, limit) => products
  .slice(page * limit, page * limit + limit);

const ProductListTable = (props) => {
  const { products: initialSizes } = props;
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState('');

  useEffect(() => {
    setProducts(initialSizes);
}, [initialSizes]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };
  const filteredProducts = applyFilters(products, query);
  const paginatedProducts = applyPagination(filteredProducts, page, limit);
  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };
  const onRowsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/products/edit/${id}`);
  };
const handleDelete = (id) => {
  setProductId(id);
        setOpen(true);
    };
    const onDelete = async () => {
        try {
            setLoading(true);
            await productApi.DeleteProduct(productId);
            toast.success('Product deleted.');
            setProducts(products.filter((item) => item._id !== productId));
        } catch (error) {
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
            setOpen(false);
            setProductId(null)
        }
    };
  return (
    <>
      <AlertModal
      isOpen={open}
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
      />
      <Card >
        <TableSearchBar
          handleQueryChange={handleQueryChange}
          query={query}
        />
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Parent Category</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Featured</TableCell>
                <TableCell>Archived</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            {paginatedProducts.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="text.primary">No result</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {paginatedProducts.map((product) => {

                  return (
                    <TableRow hover key={product._id}   >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                          }}
                        >
                          {product.images && product.images.length > 0 ? (
                            <Box>
                              <img
                                alt="Product"
                                src={product.images[0].url}
                                style={{
                                  height: 100,
                                  width: 100,
                                  objectFit: 'cover',
                                }}
                              />
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'background.default',
                                display: 'flex',
                                height: 100,
                                justifyContent: 'center',
                                width: 100,
                              }}
                            >
                              <BrokenImageOutlinedIcon fontSize="small" />
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell> {toTitleCase(product.name)}</TableCell>
                      <TableCell>{product.category[0].parentCategory}</TableCell>
                      <TableCell>{product.category[0].name}</TableCell>
                      <TableCell>{toTitleCase(product?.brand.name)}</TableCell>
                      <TableCell>{formatter.format(product.price)}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.isFeatured ? "Yes" : "No"}</TableCell>
                      <TableCell>{product.isArchived ? "Yes" : "No"}</TableCell>
                      <TableCell>{formatDate(product.createdAt)}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleUpdate(product._id)}>
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(product._id)}>
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>

          <TablePagination
            component="div"
            count={filteredProducts.length}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Scrollbar>
      </Card>
    </>
  );
};

ProductListTable.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductListTable;
