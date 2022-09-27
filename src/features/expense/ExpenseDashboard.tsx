import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import { useEffect, useState } from 'react'
import { userType } from '../../shared/Interfaces/userToken'
import { GetCategoriesForUser } from '../../shared/fetch/category'



const ExpenseDashboard = (props:userType) => {
  const [categories, setCategories] = useState([])

  const [newExpense, setNewExpense] = useState({
    Date: '',
    Amount: '',
    Category: '',
    Budget: '',
    Description: '',
    // ReturningTransactions: false,
  })


  console.log(newExpense)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setNewExpense({
      ...newExpense,
      [name]: value,
    })
  }

  useEffect (() => {
    GetCategoriesForUser(props.userId)
    .then((Response) => {
      console.log(Response)
      setCategories(Response)
    })
  },[])

  const Budget = [
    {
      value: 'Standard',
      label: 'Standard',
    },
    {
      value: 'Bilbudget',
      label: 'Bilbudget',
    },
    {
      value: 'Köksrenovering',
      label: 'Köksrenovering',
    },
  ]

  return (
    <>
      <FormControl sx={{ m: 2, width: '25ch' }} variant='outlined'>
          <TextField
            required
            //   label='Date'
            type='date'
            name='Date'
            value={newExpense.Date}
            onChange={handleChange}
          />
          <TextField
            required
            label='Amount'
            type='number'
            name='Amount'
            value={newExpense.Amount}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position='end'>Kr</InputAdornment>,
            }}
          />
          <TextField
            required
            select
            label='Category'
            name='Category'
            value={newExpense.Category}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
          >
            {/* {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))} */}
          </TextField>
          <TextField
            select
            label='Budget'
            name='Budget'
            value={newExpense.Budget}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
          >
            {Budget.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            label='Description'
            multiline
            rows={5}
            helperText='Company, Notes, Reciever Etc.'
            name='Description'
            value={newExpense.Description}
            onChange={handleChange}
          />
          {/* <Checkbox
          aria-label='Returning transactions'
          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
        /> */}

        {/* <SubmitButton onclick={AddExpense(newExpense)}/> */}
      </FormControl>
    </>
  )
}
export default ExpenseDashboard
