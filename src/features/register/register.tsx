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
import { useNavigate } from 'react-router'
import styles from '../../CssStyles.js'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [message, setmessage] = useState('')
  const [messageState, setmessageState] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2)
  const handleMouseDownPassword2 = () => setShowPassword2(!showPassword2)

  const [sPassword, setPassword] = useState('')
  const [isLoading, setloadingState] = useState(false)

  const navigate = useNavigate()

  //zod
  const registerSchema = z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      password: z
        .string()
        .min(4, { message: 'Password must be at least 4 characters' })
        .regex(new RegExp('[A-Z]'), {
          message: 'Password must contain at least one uppercase letter',
        })
        .regex(new RegExp('[a-z]'), {
          message: 'Password must contain at least one lowercase letter',
        })
        .regex(new RegExp('[0-9]'), {
          message: 'Password must contain at least one number',
        })
        .regex(new RegExp('[#?!@$ %^&*-]'), {
          message: 'Password must contain at least special character',
        }),
      comfirmPassword: z.string(),
    })
    .refine((data) => data.password === data.comfirmPassword, {
      message: 'Password does not match',
      path: ['comfirmPassword'],
    })

  type Schema = z.infer<typeof registerSchema>

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = handleSubmit(({ firstName, lastName, email, password }) => {
    Register({
      firstName,
      lastName,
      email,
      password,
    })
      .then((response) => {
        alert('Du är nu registrerad')
        setTimeout(() => {
          navigate(`/login`)
        }, 1000)
      })
      .catch((error) => {
        setTimeout(() => {
          setmessage(error.response.data)
          setmessageState(true)
          setTimeout(() => {
            setmessageState(false)
          }, 3000)
        })
      })
  })

  return (
    <Grid
      container
      spacing={1}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: '70vh' }}
    >
      <Grid style={styles.formBackground} alignItems='center' item xs={3}>
        <Grid>
          <Typography
            variant='h3'
            align='center'
            style={styles.whiteTypography}
          >
            Create new account
          </Typography>
          <Box
            sx={{
              marginBottom: '15px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='h6'
              align='center'
              component='a'
              href='/login'
              style={styles.linkTypography}
            >
              Do you want to log in? Click me!
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <form onSubmit={onSubmit}>
            <TextField
              label='First Name'
              variant='outlined'
              type='text'
              style={styles.textfield}
              {...register('firstName')}
            />
            <br />
            <br />
            <TextField
              label='Last Name'
              variant='outlined'
              type='text'
              style={styles.textfield}
              {...register('lastName')}
            />
            <br />
            <br />
            <TextField
              label='Enter email'
              variant='outlined'
              type='text'
              style={styles.textfield}
              {...register('email')}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />

            <br />
            <br />
            <TextField
              label=' Select Password'
              variant='outlined'
              error={!!errors['password']?.message}
              helperText={errors['password']?.message}
              {...register('password')}
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
              error={Boolean(errors.comfirmPassword)}
              helperText={errors['comfirmPassword']?.message}
              {...register('comfirmPassword')}
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
              <SubmitButton isLoading={isLoading} buttontext={'Sign Up'} />
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default RegisterUser
