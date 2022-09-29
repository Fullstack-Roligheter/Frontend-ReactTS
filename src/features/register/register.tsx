import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import {
  SubmitButton,
  DisabledSubmitButton,
} from '../../shared/buttons/button-default'
import { Register } from '../../shared/fetch/user'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'

const styles = {
  color: {
    background: 'rgba(65, 162, 72, 0.4)',
    width: 'fit-content',
    padding: '30px',
    borderRadius: '15px',
    marginTop: '35px',
  },
  textfield: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: '5px',
  },
}

const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [message, setmessage] = useState('')
  const [messageState, setmessageState] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2)
  const handleMouseDownPassword2 = () => setShowPassword2(!showPassword2)

  const [buttontext, setButtonText] = useState('Registrera')
  const [sPassword, setPassword] = useState('')
  const [loadingState, setloadingState] = useState(false)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const checkForm = () => {
    if (
      formData.firstName === '' ||
      formData.lastName === '' ||
      formData.email === '' ||
      formData.password === '' ||
      sPassword === ''
    ) {
      return false
    } else {
      return true
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (sPassword !== formData.password) {
      setmessage('Lösenorden matchar inte')
      setmessageState(true)
      setTimeout(() => {
        setmessageState(false)
      }, 3000)
    } else {
      setloadingState(true)
      Register(formData)
        .then((response) => {
          alert('Du är nu registrerad')
          setTimeout(() => {
            navigate(`/login`)
          }, 1000)
        })
        .catch((error) => {
          setTimeout(() => {
            setloadingState(false)
            setmessage('Kunde inte registrera.')
            setmessageState(true)
            setTimeout(() => {
              setmessageState(false)
            }, 3000)
          }, 5000)
        })
        .finally(() => {
          console.log('Entered Finally')
        })
    }
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
      <Grid style={styles.color} alignItems='center' item xs={3}>
        <Grid>
          <Typography
            variant='h3'
            color='white'
            align='center'
            sx={{ textShadow: '1px 1px 2px black' }}
          >
            Registrera konto
          </Typography>
          <Box sx={{ marginBottom: '15px' }}>
            <Typography
              variant='h6'
              color='white'
              align='center'
              component='a'
              href='/login'
              sx={{ textDecoration: 'none', textShadow: '1px 1px 2px black' }}
            >
              Vill du logga in? Klicka på mig!
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <TextField
              label='First Name'
              variant='outlined'
              type='text'
              name='firstName'
              required={true}
              value={formData.firstName}
              onChange={handleChange}
              style={styles.textfield}
            />
            <br />
            <br />
            <TextField
              label='Last Name'
              variant='outlined'
              type='text'
              name='lastName'
              required={true}
              value={formData.lastName}
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
              onChange={(e) => setPassword(e.target.value)}
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
            {(() => {
              if (messageState) {
                return (
                  <Box>
                    <br />
                    <Typography>{message}</Typography>
                    <br />
                  </Box>
                )
              }
            })()}
            <br />
            <Grid container justifyContent='center'>
              {(() => {
                if (!checkForm()) {
                  return <DisabledSubmitButton buttontext={buttontext} />
                } else {
                  return (
                    <SubmitButton
                      isLoading={loadingState}
                      buttontext={buttontext}
                    />
                  )
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
