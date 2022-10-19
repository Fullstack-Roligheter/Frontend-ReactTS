import { Box, Typography } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { ButtonCollection } from '../../CustomComponents'
import { SubmitButton } from '../../shared/buttons/button-default'
import { useUserContext } from '../../context/UserContext'
import { DeleteCategory } from '../../shared/fetch/category'
import { DeleteCategoryModalProps } from '../../shared/Interfaces/categoryModal'

export const DeleteCategoryModal: FunctionComponent<
  DeleteCategoryModalProps
> = (props) => {
  const user = useUserContext()
  const [isLoading, setloadingState] = useState(false)
  const [message, setmessage] = useState('')
  const [messageState, setmessageState] = useState(false)
  const deleteData: any = {
    categoryId: props.categoryId,
    userId: user.userId,
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setloadingState(true)
    setmessage('Deleting Category')
    setmessageState(true)
    DeleteCategory(deleteData)
      .then(() => {
        setmessage('Category Successfully Deleted')
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
        <Typography>{props.categoryName}</Typography>
        <br />
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
