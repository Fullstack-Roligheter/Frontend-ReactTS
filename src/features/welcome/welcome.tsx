import { Box, Typography } from "@mui/material"

const styles = {
  color: {
    background: 'radial-gradient(circle at center, rgba(65, 162, 72, 0.6), rgba(65, 162, 72, 0.1))',
    borderRadius: '15px',
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingTop: '60px',
    paddingBottom: '60px',
    display: 'flex',
    justifyItems: 'center',
  },
};

function WelcomeFeature() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: '150px', marginTop: '70px', }}
      >
        <Box style={styles.color}>
          <Typography color="white" variant='h1' align="center" sx={{ textShadow: '1px 1px 2px black' }}>Välkommen att börja spara med Xpense!</Typography>
        </Box>
      </Box>

    </>

  )
}

export default WelcomeFeature
