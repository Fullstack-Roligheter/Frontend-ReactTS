// @ts-nocheck
import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import LoginIcon from '@mui/icons-material/Login'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Grid, TextField, InputAdornment } from '@mui/material'
import formData from 'form-data'
import { DisabledSubmitButton, SubmitButton } from '../buttons/button-default'
import { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Login } from '../fetch/user'
import { useNavigate } from 'react-router-dom'

export default function LoginModal(props) {
  const user = useContext(UserContext)
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [buttontext, setButtonText] = useState('Logga in')
  const [message, setmessage] = useState('')
  const [messageState, setmessageState] = useState(false)
  const [loadingState, setloadingState] = useState(false)
  const [loggedIn, setloggedIn] = useState(false)

  const [formData, setFormData] = useState({
    eMail: '',
    password: '',
  })

  const styles = {
    box: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      outline: 'none',
    },
    color: {
      background: 'rgba(65, 162, 72, 1)',
      width: 'fit-content',
      padding: '30px',
      borderRadius: '15px',
    },
    textfield: {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: '5px',
    },
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const checkForm = () => {
    if (formData.eMail === '' || formData.password === '') {
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

  //   const Success = (e) => {
  //     const { value } = e
  //     setLoggedIn({
  //       ...loggedIn,
  //       value,
  //     })
  //     console.log(loggedIn)
  //   }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setloadingState(true)
    Login(formData)
      .then((response) => {
        sessionStorage.setItem('userId', `${response.userId}`)
        sessionStorage.setItem('email', `${response.email}`)
        sessionStorage.setItem('firstName', `${response.firstName}`)
        sessionStorage.setItem('lastName', `${response.lastName}`)

        navigate(`/dashboard`)
        handleClose()
        props.callBack(response.email)
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
  }

  return (
    <>
      <LoginIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styles.box}>
          <Grid
            container
            spacing={1}
            direction='column'
            alignItems='center'
            justifyContent='center'
          >
            <Grid style={styles.color} item xs={3} alignItems='center'>
              <Grid>
                <Typography
                  variant='h3'
                  align='center'
                  color='white'
                  sx={{ textShadow: '1px 1px 2px black' }}
                >
                  Logga in
                </Typography>
                <Box sx={{ marginBottom: '15px' }}>
                  <Typography
                    variant='h6'
                    align='center'
                    color='white'
                    component='a'
                    href='/register'
                    sx={{
                      textDecoration: 'none',
                      textShadow: '1px 1px 2px black',
                    }}
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
        </Box>
      </Modal>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}
    </>
  )
}

{
  /* <Modal
open={open}
onClose={handleClose}
aria-labelledby='modal-modal-title'
aria-describedby='modal-modal-description'
>
<Box sx={style}>
  <Typography id='modal-modal-title' variant='h6' component='h2'>
    Text in a modal
  </Typography>
  <Typography id='modal-modal-description' sx={{ mt: 2 }}>
    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
  </Typography>
</Box>
</Modal> */
}
