import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const SearchContainer = styled.div`
  position: relative;
  background-color: #d9d9d9;
  display: flex;
  padding: 15px 1.6rem;
  box-sizing: border-box;
  border-radius: 20px;
  gap: 10px;
`;

const SearchInput = styled.input`
  position: relative;
  background: transparent;
  width: 100%;
  border: none;
  outline: none;
  font-size: 15px;
  letter-spacing: 0.05em;
  color: rgba(0, 0, 0, 0.7sa);
  &::placeholder {
    text-transform: uppercase;
  }
`;

const Search: React.FC<{
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
  const { placeholder, value, setValue } = props;
  return (
    <SearchContainer>
      <Icon style={{ fontSize: "18px" }} icon="uiw:search" />
      <SearchInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
        type="text"
        placeholder={placeholder}
      />
    </SearchContainer>
  );
};

export default Search;
