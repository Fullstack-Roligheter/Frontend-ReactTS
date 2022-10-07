import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
  width: inherit;
  outline: 0;
`;

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

export const StyledModal = styled.div`
  z-index: 15;
  background: white;
  position: relative;
  width: calc(100% + 50px);
  margin: auto;
  border-radius: 8px;
`;

export const ModalHeader = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 0.3rem;
  text-decoration: underline;
`;

export const CloseButton = styled.button`
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;
  margin-left: 0.5rem;
  background: none;
  border: 1px solid black;
  border-radius: 3px;
  :hover {
    cursor: pointer;
    background: red;
    color: white;
  }
`;

export const Content = styled.div`
  padding: 10px;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
`;
export const ButtonCollection = styled.div`
  display: flex;
  justify-content: center;
`;