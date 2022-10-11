import TextField from '@mui/material/TextField'
import { useState, useEffect, forwardRef } from 'react'
import { Plan } from '../../shared/Interfaces/savingPlan'
import { useParams } from 'react-router-dom'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useUserContext } from '../../context/UserContext'
import { GetPlans, UpdatePlan } from '../../shared/fetch/savingplan'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Save'
import Grid from '@mui/material/Grid'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const EditSavingPlan: React.FC = () => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [planList, setPlanList] = useState<Plan[]>([])
  const [open, setOpen] = useState(false)
  const [planId, setPlanId] = useState('')
  const [buttontext, setButtonText] = useState('Spara')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(0)

  const user = useUserContext()
  const { id } = useParams()

  useEffect(() => {
    getPlans()
  }, [])

  const getPlans = async () => {
    GetPlans(user.userId)
      .then((response) => {
        console.log('response: ', response)
        let planList = response as Plan[]
        setPlanList(planList)
        const [plan] = planList.filter((plan) => plan.savingId === id) // ?? tidigare är en number type,+id
        if (!plan) {
          return
        }
        setName(plan.name)
        setAmount(plan.amount.toString())
        setStartDate(plan.planStartDate)
        setEndDate(plan.planEndDate)
        setPlanId(plan.savingId)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const HandleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)

    const newData = {
      ['savingId']: id,
      ['name']: name,
      ['amount']: amount,
      ['StartDate']: startDate,
      ['EndDate']: endDate,
    }

    UpdatePlan(newData)
      .then((result) => {
        if (result.status === 200) {
          setOpen(true)
          setName('')
          setAmount('')
          setStartDate('')
          setEndDate('')
          setLoading(false)
          setStatus(result.status)
        }
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
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

  return (
    <>
      <form onSubmit={HandleSubmit}>
        <TextField
          label='name'
          variant='outlined'
          type='text'
          name='name'
          required={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
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
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
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
            {buttontext}
          </LoadingButton>
        </Grid>
      </form>
      {status !== 200 ? showError() : successMessage()}
    </>
  )
}
export default EditSavingPlan
