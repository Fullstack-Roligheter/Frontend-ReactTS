import TextField from '@mui/material/TextField'
import { forwardRef, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { Grid } from '@mui/material'
import { CreateSaving } from '../../shared/fetch/savingplan'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Save'
import { useUserContext } from '../../context/UserContext'
import { SubmitButton } from '../../shared/buttons/button-default'

const CreateSavingPlan = () => {
  const user = useUserContext()

  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(0)
  const [loading, setLoading] = useState(false)
  const [buttontext, setButtonText] = useState('Create')

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
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

  return (
    <>
      <form onSubmit={HandleSubmit}>
        <TextField
          label='Name'
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
          label='Amount'
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
          label='StartDate'
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
          label='EndDate'
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
          <SubmitButton isLoading={loading} buttontext={buttontext} />
        </Grid>
      </form>
      {status !== 200 ? showError() : successMessage()}
    </>
  )
}
export default CreateSavingPlan
