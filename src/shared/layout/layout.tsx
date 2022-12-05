import AuthenticatedLayout from './authenticatedLayout'
import UnauthenticatedLayout from './unauthenticatedLayout'
import Box from '@mui/material/Box'
import Image from '../../img/newbackground.png'
import { useUserContext } from '../../context/UserContext'

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  }
}

const Layout = () => {
  const user = useUserContext()

  return (
    <Box
      height='fit-content'
      display='flex'
      flexDirection='column'
      style={styles.paperContainer}
    >
      <Box
        display='flex'
        flexDirection='column'
        height='fit-content'
      >
        {(() => {
          if (user.userId === null) {
            return <UnauthenticatedLayout />
          } else {
            return <AuthenticatedLayout />
          }
        })()}
      </Box>
    </Box>
  )
}

export default Layout
