import React, { FunctionComponent } from 'react';
import { ConfirmationButtons, Message, YesButton, NoButton } from '../../CustomComponents'
import { useModal } from '../../shared/modal/useModal'

interface NewCategoryModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  userId: string
}
export const NewCategoryModal: FunctionComponent<NewCategoryModalProps> = (props) => {

  const handleSubmit = () => {
    const userId = props.userId
    console.log('Hej!')
    props.onConfirm()
  };

  return (
    <React.Fragment>
      <Message>{props.message}</Message>
      <ConfirmationButtons>
        <YesButton onClick={handleSubmit}>Skicka</YesButton>
        <NoButton onClick={props.onCancel}>Avbryt</NoButton>
      </ConfirmationButtons>
    </React.Fragment>
  );
};
