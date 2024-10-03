import React from "react";
import classes from "../UserCard/UserCard.module.css";
import { User } from "../../models/user";
import { NavLink } from "react-router-dom";
import Avaatar from "../Avaatar/Avaatar";

const UserCard: React.FC<{ user: User }> = (props) => {
  const { user } = props;
  return (
    <NavLink to={`/message/${user.id}`} className={classes.main}>
      <div className={classes.user}>
        <Avaatar image={user.image} name={user.name} />
        <div className={classes.user_details}>
          <span className={classes.name}>{user.name}</span>
          <span className={classes.last_message}>{user.message}</span>
        </div>
      </div>
      <div className={classes.last_seen}>{user.time}</div>
    </NavLink>
  );
};

export default UserCard;
