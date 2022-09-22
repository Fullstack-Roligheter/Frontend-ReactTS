import { Box, Typography } from "@mui/material"

function WelcomeFeature() {
  return (
    <>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: '150px', marginTop: '70px', }}
      >
        <Box sx={{ background: 'radial-gradient(circle at center, rgba(65, 162, 72, 0.6), rgba(65, 162, 72, 0.1))', borderRadius: '15px', paddingLeft: '30px', paddingRight: '30px', paddingTop: '60px', paddingBottom: '60px' }}>
          <Typography variant='h1'>Välkommen att börja spara med Xpense!</Typography>
        </Box>
      </Box>

    </>

  )
}

export default WelcomeFeature
