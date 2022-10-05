import { Box, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { userType } from '../../shared/Interfaces/userToken'
import styles from '../../CssStyles.js'


function DashboardFeature(user: userType) {
  // let UserIsLoggedIn = sessionStorage.getItem('user')
  // console.log('authenticatedLayout: ', UserIsLoggedIn)

  let timeMilli = Date.now().toString().slice(-3)

  if (user.userId === null) {
    return <Navigate to='/login' replace />
  }

  // if (UserIsLoggedIn === null) {
  //   return <Navigate to='/login' replace />
  // }

  return (
    <Box style={styles.dashboardBackground} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h1' style={styles.whiteTypography}>DASHBOARD</Typography>
      <Typography variant='h3' style={styles.whiteTypography}>YOU ARE LOGGED IN</Typography>
      <Typography variant='h5' style={styles.whiteTypography}>UserId: {user.userId}</Typography>
      <Typography variant='h5' style={styles.whiteTypography}>Förnamn: {user.firstName}</Typography>
      <Typography variant='h5' style={styles.whiteTypography}>Efternamn: {user.lastName}</Typography>
      <Typography variant='h5' style={styles.whiteTypography}>Epost: {user.email}</Typography>
      <Typography variant='subtitle1' style={styles.whiteTypography}>{timeMilli}</Typography>
    </Box>
  )
}

export default DashboardFeature
