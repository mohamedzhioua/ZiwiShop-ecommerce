import PropTypes from "prop-types";
import { Autocomplete, Checkbox, TextField, Typography } from '@mui/material';
import {  Stack } from '@mui/system';
import { useState, useCallback } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ProductAutocomplete = (props) => {
    const { data ,Name } = props;
    const [selectedData, setSelectedData] = useState([]);

    return (
        <Stack spacing={2}>
            <Typography variant="h6" fontWeight="bold">
                {Name}
            </Typography>
            <Autocomplete
                style={{ width: '100%' }} 
                multiple
                options={data.map((item) => ({ _id: item._id, name: item.name }))}
                onChange={(event, newValue) => {
                    const selectedSizes = newValue ? newValue.map(i => i.name) : [];
                    setSelectedData(selectedSizes)
                }}
                isOptionEqualToValue={useCallback((option, value) => {
                    return option?._id === value?._id;
                }, [])}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.name}
                    </li>
                )}
                 renderInput={(params) => (
                    <TextField
                        {...params}
                        name={Name}
                        label={Name}
                    />
                )}
            />

        </Stack>
    );
};
ProductAutocomplete.propTypes = {
    data: PropTypes.array.isRequired,
    Name:PropTypes.string.isRequired,
};
export default ProductAutocomplete;
