import React from "react";
import classes from "../../components/AuthButton/AuthButton.module.css";

const AuthButton: React.FC<{
  text: string;
  type: string;
  buttonType: "submit" | "button" | "reset";
}> = (props) => {
  const { text, type, buttonType } = props;
  return (
    <button
      type={buttonType}
      className={`${classes.main} ${
        type === "login" ? classes.login : classes.signup
      }`}
    >
      {text}
    </button>
  );
};

export default AuthButton;
