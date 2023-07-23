import CustomInput from '../../ui/CustomInput';
import { Slider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';

const PriceRangeFilter = (props) => {
  // const {}=props
  const minmin = 0;
  const maxmax = 1000;
  const [priceRangeValue, setPriceRangeValue] = useState([0, 1000]);

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

export default PriceRangeFilter