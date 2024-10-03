import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;
const ModalCard = styled.div`
  position: relative;
  width: 400px;
  padding: 2rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 10px;
`;

const ItemText = styled.div`
  position: relative;
  color: black;
  font-size: 20px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  position: relative;
  outline: none;
  border: none;
  font-size: 18px;
  font-weight: 500;
  color: white;
  padding: 0.5rem 2rem;
  background-color: #5775e1;
  border-radius: 8px;
  cursor: pointer;
`;

const CrossButton = styled.button`
  position: absolute;
  top: -9px;
  right: -7px;
  outline: none;
  border: none;
  padding: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
`;

const Modal: React.FC<{ text: string; onClick: () => void }> = (props) => {
  const modalRoot = document.getElementById("modal");
  if (!modalRoot) {
    return null;
  }
  const { text, onClick } = props;

  const ModalComponent: React.FC<{
    text: string;
    onClick: () => void;
  }> = (childProps) => {
    const { text, onClick } = childProps;
    return (
      <ModalContainer onClick={onClick}>
        <ModalCard>
          <CrossButton>
            <Icon
              style={{ fontSize: "14px", fontWeight: 500 }}
              icon="maki:cross"
            />
          </CrossButton>
          <ItemText>{text}</ItemText>
          <CloseButton onClick={onClick}>Close</CloseButton>
        </ModalCard>
      </ModalContainer>
    );
  };

  return ReactDOM.createPortal(
    <ModalComponent text={text} onClick={onClick} />,
    modalRoot
  );
};

export default Modal;
