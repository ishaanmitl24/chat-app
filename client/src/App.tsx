import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Friends from "./pages/Friends";
import AddFriends from "./pages/AddFriends";
import Profile from "./pages/Profile";
import Message from "./pages/Message";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./pages/ProtectedRoute";
import AuthRoute from "./pages/AuthRoute";
import { useEffect } from "react";
import { useAppDispatch } from "./store";
import { settAuthUserData } from "./store/auth";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    if (userData) {
      const data: {
        name: string;
        userId: string;
        email: string;
        token: string;
      } = JSON.parse(userData);
      console.log(data);
      dispatch(
        settAuthUserData({
          isAuthenticated: true,
          userId: data.userId,
          email: data.email,
          token: data.token,
          name: data.name,
        })
      );
    }
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute path="/">
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/add-friend",
          element: (
            <ProtectedRoute path="/add-friend">
              <AddFriends />
            </ProtectedRoute>
          ),
        },
        {
          path: "/friends",
          element: (
            <ProtectedRoute path="/friends">
              <Friends />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/message/:messageConnectionId",
          element: (
            <ProtectedRoute path="/profile">
              <Message />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: (
        <AuthRoute path="/login">
          <Login />
        </AuthRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <AuthRoute path="/signup">
          <Signup />
        </AuthRoute>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <AuthRoute path="/forgot-password">
          <ForgotPassword />
        </AuthRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
