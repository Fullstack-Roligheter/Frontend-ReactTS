import { Box, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { userType } from '../../shared/Interfaces/userToken'
import { UserContext } from '../../shared/UserContext'

const styles = {
  text: {
    color: 'white',
    align: 'center',
    textShadow: '1px 1px 2px black',
  },
}

function DashboardFeature() {
  const user = useContext(UserContext)

  const [userActive, setUserActive] = useState({
    active: user,
  })
  console.log(user)
  let timeMilli = Date.now().toString().slice(-3)

  if (userActive.active.loggedIn === false) {
    console.log('user: ' + userActive)
    return <Navigate to='/' replace />
  }

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
      <Typography variant='h1' style={styles.text}>
        DASHBOARD
      </Typography>
      <Typography variant='h3' style={styles.text}>
        YOU ARE LOGGED IN
      </Typography>
      <Typography variant='h5' style={styles.text}>
        UserId: {userActive.active.user.userId}
      </Typography>
      <Typography variant='h5' style={styles.text}>
        Förnamn: {userActive.active.user.firstName}
      </Typography>
      <Typography variant='h5' style={styles.text}>
        Efternamn: {userActive.active.user.lastName}
      </Typography>
      <Typography variant='h5' style={styles.text}>
        Epost: {userActive.active.user.email}
      </Typography>
      <Typography variant='subtitle1' style={styles.text}>
        {timeMilli}
      </Typography>
    </Box>
  )
}

export default DashboardFeature
