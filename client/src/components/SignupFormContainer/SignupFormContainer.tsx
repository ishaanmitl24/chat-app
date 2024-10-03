import React, { useState } from "react";
import classes from "../../components/SignupFormContainer/SignupFormContainer.module.css";
import AuthContainerHeading from "../AuthConatinerHeading/AuthContainerHeading";
import AuthInput from "../AuthInput/AuthInput";
import AuthButton from "../AuthButton/AuthButton";
import { signupUserData } from "../../models/user";
import { setError, setLoading } from "../../store/information";
import { useAppSelector } from "../../store";
import { useAppDispatch } from "../../store";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const SignupFormContainer: React.FC<{}> = () => {
  const [userData, setUserData] = useState<signupUserData>({
    name: "",
    email: "",
    password: "",
  });
  const { loading } = useAppSelector((state) => state.info);
  const dispatch = useAppDispatch();

  const inputHandler = (name: string, value: string) => {
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setLoading({ loading: true }));
    if (!userData.name || !userData.password || !userData.email) {
      toast.error("All fields are required!");
      dispatch(setLoading({ loading: false }));
      return;
    }
    try {
      const response = await fetch("http://localhost:4001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      dispatch(setError({ error: "Something went wrong!" }));
    }
    dispatch(setError({ error: "" }));
    dispatch(setLoading({ loading: false }));
    setUserData({ name: "", email: "", password: "" });
  };

  return (
    <div className={classes.main}>
      <AuthContainerHeading
        heading="Get Started With VI-CHAT"
        subheading="Getting started is easy"
      />

      <form onSubmit={submitHandler} className={classes.form}>
        <AuthInput
          type="text"
          placeholder="Enter Full name"
          id="name"
          value={userData.name}
          onChange={(event) => inputHandler("name", event.target.value)}
        />
        <AuthInput
          type="email"
          placeholder="Enter Email"
          id="email"
          value={userData.email}
          onChange={(event) => inputHandler("email", event.target.value)}
        />
        <AuthInput
          type="password"
          placeholder="Enter Password"
          value={userData.password}
          id="password"
          onChange={(event) => inputHandler("password", event.target.value)}
        />
        {loading && <CircularProgress />}
        <AuthButton
          buttonType="submit"
          type="signup"
          text={`${loading ? "Creating Account..." : "Create Account"}`}
        />
      </form>
    </div>
  );
};

export default SignupFormContainer;
