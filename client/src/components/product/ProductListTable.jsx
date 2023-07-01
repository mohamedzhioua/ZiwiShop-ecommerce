
import { Card, IconButton, InputAdornment, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import numeral from 'numeral';
import { useState } from 'react';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
 
 

 
const applyFilters = (products, query) => {
  return products.filter((product) => {
    return product.name.toLowerCase().includes(query.toLowerCase());
  });
};

const applyPagination = (products, page, limit) => products
  .slice(page * limit, page * limit + limit);

const ProductListTable = (props) => {
  const { products } = props;
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);


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
  return (
    <Card >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          m: -1,
          p: 2
        }}
      >
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 500
          }}
        >
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onChange={handleQueryChange}
            placeholder="Search products"
            value={query}
            variant="outlined"
          />
        </Box>
      </Box>
      <Box sx={{ minWidth: 1200 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Inventory
              </TableCell>
              <TableCell>
                Details
              </TableCell>
              <TableCell>
                Attributes
              </TableCell>
              <TableCell>
                Price
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((product) => {
              // const isProductSelected = selectedProducts.includes(product.id);

              return (
                <TableRow
                  hover
                  key={product.id}
                  // selected={isProductSelected}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {product.image
                        ? (
                          <Box
                            sx={{
                              alignItems: 'center',
                              backgroundColor: 'background.default',
                              display: 'flex',
                              height: 100,
                              justifyContent: 'center',
                              overflow: 'hidden',
                              width: 100,
                              '& img': {
                                height: 'auto',
                                width: '100%'
                              }
                            }}
                          >
                            <img
                              alt="Product"
                              src={product.image}
                            />
                          </Box>
                        )
                        : (
                          <Box
                            sx={{
                              alignItems: 'center',
                              backgroundColor: 'background.default',
                              display: 'flex',
                              height: 100,
                              justifyContent: 'center',
                              width: 100
                            }}
                          >
                            <BrokenImageOutlinedIcon fontSize="small" />
                          </Box>
                        )}
                      <Link
                        color="textPrimary"
                        component={Link}
                        to="#"
                        underline="none"
                        sx={{ ml: 2 }}
                        variant="subtitle2"
                      >
                        {product.name}
                      </Link>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {/* {getInventoryLabel(product.inventoryType)} */}
                  </TableCell>
                  <TableCell>
                    {product.quantity}
                    {' '}
                    in stock
                    {product.variants > 1 && ` in ${product.variants} variants`}
                  </TableCell>
                  <TableCell>
                    {product.attributes.map((attr) => attr)}
                  </TableCell>
                  <TableCell>
                    {numeral(product.price)
                      .format(`${product.currency}0,0.00`)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
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
      </Box>
    </Card>
  );
};

ProductListTable.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductListTable;
