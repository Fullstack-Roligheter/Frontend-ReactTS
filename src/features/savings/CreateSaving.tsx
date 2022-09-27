import * as React from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Fragment, useState } from 'react'
import Button from '@mui/material/Button'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { baseURL } from '../../config'
import { Grid, IconButton, InputAdornment, useRadioGroup } from '@mui/material'
import {
  DisabledSubmitButton,
  SubmitButton,
} from '../../shared/buttons/button-default'
import { userType } from '../../shared/Interfaces/userToken'
import { CreateSaving } from '../../shared/fetch/savingplan'
import { TableView, Visibility, VisibilityOff } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Save'

const CreateSavingPlan = (user: userType) => {
  // console.log('user props in createsaving: ', user)
  // const [name, setName] = useState('')
  // const [amount, setAmount] = useState('')
  // const [startDate, setStartDate] = useState('')
  // const [endDate, setEndDate] = useState('')
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(0)
  const [loading, setLoading] = useState(false)
  // const [buttontext, setButtonText] = useState('Spara')

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  })

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    setLoading(false)
  }

  const successMessage = () => {
    return (
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Your plan has been successfully saved!
        </Alert>
      </Snackbar>
    )
  }
  const showError = () => {
    return (
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          You need to fill in correctly!
        </Alert>
      </Snackbar>
    )
  }

  const HandleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    CreateSaving(formData)
      .then((response) => {
        setStatus(response.status)
        setOpen(true)
        setLoading(false)
        setFormData({
          userId: user.userId,
          name: '',
          amount: 0,
          startDate: '',
          endDate: '',
        })
      })
      .catch((error) => {
        console.log('Error: ', error)
        if (error.request.status === 401) {
          alert('Access Denied')
          setOpen(true)
        }
        setStatus(400)
        setOpen(true)
        setLoading(false)
      })
  }
  const [formData, setFormData] = useState({
    userId: user.userId,
    name: '',
    amount: 0,
    startDate: '',
    endDate: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // const addPlan = async () => {
  //   try {
  //     let numberValue: string | null = ''
  //     const value = sessionStorage.getItem('user')
  //     if (value !== null) {
  //       numberValue = JSON.parse(value)
  //     } else {
  //       console.log('never entered parse value')
  //     }

  //     const sendData = await axios.post(`${baseURL}/saving/createsavingplan`, {
  //       userId: user.userId,
  //       name: name,
  //       amount: amount,
  //       planStartDate: startDate,
  //       planEndDate: endDate,
  //     })
  //     if (sendData.status === 200) {
  //       setStatus(sendData.status)
  //       setOpen(true)
  //       setName('')
  //       setAmount('')
  //       setStartDate('')
  //       setEndDate('')
  //     }
  //   } catch (error) {
  //     if ((error = 'AxiosError')) {
  //       setOpen(true)
  //       setStatus(400)
  //     }
  //   }
  // }

  return (
    <Fragment>
      {/* <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        autoComplete='off'
      >
        <TextField
          required
          value={name}
          label='Title'
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <TextField
          required
          value={amount}
          label='Amount'
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <TextField
          required
          value={startDate}
          label='Start Date'
          type='Date'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <br />
        <TextField
          required
          value={endDate}
          label='End Date'
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <br />
        <Grid container justifyContent='center'>
          <SubmitButton
            isLoading={true}
            buttontext={buttontext}
            onClick={addPlan}
          />
        </Grid>
      </Box> */}

      <form onSubmit={HandleSubmit}>
        <TextField
          label='name'
          variant='outlined'
          type='text'
          name='name'
          required={true}
          value={formData.name}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <br />
        <TextField
          label='amount'
          variant='outlined'
          type='text'
          name='amount'
          required={true}
          value={formData.amount}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <br />
        <TextField
          label='startDate'
          variant='outlined'
          type='date'
          name='startDate'
          required={true}
          value={formData.startDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <br />
        <TextField
          label='endDate'
          variant='outlined'
          type='date'
          name='endDate'
          required={true}
          value={formData.endDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <br />
        <Grid container justifyContent='center'>
          <LoadingButton
            type='submit'
            loading={loading}
            onClick={HandleSubmit}
            variant='contained'
            startIcon={<SendIcon />}
            loadingPosition='start'
          >
            Save
          </LoadingButton>
        </Grid>
      </form>
      {status !== 200 ? showError() : successMessage()}
    </Fragment>
  )
}
export default CreateSavingPlan
