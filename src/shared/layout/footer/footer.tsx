
import AppBar from '@mui/material/AppBar';
import { Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import { common } from '@mui/material/colors';


const Footer = () => {
	return (
		<Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="center"
>
		  <AppBar position="static" color="transparent">
			<Grid item>
			  <Typography variant="h6" color="common.black" component="div" sx={{ flexGrow: 1 }}>
			  Expense AB © 2021
			  </Typography>
			</Grid>
			<Grid item>
			  <FacebookIcon sx={{ color: common.black }}/>
			  <TwitterIcon sx={{ color: common.black }}/>
			  <InstagramIcon sx={{ color: common.black }}/>
			</Grid>
		  </AppBar>
		</Grid>
	  );
}
export default Footer






