import React from "react";
import Avaatar from "../Avaatar/Avaatar";
import { useAppSelector } from "../../store";
import toast from "react-hot-toast";
import classes from "../AcceptFriend/AcceptFriend.module.css";

const AcceptFriend: React.FC<{
  name: string;
  email: string;
  connectionId: string;
  setPendingRequestTrigger: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
  const { name, email, connectionId, setPendingRequestTrigger } = props;
  const { userId, token } = useAppSelector((state) => state.auth);

  const requestHandler = async (status: string) => {
    if (!status) {
      return;
    }
    try {
      const requestResponse = await fetch(
        `http://localhost:4001/friend/request-respond`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, connectionId, status }),
        }
      );
      const result = await requestResponse.json();
      if (result.ok) {
        setPendingRequestTrigger(connectionId);
      }
    } catch (err) {
      console.log(err);
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
      <div className={classes.button_group}>
        <button
          type="button"
          onClick={() => requestHandler("accepted")}
          className={classes.accept_friend}
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => requestHandler("rejected")}
          className={classes.reject_friend}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default AcceptFriend;
