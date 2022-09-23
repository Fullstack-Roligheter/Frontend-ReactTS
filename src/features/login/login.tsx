import { Visibility, VisibilityOff } from '@mui/icons-material'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router'
import { SubmitButton, DisabledSubmitButton } from '../../shared/buttons/button-default'
import { UserLogin } from '../../shared/fetch/user'
import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';

const styles = {
  color: {
    background: 'rgba(65, 162, 72, 0.5)',
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

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [buttontext, setButtonText] = useState("Logga in")
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)



  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  })

  const checkForm = () => {
    if (formData.userName === "" || formData.password === "" ) {
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
    UserLogin(formData)
      .then((response) => {
        alert('Du är nu Inloggad')
        setFormData(response.data)
        sessionStorage.setItem('user', `${response.userID}`)
        sessionStorage.setItem('email', `${response.email}`)
        console.log('user id object:', response)
        console.log('user id value: ', response.userID)
        navigate(`/dashboard`)
        window.location.reload()
      })

      .catch((error) => {
        console.log('Error:', error)
        if (error.request.status === 401) {
          alert('Access Denied')
        }
      })
      .finally(() => {
        console.log('Entered Finally')
      })
  }

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('user')
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setFormData(foundUser)
    }
  }, [])

  return (
    <Grid
      container
      spacing={1}
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '70vh' }}
    >
      <Grid style={styles.color} item xs={3} alignItems='center'>
        <Grid >
          <Typography variant="h3" align="center">Logga in</Typography>
          <NavLink to="/register">
            <Typography variant="h6" align="center" marginBottom='10px'>Har du inte ett konto? Klicka på mig!</Typography>
          </NavLink>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <TextField
              label='User Name'
              variant='outlined'
              type='text'
              name='userName'
              required={true}
              value={formData.userName}
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
            <br />
            <Grid container justifyContent='center'>
            {(() => {
                if (!checkForm()) {
                  return < DisabledSubmitButton buttontext={buttontext} />
                }
                else {
                  return < SubmitButton isLoading={true} buttontext={buttontext} />
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
