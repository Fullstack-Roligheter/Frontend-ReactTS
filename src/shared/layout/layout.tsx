import AuthenticatedLayout from './authenticatedLayout'
import UnauthenticatedLayout from './unauthenticatedLayout'
import Box from '@mui/material/Box'

import Image from '../../img/newbackground.png'

import { userType } from '../../shared/Interfaces/userToken'

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  },
}

const Layout = (user: userType) => (
  <Box
    height='100vh'
    display='flex'
    flexDirection='column'
    style={styles.paperContainer}
  >
    {(() => {
      if (user.userId === '') {
        return <UnauthenticatedLayout />
      } else {
        return <AuthenticatedLayout {...user} />
      }
    })()}
  </Box>
)

export default Layout
