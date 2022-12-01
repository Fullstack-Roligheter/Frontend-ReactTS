import { Box, TextField, Typography } from '@mui/material'
import { FormEvent, FunctionComponent, useState, useRef } from 'react'
import styles from '../../../CssStyles'
import { ButtonCollection } from '../../../CustomComponents'
import {
  DisabledSubmitButton,
  SubmitButton,
} from '../../../shared/buttons/button-default'
import { useUserContext } from '../../../context/UserContext'
import { EditCategory } from '../../../shared/fetch/category'
import {
  EditCategoryModalProps,
  EditSubmitData,
} from '../../../shared/Interfaces/categoryModal'

export const EditCategoryModal: FunctionComponent<EditCategoryModalProps> = (
  props
) => {
  const user = useUserContext()
  const ref = useRef(null)

  const [categoryName, setCategoryName] = useState(props.categoryOldName)
  const [isLoading, setloadingState] = useState(false)
  const [message, setmessage] = useState('')
  const [messageState, setmessageState] = useState(false)

  const editSumbitData: EditSubmitData = {
    userId: user.userId,
    categoryId: props.categoryId,
    categoryName: categoryName,
  }
  const categories = props.categories
  const oldName = props.categoryOldName

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      categories.some(
        (category: { categoryName: string }) =>
          category.categoryName.toLowerCase() === categoryName.toLowerCase()
      )
    ) {
      setmessage('Category Already Exists')
      setmessageState(true)
      setTimeout(() => {
        setmessageState(false)
        setloadingState(false)
      }, 2000)
    } else {
      setloadingState(true)
      setmessage('Edit Category')
      setmessageState(true)
      EditCategory(editSumbitData)
        .then((response) => {
          setmessage('Category Saved')
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
  }

  return (
    <>
      <Typography variant='subtitle1' align='center'>
        {props.message}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          ref={ref}
          variant='outlined'
          type='text'
          name='categoryName'
          required={true}
          value={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value)
          }}
          style={styles.textfield}
        />
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
          {(() => {
            if (categoryName === '' || categoryName === oldName) {
              return <DisabledSubmitButton buttontext={'Save'} />
            } else {
              return <SubmitButton isLoading={isLoading} buttontext={'Save'} />
            }
          })()}
        </ButtonCollection>
      </form>
    </>
  )
}
