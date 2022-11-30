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
  },
  layer: {
    // background:
      // 'radial-gradient(circle at center, rgba(65, 162, 72, 0.4), rgba(65, 162, 72, 0.0))',
  },
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
        style={styles.layer}
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
