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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '80vw',
      background: 'radial-gradient(circle at center, rgba(65, 162, 72, 0.4), rgba(65, 162, 72, 0.0))',
      borderRadius: '15px',
      paddingLeft: '30px',
      paddingRight: '30px',
      paddingTop: '100px',
      paddingBottom: '100px',
      height: 'fit-content'
    }}>
      <Typography color='white' variant='h1' sx={{ textShadow: '1px 1px 2px black' }}>DASHBOARD</Typography>
      <Typography color='white' variant='h3' sx={{ textShadow: '1px 1px 2px black' }}>YOU ARE LOGGED IN</Typography>
      <Typography variant='h5' color='white' sx={{ textShadow: '1px 1px 2px black' }}>UserId: {UserIsLoggedIn}</Typography>
      <Typography variant='subtitle1' color='white' sx={{ textShadow: '1px 1px 2px black' }}>{timeMilli}</Typography>
    </Box>
  )
}

export default DashboardFeature
