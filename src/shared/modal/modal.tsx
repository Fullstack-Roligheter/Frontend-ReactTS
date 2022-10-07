import { Button, Typography } from '@mui/material';
import React, { FunctionComponent, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
  Wrapper,
  ModalHeader,
  StyledModal,
  Content,
  Backdrop,
} from '../../CustomComponents';
import { CloseButton } from '../buttons/button-default';

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  modalContent: JSX.Element;
  headerText: string;
}

export const Modal: FunctionComponent<ModalProps> = ({

  isShown,
  hide,
  modalContent,
  headerText,
}) => {
  const modal = (
    <React.Fragment>
      <Backdrop onClick={hide} />
      <Wrapper aria-modal aria-label={headerText} tabIndex={-1} role='dialog'>
        <StyledModal>
          <ModalHeader>
            <Typography variant="h5" align='center' mr='25px'>{headerText}</Typography>
            <Button onClick={hide}><CloseButton type='button' data-dismiss='modal' aria-label='Close' /></Button>
          </ModalHeader>
          <Content>{modalContent}</Content>
        </StyledModal>
      </Wrapper>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
