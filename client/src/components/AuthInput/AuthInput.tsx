import React from "react";
import classes from "../../components/AuthInput/AuthInput.module.css";

const AuthInput: React.FC<{
  type: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  const { type, placeholder, id, value, onChange } = props;
  return (
    <div className={classes.main}>
      <input
        id={id}
        type={type}
        name={id}
        placeholder={placeholder}
        className={classes.input}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default AuthInput;
