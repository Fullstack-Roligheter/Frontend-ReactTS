import { Box, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { userType } from '../../shared/Interfaces/userToken'
import styles from '../../CssStyles.js'
import { useEffect, useState } from 'react'

function DashboardFeature() {
  // let UserIsLoggedIn = sessionStorage.getItem('user')
  // console.log('authenticatedLayout: ', UserIsLoggedIn)

  const [dashboardTextSize, setDashboardTextSize] = useState('big')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 850) {
        setDashboardTextSize('small')
      } else {
        setDashboardTextSize('big')
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  let timeMilli = Date.now().toString().slice(-3)

  const user = useUserContext()

  if (user.userId === null) {
    return <Navigate to='/login' replace />
  }

  // if (UserIsLoggedIn === null) {
  //   return <Navigate to='/login' replace />
  // }

  return (

    <Box style={styles.dashboardBackground} sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
      {(() => {
        if (dashboardTextSize == 'small') {
          return (
            <Typography variant='h2' style={styles.whiteTypography}>DASHBOARD</Typography>
          )
        } else {
          return (
            <Typography variant='h1' style={styles.whiteTypography}>DASHBOARD</Typography>
          )

        }
      })()}
      <Typography variant='h3' style={styles.whiteTypography}>Logged in as:</Typography>
      <Typography variant='h5' style={styles.whiteTypography}>UserId: {user.userId}</Typography>
      <Typography variant='h5' style={styles.whiteTypography}>Förnamn: {user.firstName}</Typography>
      <Typography variant='h5' style={styles.whiteTypography}>Efternamn: {user.lastName}</Typography>
      <Typography variant='h5' style={styles.whiteTypography}>Epost: {user.email}</Typography>
      <Typography variant='subtitle1' style={styles.whiteTypography}>{timeMilli}</Typography>
    </Box >

  )
}

export default DashboardFeature
