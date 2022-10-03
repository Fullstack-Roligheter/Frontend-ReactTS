import { Box, Typography } from "@mui/material"
import styles from '../../styles.js'

function WelcomeFeature() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: '100px', marginTop: '70px', }}
      >
        <Box style={styles.welcomeBackgroundColor}>
          <Typography variant='h1' color="white" align="center" sx={{ textShadow: '1px 1px 2px black' }}>Välkommen att börja spara med Xpense!</Typography>
        </Box>
      </Box>

    </>

  )
}

export default WelcomeFeature