import PropTypes from "prop-types";
import { Autocomplete, Checkbox, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useState, useCallback, useEffect } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { createQueryString } from "../../../utils/queryString";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ProductAutocomplete = (props) => {
    const { data, Name } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [selectedData, setSelectedData] = useState([]);

    useEffect(() => {
        const queryString = createQueryString(searchParams, {
            [Name]: selectedData?.length
                ? // Join data with a dot to make search params prettier
                selectedData?.map((c) => c.name).join(".")
                : null,
        });
        navigate(`${location.pathname}?${queryString}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedData]);


    return (
        <Stack spacing={2}>
            <Typography variant="h6" fontWeight="bold">
                {Name}
            </Typography>
            <Autocomplete
                style={{ width: '100%' }}
                multiple
                options={data?.map((item) => ({ _id: item._id, name: item.name }))}
                onChange={(event, newValue) => {
                    setSelectedData(newValue)
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
    Name: PropTypes.string.isRequired,
};
export default ProductAutocomplete;

