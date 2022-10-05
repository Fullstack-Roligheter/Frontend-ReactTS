import { Box, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { userType } from '../../shared/Interfaces/userToken'

function DashboardFeature() {
  // let UserIsLoggedIn = sessionStorage.getItem('user')
  // console.log('authenticatedLayout: ', UserIsLoggedIn)

  let timeMilli = Date.now().toString().slice(-3)

  const { userId } = useUserContext()
  const { email } = useUserContext()
  const { firstName } = useUserContext()
  const { lastName } = useUserContext()

  if (userId === null) {
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
      <Typography variant='h1'>DASHBOARD</Typography>
      <Typography variant='h3'>YOU ARE LOGGED IN</Typography>
      <Typography variant='h5'>UserId: {userId}</Typography>
      <Typography variant='h5'>Förnamn: {firstName}</Typography>
      <Typography variant='h5'>Efternamn: {lastName}</Typography>
      <Typography variant='h5'>Epost: {email}</Typography>
      <Typography variant='subtitle1'>{timeMilli}</Typography>
    </Box>
  )
}

export default DashboardFeature
