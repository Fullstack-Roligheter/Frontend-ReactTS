import { Box, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'

function DashboardFeature() {
  let UserIsLoggedIn = sessionStorage.getItem('user')
  console.log('authenticatedLayout: ', UserIsLoggedIn)

  let timeMilli = Date.now().toString().slice(-3)

  if (UserIsLoggedIn === null) {
    return <Navigate to='/login' replace />
  }

  return (
    <Box>
      <Typography variant='h1'>DASHBOARD</Typography>
      <Typography variant='h3'>YOU ARE LOGGED IN</Typography>
      <Typography variant='h5'>UserId: {UserIsLoggedIn}</Typography>
      <Typography variant='subtitle1'>{timeMilli}</Typography>
    </Box>
  )
}

export default DashboardFeature
