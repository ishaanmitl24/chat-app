import React, { useState } from "react";
import classes from "../../components/LoginFormContainer/LoginFormContainer.module.css";
import AuthContainerHeading from "../AuthConatinerHeading/AuthContainerHeading";
import AuthInput from "../AuthInput/AuthInput";
import { NavLink } from "react-router-dom";
import AuthButton from "../AuthButton/AuthButton";
import { loginData } from "../../models/user";
import { useAppDispatch, useAppSelector } from "../../store";
import { setError, setLoading } from "../../store/information";
import { settAuthUserData } from "../../store/auth";
import toast from "react-hot-toast";

const LoginFormContainer: React.FC<{}> = () => {
  const [userData, setUserData] = useState<loginData>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.info);

  const inputHandler = (name: string, value: string) => {
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setLoading({ loading: true }));
    const { email, password } = userData;
    if (!email || !password) {
      dispatch(setError({ error: "All field required!" }));
      dispatch(setLoading({ loading: false }));
      toast.error("All fields re required!");
      return;
    }
    try {
      const response = await fetch("http://localhost:4001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(
          settAuthUserData({
            token: data.token,
            name: data.name,
            email: data.email,
            userId: data.userId,
            isAuthenticated: true,
          })
        );
        localStorage.setItem(
          "user-data",
          JSON.stringify({
            token: data.token,
            name: data.name,
            email: data.email,
            userId: data.userId,
          })
        );
        setUserData({ email: "", password: "" });
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error("SOmething went wrong!");
    }
    dispatch(setLoading({ loading: false }));
  };

  return (
    <div onSubmit={submitHandler} className={classes.main}>
      <AuthContainerHeading
        heading="Welcome Back"
        subheading="Login into your account"
      />

      <form className={classes.form}>
        <AuthInput
          type="email"
          placeholder="Enter Email"
          value={userData.email}
          id="email"
          onChange={(event) => inputHandler("email", event.target.value)}
        />
        <AuthInput
          type="password"
          placeholder="Enter Password"
          value={userData.password}
          id="password"
          onChange={(event) => inputHandler("password", event.target.value)}
        />
        <div className={classes.forgot_password}>
          <NavLink to="/forgot-password">Forgot Password?</NavLink>
        </div>
        <AuthButton
          buttonType="submit"
          type="login"
          text={`${loading ? "Logging In..." : "Log In"}`}
        />
      </form>
    </div>
  );
};

export default LoginFormContainer;
