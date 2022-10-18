import { Box, Button, TextField, Typography } from '@mui/material'
import React, { FunctionComponent, useEffect, useState } from 'react'
import styles from '../../CssStyles'
import { ButtonCollection } from '../../CustomComponents'
import {
  DisabledSubmitButton,
  SubmitButton,
} from '../../shared/buttons/button-default'
import { useUserContext } from '../../context/UserContext'
import { EditCategory } from '../../shared/fetch/category'

interface EditCategoryModalProps {
  onConfirm: () => void
  categoryId: string | null
  categoryName: string | null
  // onCancel: () => void;
  message: string
  categories: any
  callBack: Function
}
export const EditCategoryModal: FunctionComponent<EditCategoryModalProps> = (
  props
) => {
  const user = useUserContext()
  const [kategoriNamn, setKategoriNamn] = useState('')
  const [isLoading, setloadingState] = useState(false)
  const [message, setmessage] = useState('')
  const [messageState, setmessageState] = useState(false)
  const editData: any = {
    userId: user.userId,
    categoryId: props.categoryId,
    categoryName: kategoriNamn,
  }
  const categories = props.categories

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (
      categories.some(
        (category: { categoryName: string }) =>
          category.categoryName.toLowerCase() === kategoriNamn.toLowerCase()
      )
    ) {
      setmessage('Kategorin finns redan')
      setmessageState(true)
      setTimeout(() => {
        setmessageState(false)
        setloadingState(false)
      }, 2000)
    } else {
      setloadingState(true)
      console.log(props.categoryId)
      console.log(editData.id)
      setmessage('Lägger till kategori')
      setmessageState(true)
      EditCategory(editData)
        .then((response) => {
          setmessage('Kategori sparad')
          props.callBack()
        })
        .catch((err) => {
          setmessage('Kunde inte spara')
        })
        .finally(() => {
          setTimeout(() => {
            setmessageState(false)
            setloadingState(false)
            props.onConfirm()
          }, 2000)
        })
    }
  }

  return (
    <React.Fragment>
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
          value={kategoriNamn}
          onChange={(e) => {
            setKategoriNamn(e.target.value)
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
          <Button
            onClick={(e) => {
              handleSubmit(kategoriNamn)
            }}
          >
            {(() => {
              if (kategoriNamn === '') {
                return <DisabledSubmitButton buttontext={'Spara'} />
              } else {
                return (
                  <SubmitButton isLoading={isLoading} buttontext={'Spara'} />
                )
              }
            })()}
          </Button>
        </ButtonCollection>
      </form>
    </React.Fragment>
  )
}
