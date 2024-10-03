import React from "react";
import classes from "../AddFriendCard/AddFriendCard.module.css";
import Avaatar from "../Avaatar/Avaatar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppSelector } from "../../store";
import toast from "react-hot-toast";
import { addRequestReponse } from "../../models/user";

const AddFriendCard: React.FC<{
  name: string;
  hashId: string;
  id: string;
  email: string;
  setRequestData: React.Dispatch<React.SetStateAction<addRequestReponse>>;
  setSentRequestId: React.Dispatch<React.SetStateAction<string>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const {
    name,
    hashId,
    id,
    email,
    setRequestData,
    setSentRequestId,
    setOpenModal,
  } = props;
  const { userId, token } = useAppSelector((state) => state.auth);

  const sendRequestToUser = async () => {
    try {
      const response = await fetch("http://localhost:4001/friend/addFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sendersId: userId, receiversId: id }),
      });
      const data = await response.json();
      if (data) {
        setRequestData(data);
        setSentRequestId(id);
        setOpenModal(true);
        return;
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.user}>
        <Avaatar name={name} />
        <div className={classes.user_details}>
          <span className={classes.name}>{name}</span>
          <span className={classes.last_message}>{email}</span>
        </div>
      </div>
      <button onClick={sendRequestToUser} className={classes.add_friend}>
        <Icon style={{ fontSize: "30px" }} icon="weui:add-friends-filled" />
      </button>
    </div>
  );
};

export default AddFriendCard;
