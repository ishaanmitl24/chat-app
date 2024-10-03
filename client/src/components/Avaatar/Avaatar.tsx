import React from "react";
import styled from "styled-components";

const AvataarImage = styled.img``;

const AvaatarIcon = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: black;
  background-color: #f5f5f5;
  letter-spacing: 0.08em;
`;

interface AvataarImage {
  name: string;
  image?: string;
}

const Avaatar: React.FC<AvataarImage> = (props) => {
  const { image, name } = props;
  const getAvaatarIconText = () => {
    const nameArr: string[] = name.split(" ");
    let newName: string = "";
    for (let i = 0; i < nameArr.length; i++) {
      newName += nameArr[i][0];
    }
    return newName;
  };
  return image ? (
    <AvataarImage src={image} alt={name} />
  ) : (
    <AvaatarIcon>{getAvaatarIconText()}</AvaatarIcon>
  );
};

export default Avaatar;
