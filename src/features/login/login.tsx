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
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import styles from '../../styles.js'

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [buttontext, setButtonText] = useState('Logga in')
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const [message, setmessage] = useState('')
  const [messageState, setmessageState] = useState(false)
  const [loadingState, setloadingState] = useState(false)

  const { signIn } = useUserContext()

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
  // lei skrivit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await signIn(formData.eMail, formData.password)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Grid
      container
      spacing={1}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: '70vh' }}
    >
      <Grid style={styles.formBackground} item xs={3} alignItems='center'>
        <Grid>
          <Typography
            variant='h3'
            align='center'
            style={styles.whiteTypography}
          >
            Logga in
          </Typography>
          <Box sx={{ marginBottom: '15px' }}>
            <Typography
              variant='h6'
              align='center'
              component='a'
              href='/register'
              style={styles.linkTypography}
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

export default LogIn
