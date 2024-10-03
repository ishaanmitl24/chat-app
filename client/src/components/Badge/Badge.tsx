import React from "react";
import styled from "styled-components";

const BadgeComponent = styled.span`
  position: relative;
  color: #000000;
  background-color: ${(props) => (props.color ? props.color : "#d5def6")};
  font-weight: 600;
  border-radius: 45%;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  padding: 5px 10px;
`;

const Badge: React.FC<{ count: number; color?: string }> = (props) => {
  const { count, color } = props;
  return <BadgeComponent color={color}>{count}</BadgeComponent>;
};

export default Badge;
