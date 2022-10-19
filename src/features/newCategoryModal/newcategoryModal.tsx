import { Box, Button, TextField, Typography } from '@mui/material'
import { FunctionComponent, useState, FormEvent } from 'react'
import styles from '../../CssStyles'
import { ButtonCollection } from '../../CustomComponents'
import {
  DisabledSubmitButton,
  SubmitButton,
} from '../../shared/buttons/button-default'
import { useUserContext } from '../../context/UserContext'
import { CreateCategory } from '../../shared/fetch/category'
import {
  CreateSubmitData,
  NewCategoryModalProps,
} from '../../shared/Interfaces/categoryModal'

export const NewCategoryModal: FunctionComponent<NewCategoryModalProps> = (
  props
) => {
  const user = useUserContext()
  const [categoryName, setCategoryName] = useState('')
  const [isLoading, setLoadingState] = useState(false)
  const [message, setMessage] = useState('')
  const [messageState, setMessageState] = useState(false)
  const [categoryExist, setCategoryExist] = useState(false)

  const submitData: CreateSubmitData = {
    userId: '',
    name: '',
  }
  const categories = props.categories

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      categories.some(
        (category: { categoryName: string }) =>
          category.categoryName.toLowerCase() === categoryName.toLowerCase()
      )
    ) {
      setMessage('Category already exists')
      setMessageState(true)
      setCategoryExist(true)
      setTimeout(() => {
        setMessageState(false)
        setLoadingState(false)
      }, 2000)
    } else {
      if (user.userId != null) {
        submitData.userId = user.userId
        submitData.name = categoryName
      }
      setLoadingState(true)
      setMessage('Create New Category')
      setMessageState(true)
      CreateCategory(submitData)
        .then((response) => {
          setMessage('Category Successfully Created')
          setLoadingState(false)
        })
        .catch((error) => {
          setMessage('Creation Unsuccessful')
          setLoadingState(false)
        })
        .finally(() => {
          setTimeout(() => {
            setMessageState(false)
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
          label='Namn på kategori'
          variant='outlined'
          type='text'
          name='kategoriNamn'
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
          <Button type='submit'>
            {(() => {
              if (categoryName === '') {
                return <DisabledSubmitButton buttontext={'Create'} />
              } else {
                return (
                  <SubmitButton isLoading={isLoading} buttontext={'Create'} />
                )
              }
            })()}
          </Button>
        </ButtonCollection>
      </form>
    </>
  )
}
