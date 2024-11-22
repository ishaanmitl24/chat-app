import React from "react";
import classes from "../Headers/Header.module.css";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";

const Header: React.FC<{
  badge: boolean;
  title: string;
  showButton: boolean;
  count?: number;
}> = (props) => {
  const { badge, title, showButton = false, count } = props;
  return (
    <div className={classes.main}>
      <div className={classes.first_container}>
        <span className={classes.heading}>{title}</span>
        {badge && count && <Badge count={count} />}
      </div>
      {showButton && <Button />}
    </div>
  );
};

export default Header;
