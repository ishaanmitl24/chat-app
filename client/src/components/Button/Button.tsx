import React from "react";
import styled from "styled-components";

const ButtonComponent = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(240, 233, 252, 0.9);
  color: #9354fe;
  font-size: 24px;
  font-weight: 800;
  outline: none;
  border: none;
  box-shadow: 0 2px 10px 0 rgba(89, 122, 240, 0.62);
  cursor: pointer;
  &:hover {
    background-color: rgba(240, 233, 252, 1);
  }
`;

const Button: React.FC<{}> = () => {
  return <ButtonComponent>+</ButtonComponent>;
};

export default Button;
