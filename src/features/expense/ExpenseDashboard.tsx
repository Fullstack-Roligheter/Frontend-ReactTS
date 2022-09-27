import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import { Button, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { userType } from '../../shared/Interfaces/userToken'
import { GetCategoriesForUser } from '../../shared/fetch/category'
import { GetBudgetsForUser } from '../../shared/fetch/budget'
import { CreateDebit, GetDebitsForUser } from '../../shared/fetch/expense'



const ExpenseDashboard = (props: userType) => {
  const [categories, setCategories] = useState([])
  const [budgets, setBudgets] = useState([])
  const [debits, setDebits] = useState([])

  const [newExpense, setNewExpense] = useState({
    Date: '',
    Amount: '',
    Comment: '',
    UserId: props.userId,
    CategoryId: null,
    BudgetId: null,
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

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (newExpense.BudgetId === '') {
      newExpense.BudgetId = null
    }
    if (newExpense.CategoryId === '') {
      newExpense.CategoryId = null
    }
    CreateDebit(newExpense).then((Response) => {
      console.log(Response)
    })
  }

  //Get categories for user to put in select
  useEffect(() => {
    GetCategoriesForUser(props.userId).then((Response) => {
      console.log(Response)
      setCategories(Response)
    })
  }, [])

  //Get budgets for user to put in select
  useEffect(() => {
    GetBudgetsForUser(props.userId).then((Response) => {
      console.log(Response)
      setBudgets(Response)
    })
  }, [])

  //Get all debits to put in list
  useEffect(() => {
    console.log('props.userId: ', props.userId)
    GetDebitsForUser(props.userId).then((Response) => {
      console.log(Response)
      setDebits(Response)
    })
  }, [])
  console.log(debits)

  //Grön styling för när vi ändrar färg på standardfärgen i projektet
  //sx={{ width: 1, m: 3, mt: 7, p: 3, pt: 1, border: 1, borderColor: 'text.disabled', borderRadius: 2, bgcolor: 'rgba(120, 174, 135, 0.7)'}}
  return (
    <>
      <form onSubmit={handleSubmit}>
          <FormControl sx={{ width: 330, m: 3, mt: 7, p: 3, pt: 1, borderRadius: 2, bgcolor: 'RGBA(255,255,255,0.65)', boxShadow: 5 }}>
            <TextField
              required
              type='date'
              name='Date'
              value={newExpense.Date}
              onChange={handleChange}
              margin='normal'
            />
            <TextField
              required
              label='Amount'
              type='number'
              name='Amount'
              value={newExpense.Amount}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>Kr</InputAdornment>
                ),
              }}
              margin='normal'
            />
            <TextField
              select
              label='Category'
              name='CategoryId'
              value={newExpense.CategoryId}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              margin='normal'
            >
              <option value='' />
              {categories.map((option: any) => (
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
              margin='normal'
            >
              <option value='' />
              {budgets.map((option: any) => (
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
              margin='normal'
            />
            {/* <Checkbox
          aria-label='Returning transactions'
          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
        /> */}

            <Button variant='contained' type='submit' onClick={handleSubmit}>
              Submit
            </Button>
          </FormControl>
      </form>
    </>
  )
}
export default ExpenseDashboard
