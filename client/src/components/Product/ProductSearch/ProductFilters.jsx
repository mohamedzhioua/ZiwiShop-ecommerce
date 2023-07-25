import PropTypes from 'prop-types';
import { Unstable_Grid2 as Grid, IconButton, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import FilterListIcon from '@mui/icons-material/FilterList';
import PriceRangeFilter from './PriceRangeFilter';
import CustomButton from '../../ui/CustomButton';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ProductAutocomplete from './ProductAutocomplete';
const size = [
  {
    _id: "64a43ccda385e2aecb90b1df",
    name: "Extra Large "
  },
  {
    _id: "64a4611e391f376bcaa2bd07",
    name: "Meduim"
  },
  {
    _id: "64a463c7391f376bcaa2bd12",
    name: "extra small"
  },
  {
    _id: "64a4641f391f376bcaa2bd1a",
    name: "small"
  },
  {
    _id: "64a46434391f376bcaa2bd1f",
    name: "double extra large"
  },
  {
    _id: "64a46449391f376bcaa2bd24",
    name: "triple extra large"
  }
]
const brand = [

  {
    _id: '64a858793e772c0aad8c879c',
    name: 'Adidas'
  },
  {
    _id: '64a858993e772c0aad8c87a1',
    name: 'Louis Vuitton'
  },
  {
    _id: '64a858b63e772c0aad8c87a6',
    name: 'GUCCI'
  },
  {
    _id: '64a858cb3e772c0aad8c87ad',
    name: 'NIKE'
  },
  {
    _id: '64b03983ec95da3aad0ed8b5',
    name: 'Celio'
  }]
  

const ProductFilters = (props) => {
  const { onClose, drawerView } = props

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
        {onClose && drawerView && (
          <CustomButton
            onClick={onClose}
            sx={{ alignSelf: 'flex-end' }}
          >
            <RemoveRedEyeOutlinedIcon sx={{ marginRight: 1, height: '1rem', width: '1rem' }} /> See Products
          </CustomButton>)}
        <Grid item xs={12}>
          <PriceRangeFilter />
        </Grid>
        <Grid item xs={12} style={{ width: '100%' }} >
          <ProductAutocomplete data={size} Name="sizes"/>
        </Grid>
        <Grid item xs={12} style={{ width: '100%' }} >
          <ProductAutocomplete data={brand} Name="brand"/>
        </Grid>
      </Stack>

    </Box>
  )
}
ProductFilters.propTypes = {
  onClose: PropTypes.func,
  drawerView: PropTypes.string,
};
export default ProductFilters