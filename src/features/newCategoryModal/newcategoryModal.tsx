import React, { FunctionComponent } from 'react';
import { ConfirmationButtons, Message, YesButton, NoButton } from '../../CustomComponents'
import { useModal } from '../../shared/modal/useModal'

interface NewCategoryModalProps {
  message: string;
}
const { isShown, toggle } = useModal();
const onConfirm = () => {
  // fetch för lägga till kategori
  toggle()
};
const onCancel = () => toggle();
export const NewCategoryModal: FunctionComponent<NewCategoryModalProps> = (props) => {
  return (
    <React.Fragment>
      <Message>{props.message}</Message>
      <ConfirmationButtons>
        <YesButton onClick={onConfirm}>Yes</YesButton>
        <NoButton onClick={onCancel}>No</NoButton>
      </ConfirmationButtons>
    </React.Fragment>
  );
};
