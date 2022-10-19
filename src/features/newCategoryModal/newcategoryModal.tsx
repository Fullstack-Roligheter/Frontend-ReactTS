import { Box, TextField, Typography } from '@mui/material'
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

  function getRandomPlaceholder(): string {
    const dummyList = [
      'School Supplies',
      'Holiday',
      'Road Trip',
      'Shark Repellent',
      'Helicopter Fuel',
      'Medicine',
    ]
    let randomItem = dummyList[Math.floor(Math.random() * dummyList.length)]
    return randomItem
  }

  const submitData: CreateSubmitData = {
    userId: '',
    name: '',
  }
  const categories = props.categories
  let placeHolder = getRandomPlaceholder()

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
          placeholder={placeHolder}
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
            if (categoryName === '') {
              return <DisabledSubmitButton buttontext={'Create'} />
            } else {
              return (
                <SubmitButton isLoading={isLoading} buttontext={'Create'} />
              )
            }
          })()}
        </ButtonCollection>
      </form>
    </>
  )
}
