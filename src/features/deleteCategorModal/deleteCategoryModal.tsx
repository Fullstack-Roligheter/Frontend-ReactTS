import { Box, Button, TextField, Typography } from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from '../../CssStyles';
import { ButtonCollection } from '../../CustomComponents'
import { DisabledSubmitButton, SubmitButton } from '../../shared/buttons/button-default';
import { useUserContext } from '../../context/UserContext'
import { CreateCategory, DeleteCategory, EditCategory } from '../../shared/fetch/category';

interface DeleteCategoryModalProps {
  onConfirm: () => void;
  categoryId: string | null;
  categoryName: string | null;
  // onCancel: () => void;
  message: string;
  categories: any;
}
export const DeleteCategoryModal: FunctionComponent<DeleteCategoryModalProps> = (props) => {
  const user = useUserContext()
  const [isLoading, setloadingState] = useState(false)
  const [message, setmessage] = useState('')
  const [messageState, setmessageState] = useState(false)
  const deleteData: any = {
    categoryId: props.categoryId,
    userId: user.userId,
  }


  const categories = props.categories

  const handleSubmit = (e: any) => {
    debugger
      setloadingState(true)
      setmessage('Deleting Category')
      setmessageState(true)
      DeleteCategory(deleteData)
        .then(() => {
          setmessage('Category Delete')
        })
        .catch((err) => {
          setmessage('Could Not Delete')
        })
        .finally(() => {
          setTimeout(() => {
            setmessageState(false)
            setloadingState(false)
            props.onConfirm()
          }, 2000)
        })
  };

  return (
    <React.Fragment>
      <Typography variant='subtitle1' align='center'>{props.message}</Typography>
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
          <Button onClick={(e) => { handleSubmit(props.categoryId) }}>
                  <SubmitButton
                    isLoading={isLoading}
                    buttontext={'Delete'}
                  />
          </Button>
        </ButtonCollection>
    </React.Fragment>
  );
};


