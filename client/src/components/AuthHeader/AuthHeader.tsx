import React from "react";
import classes from "../../components/AuthHeader/AuthHeader.module.css";
import { NavLink } from "react-router-dom";

const AuthHeader: React.FC<{
  path: string;
  content: string;
  linkContent: string;
}> = (props) => {
  const { path, content, linkContent } = props;
  return (
    <div className={classes.main}>
      <div className={classes.logoContent}>
        <div className={classes.logo}>V</div>
        <div className={classes.heading}>
          <span className={classes.vi}>VI</span>
          <span className={classes.chat}>-CHAT</span>
        </div>
      </div>
      <div className={classes.link}>
        <span>{content}</span>
        <NavLink to={path}>{linkContent}</NavLink>
      </div>
    </div>
  );
};

export default AuthHeader;
