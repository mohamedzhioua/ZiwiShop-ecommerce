import PropTypes from 'prop-types';
import { Unstable_Grid2 as Grid, IconButton, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import FilterListIcon from '@mui/icons-material/FilterList';
import PriceRangeFilter from './PriceRangeFilter';
import CustomButton from '../../ui/CustomButton';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ProductAutocomplete from './ProductAutocomplete';
 

const ProductFilters = (props) => {
  const { onClose ,  sizes=[] , brands=[]} = props


  return (
    <Box sx={{ margin: "10px 20px 20px 20px" }}>
      <Stack
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        spacing={1}
      >
        <Typography variant="h4" style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: "center" }} alignSelf="flex-start">
          <IconButton>
            <FilterListIcon size="large" color='primary' />
          </IconButton>

          Filters
        </Typography>
        {onClose && (
          <CustomButton
            onClick={onClose}
            sx={{ alignSelf: 'flex-end' }}
          >
            <RemoveRedEyeOutlinedIcon sx={{ marginRight: 1, height: '1rem', width: '1rem' }} /> See Products
          </CustomButton>)}
        <Grid item xs={12}>
          <PriceRangeFilter  />
        </Grid>
        <Grid item xs={12} style={{ width: '100%' }} >
          <ProductAutocomplete data={sizes} Name="size"   />
        </Grid>
        <Grid item xs={12} style={{ width: '100%' }} >
          <ProductAutocomplete data={brands} Name="brand"  />
        </Grid>
      </Stack>

    </Box>
  )
}
ProductFilters.propTypes = {
  onClose: PropTypes.func.isRequired,
  sizes: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
 };
export default ProductFilters