import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import PhonelinkOutlinedIcon from '@mui/icons-material/PhonelinkOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import Heading from '../../ui/Heading'
import { Stack } from '@mui/system'
import { currencyFormatter } from '../../../utils/currencyFormatter'
import PropTypes from 'prop-types';

const renderStats = (data) => {
  return (
    <>
      <Grid item xs={12} sm={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 60,
              height: 60,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: 'secondary.main'
            }}
          >
            <ShoppingCartOutlinedIcon sx={{ fontSize: '1.75rem' }} />
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5' fontWeight='bold'>Orders to deliver</Typography>
            <Typography variant='h6' fontWeight='bold'>{data?.paidOrderCount}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 60,
              height: 60,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: 'success.main'
            }}
          >
            <Person2OutlinedIcon sx={{ fontSize: '1.75rem' }} />
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5' fontWeight='bold'>Customers</Typography>
            <Typography variant='h6' fontWeight='bold'>{data?.userCount}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 60,
              height: 60,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: 'warning.main'
            }}
          >
            <PhonelinkOutlinedIcon sx={{ fontSize: '1.75rem' }} />
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5' fontWeight='bold'>Products In Stock</Typography>
            <Typography variant='h6' fontWeight='bold'>{data?.productsInStock}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 60,
              height: 60,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: 'info.main'
            }}
          >
            <CurrencyExchangeOutlinedIcon sx={{ fontSize: '1.75rem' }} />
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5' fontWeight='bold'>Revenue</Typography>
            <Typography variant='h6' fontWeight='bold'>{currencyFormatter.format(data?.totalRevenue)}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
}


const StatisticsCard = (props) => {
  const { data } = props

  return (
    <Card>
      <CardContent sx={{ pt: theme => `${theme.spacing(5)} !important`, mb: 3 }} >
        <Stack spacing={3} >
          <Heading title="statics" titleStyle="h5" description="Total 48.5% growth this month" />
          <Grid container spacing={[5, 0]}>
            {renderStats(data)}
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  )
}
StatisticsCard.propTypes = {
  data: PropTypes.object.isRequired,

};
export default StatisticsCard
