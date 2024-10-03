import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "../Pagination/Pagination";
import AddFriendCard from "../AddFriendCard/AddFriendCard";
import { useAppDispatch, useAppSelector } from "../../store";
import { setAddFriendData } from "../../store/friends";
import { addRequestReponse } from "../../models/user";
import Modal from "../Modal/Modal";
import useDebounce from "../../hooks/useDebounce";
import { LinearProgress } from "@mui/material";

const AddFriendListContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  margin-top: 15px;
`;

const AddFriendText = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  font-size: 28px;
  font-weight: 600;
  color: #6a85e9;
`;

const AddFriendList: React.FC<{ search: string }> = (props) => {
  const { search: newSearch } = props;
  const { token } = useAppSelector((state) => state.auth);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const search = useDebounce(400, newSearch, setPage);
  const [requestData, setRequestData] = useState<addRequestReponse>({
    ok: false,
    msg: "",
  });
  const [sentRequestId, setSentRequestId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { addFriendData } = useAppSelector((state) => state.friend);

  useEffect(() => {
    const fetchAddFriendsData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4001/friend/getSearchPeople?search=${search}&page=${page}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.ok) {
          setPages(data.pages);
          dispatch(setAddFriendData({ addFriendUserData: data.users }));
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    if (search) {
      if (addFriendData.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
        return;
      }
      fetchAddFriendsData();
    } else {
      dispatch(setAddFriendData({ addFriendUserData: [] }));
      setPages(1);
      setPage(1);
    }
  }, [search, page, sentRequestId]);

  const closeModal = () => {
    setRequestData({ msg: "", ok: false });
    setOpenModal(false);
  };

  return (
    <AddFriendListContainer>
      {loading && <LinearProgress />}
      {search && !addFriendData.length && !loading && <div>No User found!</div>}
      {!search && <AddFriendText>Add friend!</AddFriendText>}
      {addFriendData &&
        addFriendData.map((item) => (
          <AddFriendCard
            name={item.name}
            id={item.id}
            email={item.email}
            hashId={item.hashId}
            setRequestData={setRequestData}
            setSentRequestId={setSentRequestId}
            setOpenModal={setOpenModal}
          />
        ))}
      {pages > 1 && <Pagination page={page} setPage={setPage} pages={pages} />}
      {sentRequestId && openModal && (
        <Modal text={requestData.msg} onClick={closeModal} />
      )}
    </AddFriendListContainer>
  );
};

export default AddFriendList;
