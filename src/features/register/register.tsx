import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { SubmitButton, DisabledSubmitButton } from "../../shared/buttons/button-default"
import { UserRegister } from '../../shared/fetch/user'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router'



const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const [sPassword, setPassword] = useState("")

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

//const [buttonState, setButtonState] = (false);

  const handleSubmit = (e: any) => {
    e.preventDefault()
      UserRegister(formData)
      .then((response) => {
          debugger
          console.log(response)
          alert("Du är nu registrerad")
          setTimeout(() => {
            navigate(`/login`)
          }, 1000)
          }
        )
  }

  return (
    <Grid
      container
      spacing={1}
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '70vh' }}
    >
      <Grid item xs={3} alignItems='center'>
        <Typography variant="h3" align="center">Registrera konto</Typography>
        <NavLink to="/login">
          <Typography variant="h6" align="center">Vill du logga in? Klicka på mig!</Typography>
        </NavLink>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit}>
          <TextField
            label='Select User Name'
            variant='outlined'
            type='text'
            name='name'
            required={true}
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          <br />
          <br />
          <TextField
            label='Enter email'
            variant='outlined'
            type='text'
            name='email'
            required={true}
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          <br />
          <br />
          <TextField
            label='Enter your age'
            variant='outlined'
            type='number'
            name='age'
            required={true}
            value={formData.age}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          <br />
          <br />
          <TextField
            label=' Select Password'
            variant='outlined'
            name='password'
            onChange={handleChange}
            value={formData.password}
            required={true}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <br />
          <TextField
            label=' Enter Password again'
            variant='outlined'
            name='sPassword'
            onChange = {((e) => setPassword(e.target.value))}
            value={sPassword}
            required={true}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <br />
          <Grid container justifyContent='center'>
          {(() => {
						if (sPassword != formData.password || formData.name === "" || formData.age === undefined || formData.email === "" || formData.password === "") {
              return < DisabledSubmitButton /> 
            } 
            else {
              return < SubmitButton />
            }
					})()}
              
 
          </Grid>
        </form>

      </Grid>
    </Grid>
  )
}
export default RegisterUser
