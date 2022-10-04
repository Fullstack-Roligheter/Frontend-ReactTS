import * as React from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Fragment, useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import axios from 'axios'
import { Plan } from './Plan'
import { useParams } from 'react-router-dom'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { baseURL } from '../../config'
import { SubmitButton } from '../../shared/buttons/button-default'
import Grid from '@mui/material/Grid'
import { useUserContext } from '../../context/UserContext'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const EditSavingPlan: React.FC = () => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [planList, setPlanList] = useState<Plan[]>([])
  const [open, setOpen] = useState(false)
  const [planId, setPlanId] = useState('')
  const [buttontext, setButtonText] = useState('Spara')

  const { userId } = useUserContext()
  const { id } = useParams()

  console.log('lei:::', userId)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const getPlans = async () => {
    try {
      const { data } = await axios(
        `${baseURL}/saving/Getplans?UserId=${userId}`
      )

      let planList = data as Plan[]
      setPlanList(planList)
      const [plan] = planList.filter((plan) => plan.savingId === String(id))

      if (!plan) return
      setTitle(plan.name)
      setAmount(plan.amount.toString())
      setStartDate(plan.planStartDate)
      setEndDate(plan.planEndDate)
      setPlanId(plan.savingId)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPlans()
  }, [])

  const handleEdit = async (id: string) => {
    if (id === null) return
    const newData = await axios.put(`${baseURL}/saving/Updateplan/${id}`, {
      savingId: id,
      name: title,
      amount: amount,
      planStartDate: startDate,
      planEndDate: endDate,
    })
    console.log('byby:::', id)

    if (newData.status === 200) {
      setOpen(true)
      setTitle('')
      setAmount('')
      setStartDate('')
      setEndDate('')
    }
  }

  return (
    <Fragment>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        autoComplete='off'
      >
        <TextField
          required
          value={title}
          label='Title'
          onChange={(e) => setTitle(e.target.value)}
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
          type='date'
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
            onClick={() => handleEdit(planId)}
          />
        </Grid>
      </Box>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Change succeeded
        </Alert>
      </Snackbar>
    </Fragment>
  )
}
export default EditSavingPlan
