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
          <Typography
            variant='h1'
            align="center"
            style={styles.whiteTypography}
          >
            Välkommen att börja spara med Xpense!
          </Typography>
        </Box>
      </Box>

    </>

  )
}

export default WelcomeFeature