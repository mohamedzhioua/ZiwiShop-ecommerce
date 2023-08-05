import {
  Divider, Unstable_Grid2 as Grid,
} from "@mui/material"
import Heading from "../../components/ui/Heading"
import { Box, Container } from "@mui/system"
import StatisticsCard from "../../components/Dashboard/overview/StatisticsCard"
import Trophy from "../../components/Dashboard/overview/Trophy"


function Overview() {
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
          <Heading title="Dashboard" description="Overview of your store" />
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: '1rem',
            marginRight: '1rem',
          }} />

      </Container >
      <Grid sx={{
        marginLeft: '1rem',
        marginRight: '1rem'
      }}
        container
        spacing={3}>
             <Grid
          xs={12}
          md={4}
        >
          <Trophy/>
        </Grid>
        <Grid
          xs={12}
          md={8}
        >
          <StatisticsCard />
        </Grid>
      </Grid>
    </>
  )
}

export default Overview