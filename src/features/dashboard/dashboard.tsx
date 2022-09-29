import { Box, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { userType } from '../../shared/Interfaces/userToken'

const styles = {
  text: {
    color: "white",
    align: "center",
    textShadow: '1px 1px 2px black',

  }
}

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '80vw',
        background:
          'radial-gradient(circle at center, rgba(65, 162, 72, 0.4), rgba(65, 162, 72, 0.0))',
        borderRadius: '15px',
        paddingLeft: '30px',
        paddingRight: '30px',
        paddingTop: '100px',
        paddingBottom: '100px',
        height: 'fit-content',
      }}
    >
      <Typography variant='h1' style={styles.text}>DASHBOARD</Typography>
      <Typography variant='h3' style={styles.text}>YOU ARE LOGGED IN</Typography>
      <Typography variant='h5' style={styles.text}>UserId: {user.userId}</Typography>
      <Typography variant='h5' style={styles.text}>Förnamn: {user.firstName}</Typography>
      <Typography variant='h5' style={styles.text}>Efternamn: {user.lastName}</Typography>
      <Typography variant='h5' style={styles.text}>Epost: {user.email}</Typography>
      <Typography variant='subtitle1' style={styles.text}>{timeMilli}</Typography>
    </Box>
  )
}

export default DashboardFeature
