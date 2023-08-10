
import { useCallback, useEffect, useState } from 'react';
import { orderApi } from '../../api/orderApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs, Divider, Grid, Link, Typography, Box, Container } from '@mui/material';
import OneOrder from '../../components/Order/OneOrder';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const useOrder = (id) => {
  const [order, setOrder] = useState(null)
  const GetOneOrder = useCallback(async () => {
    try {
      const response = await orderApi.GetOneOrder(id);
      setOrder(response);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    GetOneOrder();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return order;
};
function Order() {
  const { id } = useParams();
  const order = useOrder(id);
  const navigate = useNavigate();


  if (!order) {
    return null;
  }

  return (
    <>
      <Container maxWidth='xl' >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: '1rem',
            marginRight: '1rem',
            marginTop: '1rem',
          }}
        >
          <Grid container spacing={3}  >
            <Grid item>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightOutlinedIcon fontSize="small" />}
                sx={{ mt: 3 }}
              >
                <Link
                  color="textPrimary"
                  component='button'
                  onClick={() => navigate(-1)}
                  variant="h5"
                >
                  go Back
                </Link>

                <Typography
                  color="textSecondary"
                  variant="h5"
                >
                  {`Order ( ${order._id} )`}
                </Typography>
              </Breadcrumbs>

            </Grid>
          </Grid>
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: '1rem',
            marginRight: '1rem',
          }} />
        <OneOrder data={order} />
      </Container >

    </>
  );
}

export default Order