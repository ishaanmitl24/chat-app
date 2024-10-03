import React, { useState } from "react";
import classes from "../../components/ForgotPasswordContainer/ForgotPasswordContainer.module.css";
import AuthButton from "../AuthButton/AuthButton";
import AuthContainerHeading from "../AuthConatinerHeading/AuthContainerHeading";
import AuthInput from "../AuthInput/AuthInput";

const ForgotPasswordContainer: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>("");
  return (
    <div className={classes.main}>
      <AuthContainerHeading
        heading="Forgot your password?"
        subheading="Don't worry , we can reset you password"
      />

      <form className={classes.form}>
        <AuthInput
          type="email"
          placeholder="Enter Email"
          id="email"
          value={email}
          onChange={() => {}}
        />
        <AuthButton
          buttonType="submit"
          type="forgot-password"
          text="Send Password Reset Link"
        />
      </form>
    </div>
  );
};

export default ForgotPasswordContainer;
