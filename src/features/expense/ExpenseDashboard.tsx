import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'

import { Box, FormControlLabel, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import {
  GetCategoriesForUser,
  GetUserCreatedCatogories,
} from '../../shared/fetch/category'
import { GetBudgetsForUser } from '../../shared/fetch/budget'
import { CreateDebit, GetDebitsForUser } from '../../shared/fetch/expense'
import { DateFetcher } from '../../shared/functions/functions'

import { Modal } from '../../shared/modal/modal'
import { useModal } from '../../shared/modal/useModal'
import { NewCategoryModal } from '../Category/newCategoryModal/newcategoryModal'
import {
  DisabledSubmitButton,
  SubmitButton,
  AddButton,
} from '../../shared/buttons/button-default'
import styles from '../../CssStyles'

import { useUserContext } from '../../context/UserContext'
import ExpenseListOutput from './ExpenseListOutput'
import { string } from 'zod'

const ExpenseDashboard = () => {
  const user = useUserContext()

  const [message, setMessage] = useState('')
  const [messageState, setMessageState] = useState(false)
  const [debits, setDebits] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [budgets, setBudgets] = useState<any[]>([])
  const { isShown, toggle } = useModal()
  const [isLoading, setLoadingState] = useState(false)
  const [ReturningTransactionsStart, setReturningTransactionsStart] =
    useState('')
  const [ReturningTransactionsEnd, setReturningTransactionsEnd] = useState('')

  type newExpenseType = {
    Date: string
    Amount: string
    Comment: string
    UserId: string | null
    CategoryId: string | null | undefined
    BudgetId: string | null | undefined
    ReturningTransactions: boolean
  }

  const initialState: newExpenseType = {
    Date: '',
    Amount: '',
    Comment: '',
    UserId: user.userId,
    CategoryId: '',
    BudgetId: '',
    ReturningTransactions: false,
    // ReturningTransactionsStart: '',
    // ReturningTransactionsEnd: '',
  }

  const [newExpense, setNewExpense] = useState<newExpenseType>(initialState)

  const onConfirm = () => toggle()

  const checkForm = () => {
    if (newExpense.Date === '' || newExpense.Amount === '') {
      return false
    } else {
      if (newExpense.ReturningTransactions) {
        if (
          ReturningTransactionsStart === '' ||
          ReturningTransactionsEnd === ''
        ) {
          return false
        }
      }
      return true
    }
  }

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
    setLoadingState(true)
    if (newExpense.BudgetId === '') {
      newExpense.BudgetId = undefined
    }
    if (newExpense.CategoryId === '') {
      newExpense.CategoryId = undefined
    }
    CreateDebit(newExpense).then((Response) => {
      UpdateDebitsState()

      setTimeout(() => {
        setNewExpense(initialState)
        setLoadingState(false)
        setMessage('Transaction Created')
        setMessageState(true)
        setTimeout(() => {
          setMessageState(false)
        }, 3000)
      })
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
      setCategories(Response)
    })
  }, [])

  //Get budgets for user to put in select
  useEffect(() => {
    GetBudgetsForUser(user.userId).then((Response) => {
      setBudgets(Response)
    })
  }, [])

  //DateFetcher
  useEffect(() => {
    let currentDate = DateFetcher()
    setNewExpense({
      ...newExpense,
      Date: currentDate,
    })
    setReturningTransactionsStart(currentDate)
    setReturningTransactionsEnd(currentDate)
  }, [])

  //Get all debits to put in list
  useEffect(() => {
    if (!debits.length) {
      GetDebitsForUser(user.userId).then((Response) => {
        setDebits(Response)
      })
    }
  }, [])

  const UpdateDebitsState = () => {
    GetDebitsForUser(user.userId).then((Response) => {
      setDebits(Response)
    })
  }

  //Grön styling för när vi ändrar färg på standardfärgen i projektet, den accepterar denna variabel och tolkar som strängen den sparat
  //sx={{ width: 1, m: 3, mt: 7, p: 3, pt: 1, border: 1, borderColor: 'text.disabled', borderRadius: 2, bgcolor: styles.formBackground.background}}
  return (
    <>
      <Box
        width={400}
        sx={{ mb: 2 }}
        display='flex'
        flexWrap='wrap'
        justifyContent='center'
        boxSizing='border-box'
      >
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
              <>
                <Box style={styles.addButton} onClick={toggle}>
                  <AddButton />
                </Box>
                <Modal
                  isShown={isShown}
                  hide={toggle}
                  headerText='Add your own category'
                  modalContent={
                    <NewCategoryModal
                      onConfirm={onConfirm}
                      message='Name of your new category'
                      categories={categories}
                      callBack={getCategories}
                    />
                  }
                />
              </>
            </Box>
            <Typography
              sx={{ textAlign: 'center' }}
              style={styles.textIncludedInForm}
            >
              Click the plus icon to add a new category
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name='ReturningTransactions'
                    onChange={handleBoolean}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
                  />
                }
                label='Recurring expense'
                labelPlacement='start'
              />
              {(() => {
                if (newExpense.ReturningTransactions) {
                  return (
                    <Box>
                      <TextField
                        required
                        type='date'
                        name='Date'
                        label='Date'
                        value={ReturningTransactionsStart}
                        onChange={(e) =>
                          setReturningTransactionsStart(e.target.value)
                        }
                        margin='normal'
                        style={styles.textfield}
                      />

                      <br />
                      <TextField
                        required
                        type='date'
                        name='Date'
                        label='Date'
                        value={ReturningTransactionsEnd}
                        onChange={(e) =>
                          setReturningTransactionsEnd(e.target.value)
                        }
                        margin='normal'
                        style={styles.textfield}
                      />
                    </Box>
                  )
                }
              })()}
            </Box>
            {(() => {
              if (messageState) {
                return (
                  <Box height={'20px'}>
                    <Typography>{message}</Typography>
                  </Box>
                )
              }
              if (!messageState) {
                return <Box height={'20px'}></Box>
              }
            })()}
            {(() => {
              if (!checkForm()) {
                return (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <DisabledSubmitButton buttontext={'Save expense'} />
                  </Box>
                )
              } else {
                return (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <SubmitButton
                      isLoading={isLoading}
                      buttontext={'Save expense'}
                    />
                  </Box>
                )
              }
            })()}
          </FormControl>
        </form>
      </Box>
      <Box
        display='flex'
        width={{ xs: 2, sm: 2 / 3, md: 2 / 4 }}
        mb={{ xs: '10px', md: 0 }}
        boxSizing='border-box'
        sx={{ minHeight: '800px' }}
      >
        <ExpenseListOutput
          debits={debits}
          categories={categories}
          budgets={budgets}
          callBack={UpdateDebitsState}
        />
      </Box>
    </>
  )
}
export default ExpenseDashboard
