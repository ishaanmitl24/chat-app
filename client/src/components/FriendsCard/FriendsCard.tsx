import React, { useState } from "react";
import Avaatar from "../Avaatar/Avaatar";
import { useAppSelector } from "../../store";
import classes from "../FriendsCard/FriendsCard.module.css";
import { Icon } from "@iconify/react";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FriendsCard: React.FC<{
  name: string;
  email: string;
  id: string;
}> = (props) => {
  const { name, email, id } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const { userId, token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const createChatId = async (receiverId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4001/messages/create-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            senderId: userId,
            receiverId,
          }),
        }
      );
      const responseData = await response.json();
      if (responseData?.ok) {
        const { messageConnectionId } = responseData?.data;
        navigate(`/message/${messageConnectionId}`);
      }
    } catch (err) {
      toast.error("An error occurred");
    }
    setLoading(false);
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
      <div className={classes.button_group}>
        <button onClick={() => createChatId(id)}>
          {!loading && (
            <Icon
              style={{ width: "28px", height: "28px", color: "#5775e1" }}
              icon="mage:message-dots-round"
            />
          )}
          {loading && <CircularProgress />}
        </button>
      </div>
    </div>
  );
};

export default FriendsCard;
