
import React, { FunctionComponent, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
  Wrapper,

  StyledModal,

  Content,
  Backdrop,
} from '../../CustomComponents';

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  modalContent: JSX.Element;

}

export const Modal: FunctionComponent<ModalProps> = ({
  isShown,
  hide,
  modalContent,

}) => {
  const modal = (
    <React.Fragment>
      <Backdrop />
      <Wrapper>
        <StyledModal>
          <Content>{modalContent}</Content>
        </StyledModal>
      </Wrapper>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
