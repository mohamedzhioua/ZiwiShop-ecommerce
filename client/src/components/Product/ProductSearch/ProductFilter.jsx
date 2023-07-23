import PropTypes from 'prop-types';
import { Button, Typography, Divider, Box } from '@mui/material';


const ProductFilter = (props) => {
  const { data, name, valueKey } = props;
  const searchParams = new URLSearchParams(window.location.search);
  const selectedValue = searchParams.get(valueKey);

  const onClick = (id) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set(valueKey, id);

    if (selectedValue === id) {
      query.delete(valueKey);
    }

    const url = `${window.location.pathname}?${query.toString()}`;
    window.location.href = url;
  };

  return (
    <Box mb={8}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {name}
      </Typography>
      <Divider my={4} />
      <Box display="flex" flexWrap="wrap" gap={2}>
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button
              variant="contained"
              sx={{
                borderRadius: 'md',
                fontSize: '0.875rem',
                color: 'text.primary',
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                border: '1px solid',
                borderColor: 'gray.300',
                '&:hover': {
                  backgroundColor: selectedValue === filter.id ? 'black' : 'white',
                  color: selectedValue === filter.id ? 'white' : 'text.primary',
                },
                ...(selectedValue === filter.id && {
                  backgroundColor: 'black',
                  color: 'white',
                }),
              }}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </Box>
    </Box>
  );
};

ProductFilter.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
};

export default ProductFilter;
