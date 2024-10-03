import React from "react";
import classes from "../Headers/Header.module.css";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";
import { userDummyArr } from "../../data/data";

const Header: React.FC<{
  badge: boolean;
  title: string;
  showButton: boolean;
}> = (props) => {
  const { badge, title, showButton = false } = props;
  return (
    <div className={classes.main}>
      <div className={classes.first_container}>
        <span className={classes.heading}>{title}</span>
        {badge && <Badge count={userDummyArr.length} />}
      </div>
      {showButton && <Button />}
    </div>
  );
};

export default Header;
