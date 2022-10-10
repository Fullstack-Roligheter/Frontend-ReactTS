import { Button, TextField, Typography } from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from '../../CssStyles';
import { ButtonCollection } from '../../CustomComponents'
import { OrdinaryButton } from '../../shared/buttons/button-default';
import { useModal } from '../../shared/modal/useModal'

interface NewCategoryModalProps {
  onConfirm: () => void;
  // onCancel: () => void;
  message: string;
  userId: string;
}
export const NewCategoryModal: FunctionComponent<NewCategoryModalProps> = (props) => {
  const [kategoriNamn, setKategoriNamn] = useState('')

  const handleSubmit = (kategoriNamn: string) => {
    const userId = props.userId
    console.log(kategoriNamn)
    props.onConfirm()
  };

  return (
    <React.Fragment>
      <Typography variant='subtitle1' align='center'>{props.message}</Typography>
      <form>
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
        <br />
      </form>
      <ButtonCollection>
        <Button onClick={() => { handleSubmit(kategoriNamn) }}><OrdinaryButton buttontext='Spara' /></Button>
      </ButtonCollection>
    </React.Fragment>
  );
};


