import React, { useState } from "react";
import { userDummyArr } from "../../data/data";
import UserCard from "../UserCard/UserCard";
import styled from "styled-components";
import Pagination from "../Pagination/Pagination";
import { userMessagesData } from "../../models/user";

const UserListContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  margin-top: 15px;
`;

const UserList: React.FC<{
  userData: userMessagesData[];
  page: number;
  pages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}> = (props) => {
  const { page, pages, setPage, userData } = props;

  return (
    <UserListContainer>
      {userData.map((user) => (
        <UserCard key={user.messageConnectionId} user={user} />
      ))}
      {pages > 1 && <Pagination page={page} pages={pages} setPage={setPage} />}
    </UserListContainer>
  );
};

export default UserList;
