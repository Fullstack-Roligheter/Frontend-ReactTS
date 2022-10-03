import { Visibility, VisibilityOff } from '@mui/icons-material'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router'
import {
  SubmitButton,
  DisabledSubmitButton,
} from '../../shared/buttons/button-default'
import { Login } from '../../shared/fetch/user'
import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';
import styles from '../../styles.js'

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [buttontext, setButtonText] = useState('Logga in')
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const [message, setmessage] = useState('')
  const [messageState, setmessageState] = useState(false)
  const [loadingState, setloadingState] = useState(false)


  const [formData, setFormData] = useState({
    eMail: '',
    password: '',
  })

  const checkForm = () => {
    if (formData.eMail === '' || formData.password === '') {

      return false
    } else {
      return true
    }
  }

  const navigate = useNavigate()

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setloadingState(true)
    Login(formData)
      .then((response) => {
        // setFormData(response.data)
        sessionStorage.setItem('userId', `${response.userId}`)
        sessionStorage.setItem('email', `${response.email}`)
        sessionStorage.setItem('firstName', `${response.firstName}`)
        sessionStorage.setItem('lastName', `${response.lastName}`)
        alert('Du är nu Inloggad')
        navigate(`/dashboard`)
        window.location.reload()
      })
      .catch((error) => {
        setTimeout(() => {
          setloadingState(false)
          setmessage('Kunde inte logga in.')
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

  // useEffect(() => {
  //   const loggedInUser = sessionStorage.getItem('userId')
  //   // setFormData(loggedInUser)

  //   // if (loggedInUser) {
  //   //   const foundUser = JSON.strin(loggedInUser)
  //   //   setFormData(foundUser)
  //   // }
  // }, [])

  return (
    <Grid
      container
      spacing={1}
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '70vh' }}
    >
      <Grid style={styles.formBackground} item xs={3} alignItems='center'>

        <Grid>
          <Typography variant='h3' align='center' color='white' sx={{ textShadow: '1px 1px 2px black' }} >
            Logga in
          </Typography>
          <Box sx={{ marginBottom: '15px' }}>
            <Typography
              variant="h6"
              align="center"
              component='a'
              href='/register'
              style={styles.linkTextField}
            >
              Har du inte ett konto? Klicka på mig!
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <TextField
              label='E-Mail'
              variant='outlined'
              type='text'
              name='eMail'
              required={true}
              value={formData.eMail}
              onChange={handleChange}
              style={styles.textfield}
            />
            <br />
            <br />
            <TextField
              label='Password'
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

                  return < DisabledSubmitButton buttontext={buttontext} />
                }
                else {
                  return < SubmitButton isLoading={loadingState} buttontext={buttontext} />

                }
              })()}
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LogIn
