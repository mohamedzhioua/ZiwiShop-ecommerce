import PropTypes from "prop-types";
import { Autocomplete, Checkbox, TextField, Typography } from '@mui/material';
import {  Stack } from '@mui/system';
import { useState, useCallback } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SizeAutocomplete = (props) => {
    const { sizes } = props;
    const [selectedSizes, setSelectedSizes] = useState([]);

    return (
        <Stack spacing={2}>
            <Typography variant="h6" fontWeight="bold">
                Sizes
            </Typography>
            <Autocomplete
                style={{ width: '100%' }} 
                multiple
                options={sizes.map((item) => ({ _id: item._id, name: item.name }))}
                onChange={(event, newValue) => {
                    const selectedSizes = newValue ? newValue.map(size => size.name) : [];
                    setSelectedSizes(selectedSizes)
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
                        name="sizes"
                        label="Size"
                    />
                )}
            />

        </Stack>
    );
};
SizeAutocomplete.propTypes = {
    sizes: PropTypes.array.isRequired,

};
export default SizeAutocomplete;
