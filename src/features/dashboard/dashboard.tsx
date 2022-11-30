import { Box, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { userType } from '../../shared/Interfaces/userToken'
import styles from '../../CssStyles.js'
import { useEffect, useState } from 'react'
import DebitChart from '../../shared/charts/DebitChart'

function DashboardFeature() {
  // let UserIsLoggedIn = sessionStorage.getItem('user')
  // console.log('authenticatedLayout: ', UserIsLoggedIn)

  const [dashboardTextSize, setDashboardTextSize] = useState('big')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
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
    <>
      <Box sx={{ flexDirection: 'column' }}>
        <Box
          sx={
            {
              width: 850,
              m: 3,
              mt: 3,
              p: 3,
              pt: 3,
              borderRadius: 2,
              bgcolor: 'RGBA(255,255,255,0.65)',
              boxShadow: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }
          }
        >
          <Typography variant='h4' style={styles.blackTypography}>
            DASHBOARD
          </Typography>

          <DebitChart />
        </Box>
      </Box>
    </>
  )
}

export default DashboardFeature
