import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material"
import { useState } from "react"
import SubmitButton from "../../shared/buttons/button-default"

const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    secondPassword: '',
    email: '',
    age: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    // UserLogin(formData)
    //   .then((response) => {
    //     alert('Du är nu Inloggad')
    //     setFormData(response.data)
    //     sessionStorage.setItem('user', `${response.userID}`)
    //     console.log('user id object:', response)
    //     console.log('user id value: ', response.userID)
    //     navigate(`/${response.userID}/dashboard`)
    //     window.location.reload()
    //   })

    //   .catch((error) => {
    //     console.log('Error:', error)
    //     if (error.request.status === 401) {
    //       alert('Access Denied')
    //     }
    //   })
    //   .finally(() => {
    //     console.log('Entered Finally')
    //   })
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
        <a href="/login">
          <Typography variant="h6" align="center">Vill du logga in? Klicka på mig!</Typography>
        </a>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit}>
          <TextField
            label='Select User Name'
            variant='outlined'
            type='text'
            name='userName'
            required={true}
            value={formData.userName}
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
            name='secondPassword'
            onChange={handleChange}
            value={formData.secondPassword}
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
            <SubmitButton />
          </Grid>
        </form>

      </Grid>
    </Grid>
  )
}
export default RegisterUser
