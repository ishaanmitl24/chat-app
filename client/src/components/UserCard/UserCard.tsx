import React from "react";
import classes from "../UserCard/UserCard.module.css";
import { userMessagesData } from "../../models/user";
import { NavLink } from "react-router-dom";
import Avaatar from "../Avaatar/Avaatar";

const UserCard: React.FC<{ user: userMessagesData }> = (props) => {
  const { user } = props;
  return (
    <NavLink
      to={`/message/${user.messageConnectionId}`}
      className={classes.main}
    >
      <div className={classes.user}>
        <Avaatar image={""} name={user.user.name} />
        <div className={classes.user_details}>
          <span className={classes.name}>{user?.user?.name}</span>
          <span className={classes.last_message}>
            {user?.messageData?.message
              ? user?.messageData?.message
              : `Start your conversation with ${user.user.name} 🙂‍↕️`}
          </span>
        </div>
      </div>
      <div className={classes.last_seen}>{user?.messageData?.time ?? ""}</div>
    </NavLink>
  );
};

export default UserCard;
