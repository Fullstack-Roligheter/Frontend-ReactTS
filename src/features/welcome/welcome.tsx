import { Box, Typography } from '@mui/material'
import styles from '../../CssStyles.js'

function WelcomeFeature() {
  return (
    <>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        sx={{ paddingTop: '100px', marginTop: '70px' }}
      >
        <Box style={styles.welcomeBackgroundColor}>
          <Typography
            variant='h1'
            align='center'
            // style={styles.whiteTypography}
          >
            Welcome to start saving with Xpense!
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default WelcomeFeature
