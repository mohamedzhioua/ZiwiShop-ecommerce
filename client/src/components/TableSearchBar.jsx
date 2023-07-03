import PropTypes from 'prop-types';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const TableSearchBar = (props) => {
    const { handleQueryChange, query } = props
    return (
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
        </Box>)
}
TableSearchBar.propTypes = {
    query: PropTypes.string.isRequired,
    handleQueryChange: PropTypes.func,
};
export default TableSearchBar