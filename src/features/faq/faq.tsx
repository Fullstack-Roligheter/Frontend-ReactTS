import { Box, Typography } from "@mui/material"
import styles from '../../CssStyles.js'


const Faq = () => {
  return (
    <>
      <Box sx={{ marginTop: '70px' }}>
        <Box>
          <Typography variant='h1' style={styles.whiteTypography}>Faq</Typography>
        </Box>
        <Box>
          <Typography variant='h5' style={styles.whiteTypography}>Woop Woop</Typography>
        </Box>
      </Box>
    </>
  )
}
export default Faq
