import React, { useState } from "react";
import { userDummyArr } from "../../data/data";
import UserCard from "../UserCard/UserCard";
import styled from "styled-components";
import Pagination from "../Pagination/Pagination";

const UserListContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  margin-top: 15px;
`;

const UserList: React.FC<{}> = () => {
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(2);
  const itemsPerPage = 7;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return (
    <UserListContainer>
      {userDummyArr.slice(start, end).map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <Pagination page={page} pages={pages} setPage={setPage} />
    </UserListContainer>
  );
};

export default UserList;
