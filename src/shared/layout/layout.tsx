import AuthenticatedLayout from './authenticatedLayout'
import UnauthenticatedLayout from './unauthenticatedLayout'
import Paper from '@mui/material/Paper'

import Image from '../../img/newbackground.png'
import { CompressOutlined } from '@mui/icons-material'

import { userType } from '../../shared/Interfaces/userToken'

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  },
}

const Layout = (user: userType) => (
  <Paper sx={{ width: '100%', height: '100%' }} style={styles.paperContainer}>
    {(() => {
      if (user.userId === '') {
        return <UnauthenticatedLayout />
      } else {
        return <AuthenticatedLayout {...user} />
      }
    })()}
  </Paper>
)

export default Layout
