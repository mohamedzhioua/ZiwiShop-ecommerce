import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import useTheme from '../../../hooks/useTheme'
import Chart from 'react-apexcharts'
import PropTypes from 'prop-types';
import { currencyFormatter } from '../../../utils/currencyFormatter'

const WeeklyOverview = (props) => {
  const { data } = props
  const { theme } = useTheme()
   
 
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      foreColor: theme.palette.primary.main,

    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '40%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },

    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: [
      theme.palette.secondary.main

    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      tickPlacement: 'on',
      labels: { show: true },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 5,
      labels: {
        offsetX: -17,
        formatter: value => currencyFormatter.format(`${value > 999 ? `${(value / 1000).toFixed(0)}` : (value)}`)
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Weekly Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        subheader={
          <Typography variant="h5" sx={{ letterSpacing: '0.15px !important' }}>
            sales statics
          </Typography>
        }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <Chart type='bar' height={205} options={options} series={[{ data: data }]} />
        <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' fontWeight='bold' sx={{ mr: 4 }}>
            45%
          </Typography>
          <Typography variant='h5'>Your sales performance is 45%  better compared to last month</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
WeeklyOverview.propTypes = {
  data: PropTypes.array.isRequired,
};
export default WeeklyOverview
