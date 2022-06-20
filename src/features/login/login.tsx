import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputBase } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import SubmitButton from '../../shared/buttons/button-default';




const LogIn = () => {

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);
	
	return (
		<Grid
  container
  spacing={1}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '70vh'}}
>
  <Grid item xs={3}
   alignItems="center">
	<h3>Logga in</h3>
	</Grid>
	<Grid item>

	<form>
		  <TextField  
		  label='User name' variant="outlined" type="text"
		  style ={{width: '100%'}}
		  />
  <br/>
  <br/>
  <TextField
  label='Password'
  variant="outlined"
  type={showPassword ? "text" : "password"} 
  
  InputProps={{ endAdornment: (
	  <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
		  >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
}}
/>
<br />
<br />
<SubmitButton />
</form>
</Grid>
</Grid>   
		
	  );
}

export default LogIn