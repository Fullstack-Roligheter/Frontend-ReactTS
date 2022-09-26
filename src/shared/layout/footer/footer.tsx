import AppBar from '@mui/material/AppBar'
import { Box, Grid, IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import { common } from '@mui/material/colors'
import { Link } from '@mui/icons-material'

const Footer = () => {
  return (
    <Box>
      <Grid
        container
        direction='column'
        alignItems='center'
        sx={{ color: common.black }}
      >
        <Box>
          <IconButton
            href='https://www.facebook.com/'
            target='blank_'
            rel='noreferrer'
          >
            <FacebookIcon fontSize='small' sx={{ color: common.black }} />
          </IconButton>
          <IconButton
            href='https://www.twitter.com/'
            target='blank_'
            rel='noreferrer'
          >
            <TwitterIcon fontSize='small' sx={{ color: common.black }} />
          </IconButton>
          <IconButton
            href='https://www.instagram.com/'
            target='blank_'
            rel='noreferrer'
          >
            <InstagramIcon fontSize='small' sx={{ color: common.black }} />
          </IconButton>
        </Box>
        <Box>
          <Typography
            variant='body2'
            color='common.black'
            component='div'
            sx={{ flexGrow: 1 }}
          >
            Expense AB © 2021
          </Typography>
        </Box>
      </Grid>
    </Box>
  )
}
export default Footer
