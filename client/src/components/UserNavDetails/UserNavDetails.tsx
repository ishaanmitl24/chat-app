import classes from "../../components/UserNavDetails/UserNavDetails.module.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { settAuthUserData } from "../../store/auth";

const UserNavDetails = () => {
  const { name } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(
      settAuthUserData({
        name: "",
        isAuthenticated: false,
        email: "",
        token: "",
        userId: "",
      })
    );
    localStorage.removeItem("user-data");
  };

  return (
    <div className={classes.main}>
      <span>{name}</span>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default UserNavDetails;
