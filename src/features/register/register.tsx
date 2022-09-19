import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { SubmitButton, DisabledSubmitButton } from "../../shared/buttons/button-default"
import { UserRegister } from '../../shared/fetch/user'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router'

const styles = {
  color: {
    background: 'rgba(130, 180, 95, 0.5)',
    width: 'fit-content',
    padding: '30px',
    borderRadius: '15px',
    marginTop: '35px',
  },
  textfield: {
    backgroundColor: 'white',
    width: '100%',
  },
};



const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2)
  const handleMouseDownPassword2 = () => setShowPassword2(!showPassword2)

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

  const handleSubmit = (e: any) => {
    e.preventDefault()
    UserRegister(formData)
      .then((response) => {
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
      <Grid style={styles.color} alignItems='center' item xs={3} >
        <Grid >
          <Typography variant="h3" align="center">Registrera konto</Typography>
          <NavLink to="/login">
            <Typography variant="h6" align="center" marginBottom='10px'>Vill du logga in? Klicka på mig!</Typography>
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
              style={styles.textfield}
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
              style={styles.textfield}
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
              style={styles.textfield}
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
              style={styles.textfield}
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
              onChange={((e) => setPassword(e.target.value))}
              value={sPassword}
              required={true}
              style={styles.textfield}
              type={showPassword2 ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword2}
                    >
                      {showPassword2 ? <Visibility /> : <VisibilityOff />}
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
    </Grid>
  )
}
export default RegisterUser
