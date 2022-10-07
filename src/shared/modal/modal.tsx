import { Typography } from '@mui/material';
import React, { FunctionComponent, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
  Wrapper,
  ModalHeader,
  StyledModal,
  CloseButton,
  Content,
  Backdrop,
} from '../../CustomComponents';

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
      <Backdrop />
      <Wrapper>
        <StyledModal>
          <ModalHeader>
            <Typography variant="h5" align='center' mr='25px'>{headerText}</Typography>
            <CloseButton onClick={hide}>X</CloseButton>
          </ModalHeader>
          <Content>{modalContent}</Content>
        </StyledModal>
      </Wrapper>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
