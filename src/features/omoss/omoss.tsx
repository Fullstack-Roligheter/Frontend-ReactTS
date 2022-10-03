import { Box, Typography } from "@mui/material"
import styles from '../../styles.js'



const OmOss = (props: any) => {
  return (
    <>
      <Box sx={{ marginTop: '70px' }}>
        <Box >
          <Typography variant="h1" style={styles.whiteTypography}>Om Oss Sida</Typography>
        </Box>
        <Box>
          <Typography variant="h5" style={styles.whiteTypography}>Woop Woop</Typography>
        </Box>
      </Box>
    </>
  )
}
export default OmOss
