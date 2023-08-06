import {
  Divider, Unstable_Grid2 as Grid,
} from "@mui/material"
import Heading from "../../components/ui/Heading"
import { Box, Container } from "@mui/system"
import StatisticsCard from "../../components/Dashboard/overview/StatisticsCard"
import Trophy from "../../components/Dashboard/overview/Trophy"
import WeeklyOverview from "../../components/Dashboard/overview/WeeklyOverview"
import { useCallback, useEffect, useState } from "react"
import { dashboardApi } from "../../api/dashboardApi"
import { useMounted } from "../../hooks/use-mounted"


function Overview() {
  const [data, setData] = useState([])
   const isMounted = useMounted()
  const getInfo = useCallback(async () => {
    try {
      const response = await dashboardApi.getInfo();
      if (isMounted()) {
        setData(response);
       }
    } catch (error) {
      console.error(error);
    }
  }, []);


  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Trophy />
        </Grid>
        <Grid
          xs={12}
          md={8}
        >
          <StatisticsCard data={data}/>
        </Grid>
        <Grid
          xs={12}
          md={12}
        >
          <WeeklyOverview />
        </Grid>
      </Grid>
    </>
  )
}

export default Overview