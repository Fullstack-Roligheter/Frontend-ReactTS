import { Box, Typography } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { ButtonCollection } from '../../../CustomComponents'
import { SubmitButton } from '../../../shared/buttons/button-default'
import { useUserContext } from '../../../context/UserContext'
import { DeleteDebit} from '../../../shared/fetch/expense'
import { DeleteDebitModalProps } from '../../../shared/Interfaces/debitModal'

export const DeleteDebitModal: FunctionComponent<
  DeleteDebitModalProps
> = (props) => {
  const user = useUserContext()
  const [isLoading, setloadingState] = useState(false)
  const [message, setmessage] = useState('')
  const [messageState, setmessageState] = useState(false)
  const [debitDate, setDebitDate] = useState(props.debitDate)
  const [debitAmount, setDebitAmount] = useState(props.debitAmount)
  const [debitComment, setDebitComment] = useState(props.debitComment)
  const [debitCategoryId, setDebitCategoryId] = useState(props.debitCategoryId)
  const [debitBudget, setDebitBudget] = useState(props.debitBudget)
  const deleteData: any = {
    debitId: props.debitId,
    userId: user.userId,
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setloadingState(true)
    setmessage('Deleting Debit')
    setmessageState(true)
    DeleteDebit(deleteData)
      .then(() => {
        setmessage('Debit Successfully Deleted')
        setloadingState(false)
      })
      .catch((err) => {
        setmessage('Delete Unsuccessful')
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
        <Typography>{debitDate.toISOString()}</Typography>
        <br />
        <Typography>{debitAmount}</Typography>
        <br />
        <Typography>{debitComment}</Typography>
        <br />
        <Typography>{debitCategoryId}</Typography>
        <br />
        <Typography>{debitBudget}</Typography>
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
        <br />
        <ButtonCollection>
          <SubmitButton isLoading={isLoading} buttontext={'Delete'} />
        </ButtonCollection>
      </form>
    </>
  )
}
