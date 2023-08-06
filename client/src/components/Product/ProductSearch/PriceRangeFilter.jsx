 import CustomInput from '../../ui/CustomInput';
import { Slider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect  } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { useLocation, useNavigate } from 'react-router-dom';
import { createQueryString } from '../../../utils/queryString';
import PropTypes from 'prop-types';

const PriceRangeFilter = (props) => {
  const { priceRangeValue, setPriceRangeValue }=props
   const navigate = useNavigate();
  const location = useLocation();
   const searchParams = new URLSearchParams(location.search);
 
  const minmin = 0;
  const maxmax = 1000;
  const debouncedPrice = useDebounce(priceRangeValue, 500)
 
  useEffect(() => {
    const [min, max] = debouncedPrice
       const queryString = createQueryString(searchParams,{
        price_range: `${min}-${max}`,
      })
      navigate(`${location.pathname}?${queryString}`);
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPrice])

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRangeValue(newValue);
  };
  return (
    <Stack spacing={2}>
      <Typography variant="h6" fontWeight="bold">
        Price Range
      </Typography>
      <Slider
        getAriaLabel={() => "Price range"}
        value={priceRangeValue}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={minmin}
        max={maxmax}
        color='secondary'
      />
      <Stack direction="row" justifyContent="space-evenly" alignItems="center">
        <CustomInput
          label="min"
          type="number"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={priceRangeValue[0]}
          onChange={(e) => {
            setPriceRangeValue([Number(e.target.value), priceRangeValue[1]]);
          }}
        />
        <Typography>-</Typography>
        <CustomInput
          label="max"
          type="number"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={priceRangeValue[1]}
          onChange={(e) => {
            setPriceRangeValue([priceRangeValue[0], Number(e.target.value)]);
          }}
        />
      </Stack>

    </Stack>
  )
}
PriceRangeFilter.propTypes = {
  priceRangeValue: PropTypes.array.isRequired,
  setPriceRangeValue: PropTypes.func.isRequired,
};
export default PriceRangeFilter