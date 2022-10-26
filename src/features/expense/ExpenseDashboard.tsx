import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'

import {
  Box,
  Button,
  IconButton,
  FormControlLabel,
  Paper,
  Typography,
} from '@mui/material'
import React, { useEffect, useState, Component, FunctionComponent } from 'react'
import { userType } from '../../shared/Interfaces/userToken'

import {
  GetCategoriesForUser,
  GetUserCreatedCatogories,
} from '../../shared/fetch/category'
import { GetBudgetsForUser } from '../../shared/fetch/budget'
import { CreateDebit, GetDebitsForUser } from '../../shared/fetch/expense'
import { DateFetcher } from '../../shared/dateFetcher/dateFetcher'

import { render } from 'react-dom'
import { Modal } from '../../shared/modal/modal'
import { useModal } from '../../shared/modal/useModal'
import { NewCategoryModal } from '../newCategoryModal/newcategoryModal'
import {
  DisabledSubmitButton,
  SubmitButton,
  AddButton,
} from '../../shared/buttons/button-default'
import styles from '../../CssStyles'

import { useUserContext } from '../../context/UserContext'
import ExpenseListOutput from './ExpenseListOutput'

const ExpenseDashboard = () => {
  const user = useUserContext()

  const [message, setmessage] = useState('')
  const [messageState, setmessageState] = useState(false)

  const [categories, setCategories] = useState<any[]>([])
  const [budgets, setBudgets] = useState<any[]>([])
  const [debits, setDebits] = useState<any[]>([])
  const { isShown, toggle } = useModal()
  const [isLoading, setloadingState] = useState(false)
  const onConfirm = () => toggle()
  const onCancel = () => toggle()

  const [newExpense, setNewExpense] = useState({
    Date: '',
    Amount: '',
    Comment: '',
    UserId: user.userId,
    CategoryId: undefined,
    BudgetId: undefined,
    ReturningTransactions: false,
  })
  const checkForm = () => {
    if (
      newExpense.Date === '' ||
      newExpense.Amount === '' ||
      newExpense.CategoryId === undefined
    ) {
      return false
    } else {
      return true
    }
  }

  console.log(newExpense)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setNewExpense({
      ...newExpense,
      [name]: value,
    })
  }

  const handleBoolean = (e: any) => {
    const { name, checked } = e.target
    setNewExpense({
      ...newExpense,
      [name]: checked,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setloadingState(true)
    if (newExpense.BudgetId === '') {
      newExpense.BudgetId = undefined
    }
    if (newExpense.CategoryId === '') {
      newExpense.CategoryId = undefined
    }
    CreateDebit(newExpense).then((Response) => {
      console.log(Response)
      setTimeout(() => {
        setloadingState(false)
        setmessage('Transaction Created')
        setmessageState(true)
        setTimeout(() => {
          setmessageState(false)
        }, 3000)
      }, 3000)
    })
  }

  function getCategories(): any {
    GetUserCreatedCatogories(user.userId).then((Response) => {
      setCategories(Response)
    })
  }

  //Get categories for user to put in select
  useEffect(() => {
    GetCategoriesForUser(user.userId).then((Response) => {
      console.log(Response)
      setCategories(Response)
    })
  }, [])

  //Get budgets for user to put in select
  useEffect(() => {
    GetBudgetsForUser(user.userId).then((Response) => {
      console.log(Response)
      setBudgets(Response)
    })
  }, [])

  useEffect(() => {
    let currentDate = DateFetcher()
    setNewExpense({
      ...newExpense,
      Date: currentDate,
    })
  }, [])

  //Grön styling för när vi ändrar färg på standardfärgen i projektet, den accepterar denna variabel och tolkar som strängen den sparat
  //sx={{ width: 1, m: 3, mt: 7, p: 3, pt: 1, border: 1, borderColor: 'text.disabled', borderRadius: 2, bgcolor: styles.formBackground.background}}
  return (
    <>
      <Box width={1}
        sx={{ mb: 2 }}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        boxSizing="border-box">
        <form onSubmit={handleSubmit}>
          <FormControl
            sx={{
              width: 330,
              m: 3,
              mt: 7,
              p: 3,
              pt: 1,
              borderRadius: 2,
              bgcolor: 'RGBA(255,255,255,0.65)',
              boxShadow: 5,
            }}
          >
            <TextField
              required
              type='date'
              name='Date'
              label='Date'
              value={newExpense.Date}
              onChange={handleChange}
              margin='normal'
              style={styles.textfield}
            // InputLabelProps={{shrink:true}}
            />
            <TextField
              required
              label='Amount'
              type='number'
              name='Amount'
              value={newExpense.Amount}
              onChange={handleChange}
              style={styles.textfield}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>Kr</InputAdornment>
                ),
              }}
            />
            <TextField
              required
              type='date'
              name='Date'
              label='Date'
              value={newExpense.Date}
              onChange={handleChange}
              margin='normal'
              style={styles.textfield}
            // InputLabelProps={{shrink:true}}
            />
            <TextField
              required
              label='Amount'
              type='number'
              name='Amount'
              value={newExpense.Amount}
              onChange={handleChange}
              style={styles.textfield}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>Kr</InputAdornment>
                ),
              }}
              margin='normal'
            />
            <Box display='flex' alignItems='center'>
              <TextField
                select
                label='Category'
                name='CategoryId'
                value={newExpense.CategoryId}
                onChange={handleChange}
                style={styles.textfield}
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
              <React.Fragment>
                <IconButton style={styles.addButton} onClick={toggle}>
                  <AddButton />
                </IconButton>
                <Modal
                  isShown={isShown}
                  hide={toggle}
                  headerText='Lägg till egen kategori'
                  modalContent={
                    <NewCategoryModal
                      onConfirm={onConfirm}
                      // onCancel={onCancel}
                      message='Skriv in namn på nya kategorin'
                      categories={categories}
                      callBack={getCategories}
                    />
                  }
                />
              </React.Fragment>
            </Box>
            <Typography
              sx={{ textAlign: 'center' }}
              style={styles.textIncludedInForm}
            >
              Tryck på plusset för att lägga till en ny kategori
            </Typography>
            <TextField
              select
              label='Budget'
              name='BudgetId'
              value={newExpense.BudgetId}
              onChange={handleChange}
              style={styles.textfield}
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name='ReturningTransactions'
                    onChange={handleBoolean}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
                  />
                }
                label='Return transactions'
                labelPlacement='start'
              />
            </Box>
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
            {(() => {
              if (!checkForm()) {
                return <DisabledSubmitButton buttontext={'Spara utgift'} />
              } else {
                return (
                  <SubmitButton
                    isLoading={isLoading}
                    buttontext={'Spara utgift'}
                  />
                )
              }
            })()}
          </FormControl>
        </form>
      </Box>
      <ExpenseListOutput />
      <Box
        display="flex"
        width={{ xs: 2, sm: 2 / 3, md: 2 / 4 }}
        mb={{ xs: '10px', md: 0 }}
        boxSizing="border-box"
      >
        <ExpenseListOutput />
      </Box>
    </>
  )
}
export default ExpenseDashboard
