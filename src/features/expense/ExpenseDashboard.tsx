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
import { GetBudgetsForUser } from '../../shared/fetch/budget'
import { CreateDebit } from '../../shared/fetch/expense'
import { SubmitButton } from '../../shared/buttons/button-default'



const ExpenseDashboard = (props:userType) => {
  const [categories, setCategories] = useState([])
  const [budgets, setBudgets] = useState([])

  const [newExpense, setNewExpense] = useState({
    Date: '',
    Amount: '',
    Comment: '',
    UserId: props.userId,
    CategoryId: '',
    BudgetId: '',
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

  useEffect (() => {
    GetBudgetsForUser(props.userId)
    .then((Response) => {
      console.log(Response)
      setBudgets(Response)
    })
  },[])

  const handleSubmit = (e : any) => {
    e.preventDefault()
    CreateDebit(newExpense)
    .then((Response) => {
      console.log(Response)
    })
  }

  return (
    <>
      <FormControl onSubmit={handleSubmit} sx={{ m: 2, width: '25ch' }} variant='outlined'>
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
            name='CategoryId'
            value={''}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
          >
            {categories.map((option:any) => (
              <option key={option.categoryId} value={option.categoryId}>
                {option.categoryName}
              </option>
            ))}
          </TextField>
          <TextField
            select
            label='Budget'
            name='BudgetId'
            value={newExpense.BudgetId}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
          >
            {budgets.map((option:any) => (
              <option key={option.budgetId} value={option.budgetId}>
                {option.budgetName}
              </option>
            ))}
          </TextField>
          <TextField
            label='Description'
            multiline
            rows={5}
            helperText='Company, Notes, Reciever Etc.'
            name='Comment'
            value={newExpense.Comment}
            onChange={handleChange}
          />
          {/* <Checkbox
          aria-label='Returning transactions'
          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
        /> */}

        <SubmitButton type='submit' onClick={handleSubmit}/>
      </FormControl>
    </>
  )
}
export default ExpenseDashboard
