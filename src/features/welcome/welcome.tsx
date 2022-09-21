import { Box, Typography } from "@mui/material"

function WelcomeFeature() {
  return (
    <>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: '200px', marginTop: '70px' }}
      >
        <Box>
          <Typography variant='h1'>Välkommen att börja spara med Xpense!</Typography>
        </Box>
      </Box>

    </>

  )
}

export default WelcomeFeature
