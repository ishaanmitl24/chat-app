import React from "react";
import Avaatar from "../Avaatar/Avaatar";
import { useAppSelector } from "../../store";
import classes from "../FriendsCard/FriendsCard.module.css";
import { Icon } from "@iconify/react";

const FriendsCard: React.FC<{
  name: string;
  email: string;
  id: string;
}> = (props) => {
  const { name, email } = props;
  //   const { userId, token } = useAppSelector((state) => state.auth);

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
        <button>
          <Icon
            style={{ width: "25px", height: "25px" }}
            icon="bi:three-dots-vertical"
          />
        </button>
      </div>
    </div>
  );
};

export default FriendsCard;
