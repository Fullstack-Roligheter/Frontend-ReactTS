import { Box, Button, TextField, Typography } from '@mui/material'
import React, { FunctionComponent, useState } from 'react'
import styles from '../../CssStyles'
import { ButtonCollection } from '../../CustomComponents'
import {
  DisabledSubmitButton,
  SubmitButton,
} from '../../shared/buttons/button-default'
import { useUserContext } from '../../context/UserContext'
import { EditCategory } from '../../shared/fetch/category'
import {
  EditCategoryModalProps,
  EditSubmitData,
} from '../../shared/Interfaces/categoryModal'

export const EditCategoryModal: FunctionComponent<EditCategoryModalProps> = (
  props
) => {
  const user = useUserContext()
  const [kategoriNamn, setKategoriNamn] = useState('')
  const [isLoading, setloadingState] = useState(false)
  const [message, setmessage] = useState('')
  const [messageState, setmessageState] = useState(false)

  const editSumbitData: EditSubmitData = {
    userId: user.userId,
    categoryId: props.categoryId,
    categoryName: kategoriNamn,
  }
  const categories = props.categories

  const handleSubmit = (e: any) => {
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
      setmessage('Lägger till kategori')
      setmessageState(true)
      EditCategory(editSumbitData)
        .then((response) => {
          setmessage('Kategori sparad')
          setloadingState(false)
        })
        .catch((err) => {
          setmessage('Kunde inte spara')
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
