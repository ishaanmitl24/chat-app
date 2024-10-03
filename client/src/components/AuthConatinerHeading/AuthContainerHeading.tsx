import React from "react";
import classes from "../../components/AuthConatinerHeading/AuthContainerHeading.module.css";

const AuthContainerHeading: React.FC<{
  heading: string;
  subheading: string;
}> = (props) => {
  const { heading, subheading } = props;
  return (
    <div className={classes.main}>
      <h1>{heading}</h1>
      <div>{subheading}</div>
    </div>
  );
};

export default AuthContainerHeading;
