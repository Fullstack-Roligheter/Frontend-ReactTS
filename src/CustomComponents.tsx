import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
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
  z-index: 500;
`;

export const StyledModal = styled.div`
  z-index: 100;
  background: white;
  position: relative;
  margin: auto;
  border-radius: 8px;
`;

export const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
`;

export const HeaderText = styled.div`
  color: #fff;
  align-self: center;
  color: lightgray;
`;

export const CloseButton = styled.button`
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;
  margin-left: 0.5rem;
  background: none;
  :hover {
    cursor: pointer;
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
export const OrdinaryButton = styled.button`
  width: 10rem;
  background-color: blue;
  color: white;
  :hover {
    background-color: white;
    color: blue;
  }
`;

export const Message = styled.div`
  font-size: 0.9rem;
  margin-bottom: 10px;
  text-align: center;
`;

export const YesButton = styled.button`
  width: 6rem;
  background-color: yellow;
  :hover {
    background-color: red;
  }
`;

export const NoButton = styled.button`
  width: 3rem;
  background-color: lightgrey;
  :hover {
    background-color: grey;
  }
`;