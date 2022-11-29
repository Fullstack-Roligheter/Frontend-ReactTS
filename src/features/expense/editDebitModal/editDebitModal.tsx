import {
  Box,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import {
  FormEvent,
  FunctionComponent,
  useState,
  useRef,
  useEffect,
} from 'react'
import styles from '../../../CssStyles'
import {
  DisabledSubmitButton,
  SubmitButton,
} from '../../../shared/buttons/button-default'
import { useUserContext } from '../../../context/UserContext'
import { EditDebit } from '../../../shared/fetch/expense'
import {
  EditDebitModalProps,
  EditSubmitData,
} from '../../../shared/Interfaces/debitModal'

export const EditDebitModal: FunctionComponent<EditDebitModalProps> = (
  props
) => {
  const user = useUserContext()
  const ref = useRef(null)

  const [debitDate, setDebitDate] = useState(props.debitDate)
  const [debitAmount, setDebitAmount] = useState(props.debitAmount)
  const [debitComment, setDebitComment] = useState(props.debitComment)
  const [debitCategory, setdebitCategory] = useState(props.debitCategory)
  const [debitBudget, setDebitBudget] = useState(props.debitBudget)
  const [isLoading, setloadingState] = useState(false)
  const [message, setmessage] = useState('')
  const [messageState, setmessageState] = useState(false)

  const editSumbitData: EditSubmitData = {
    debitId: props.debitId,
    date: debitDate,
    amount: debitAmount,
    comment: debitComment,
    userId: user.userId,
    categoryId: debitCategory,
    budgetId: debitBudget,
  }
  const debits = props.debits
  const debitId = props.debitId
  const categories = props.categories
  const budgets = props.budgets

  const checkForm = () => {
    if (
      debitDate === null ||
      debitAmount === null ||
      debitCategory === undefined
    ) {
      return false
    } else {
      return true
    }
  }
  // const FindCategoryId =()=>{
  //   console.log(categories)
  //   const categoryMatch = categories.find((categoryName:string) => categoryName === debitCategory)
  //   editSumbitData.categoryId = categoryMatch.categoryId
  // }

    const getCatId = (catName: string) => {
    const categoriesArray = props.categories
    categoriesArray.forEach((categoryItem: any) => {
      if (catName === categoryItem.categoryName) {
        editSumbitData.categoryId = categoryItem.categoryId
        setdebitCategory(categoryItem.categoryId)
      }
    })
  }

  const getBudgetId = (budName: string) => {
    const budgetsArray = props.budgets
    budgetsArray.forEach((budgetItem: any) => {
      if (budName === budgetItem.budgetName) {
        editSumbitData.budgetId = budgetItem.budgetId
        setDebitBudget(budgetItem.budgetId)
      }
    })
  }

  function DateConverter() {
    const propDate = props.debitDate
    let todaysDate = new Date(propDate)
    todaysDate.setDate(todaysDate.getDate() + 1)
    const date = todaysDate.toISOString().substring(0, 10)
    return date
  }

  useEffect(() => {
    var debitDate = DateConverter()
    setDebitDate(debitDate as unknown as Date)
    getCatId(debitCategory)
    getBudgetId(debitBudget)
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setloadingState(true)
    setmessage('Edit Debit')
    setmessageState(true)

    EditDebit(editSumbitData)
      .then((response) => {
        setmessage('Debit Saved')
        setloadingState(false)
      })
      .catch((err) => {
        setmessage('Edit Unsuccessful')
        setloadingState(false)
      })
      .finally(() => {
        setTimeout(() => {
          setmessageState(false)
          props.onConfirm()
          props.callBack()
        }, 2000)
      })
  }

  return (
    <>
      <Typography variant='subtitle1' align='center'>
        {props.message}
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            required
            type='date'
            name='Date'
            label='Date'
            value={debitDate}
            onChange={(e) => setDebitDate(e.target.value as unknown as Date)}
            margin='normal'
            style={styles.textfield}
          />
          <TextField
            required
            label='Amount'
            type='number'
            name='Amount'
            value={debitAmount}
            onChange={(e) =>
              setDebitAmount(e.target.value as unknown as number)
            }
            style={styles.textfield}
            InputProps={{
              endAdornment: <InputAdornment position='end'>Kr</InputAdornment>,
            }}
            margin='normal'
          />
          <TextField
            select
            label='Category'
            name='CategoryId'
            value={debitCategory}
            defaultValue={debitCategory}
            onChange={(e) => setdebitCategory(e.target.value)}
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
          <TextField
            select
            label='Budget'
            name='BudgetId'
            value={debitBudget}
            defaultValue={debitBudget}
            onChange={(e) => setDebitBudget(e.target.value)}
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
            value={debitComment}
            onChange={(e) => setDebitComment(e.target.value)}
            margin='normal'
          />
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
        <br />
      </form>
    </>
  )
}
