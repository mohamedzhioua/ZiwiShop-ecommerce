import { Box } from '@mui/material'
import './Spinner.css'

function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div className="loader">
  <div className="box1"></div>
  <div className="box2"></div>
  <div className="box3"></div>
</div>
 
    </Box>
  )
}

export default LoadingSpinner