import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
  import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
 import PhonelinkOutlinedIcon from '@mui/icons-material/PhonelinkOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import Heading from '../../ui/Heading'
import { Stack } from '@mui/system'

const renderStats = () => {
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
            <TrendingUpOutlinedIcon sx={{ fontSize: '1.75rem' }} />
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5' fontWeight='bold'>Sales</Typography>
            <Typography variant='h6' fontWeight='bold'>245k</Typography>
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
            <Typography variant='h6'fontWeight='bold'>12.5k</Typography>
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
            <Typography variant='h6' fontWeight='bold'>1.54k</Typography>
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
            <Typography variant='h6' fontWeight='bold'>$88k</Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
}


const StatisticsCard = () => {
  return (
    <Card>
      <CardContent sx={{ pt: theme => `${theme.spacing(5)} !important` }} >
        <Stack spacing={3} >
      <Heading title="" description="Total 48.5% growth this month"/>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
