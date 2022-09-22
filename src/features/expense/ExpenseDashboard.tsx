import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react'

const ExpenseDashboard = () => {
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

  const Categories = [
    {
      value: 'Hushåll',
      label: 'Hushåll',
    },
    {
      value: 'Transport',
      label: 'Transport',
    },
    {
      value: 'Nöje',
      label: 'Nöje',
    },
    {
      value: 'Mat',
      label: 'Mat',
    },
  ]

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
      <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
        <br />
        <TextField
          required
        //   label='Date'
          type='date'
		  name='Date'
          value={newExpense.Date}
          onChange={handleChange}
        />
        <br />
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
        <br />
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
          {Categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <br />
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
        <br />
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
      </FormControl>
    </>
  )
}
export default ExpenseDashboard
