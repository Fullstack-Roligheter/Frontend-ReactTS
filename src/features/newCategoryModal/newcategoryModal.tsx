import { Box, Button, TextField, Typography } from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from '../../CssStyles';
import { ButtonCollection } from '../../CustomComponents'
import { DisabledSubmitButton, OrdinaryButton, SubmitButton } from '../../shared/buttons/button-default';
import { useModal } from '../../shared/modal/useModal'

interface NewCategoryModalProps {
  onConfirm: () => void;
  // onCancel: () => void;
  message: string;
  userId: string;
}
export const NewCategoryModal: FunctionComponent<NewCategoryModalProps> = (props) => {
  const [kategoriNamn, setKategoriNamn] = useState('')
  const [isLoading, setloadingState] = useState(false)
  const [message, setmessage] = useState('')
  const [messageState, setmessageState] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setloadingState(true)
    const userId = props.userId
    console.log(kategoriNamn)
    setloadingState(true)
    setmessage('Lägger till kategori')
    setmessageState(true)
    setTimeout(() => {
      setmessageState(false)
      setloadingState(false)
      props.onConfirm()
    }, 2000)


    // NewCategory(kategoriNamn)
    // .then((response) => {
    //     setmessage('Lägger till kategori')
    //      setmessageState(true)
    //   setTimeout(() => {
    //   setmessageState(false)
    //    setloadingstate(false)
    //   }, 2000)
    // })
    // .catch((error) => {
    //   setTimeout(() => {
    //     setloadingState(false)
    //     setmessage('Kunde inte spara.')
    //     setmessageState(true)
    //     setTimeout(() => {
    //       setmessageState(false)
    //     }, 3000)
    //   }, 3000)
    // })


    // props.onConfirm()
  };

  return (
    <React.Fragment>
      <Typography variant='subtitle1' align='center'>{props.message}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Namn på kategori'
          variant='outlined'
          type='text'
          name='kategoriNamn'
          required={true}
          value={kategoriNamn}
          onChange={(e) => { setKategoriNamn(e.target.value) }}
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
          <Button onClick={(e) => { handleSubmit(kategoriNamn) }}>
            {(() => {
              if (kategoriNamn === '') {
                return <DisabledSubmitButton buttontext={'Spara'} />
              } else {
                return (
                  <SubmitButton
                    isLoading={isLoading}
                    buttontext={'Spara'}
                  />
                )
              }
            })()}
          </Button>
        </ButtonCollection>
      </form>
    </React.Fragment>
  );
};


