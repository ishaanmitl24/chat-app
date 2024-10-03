import styled from "styled-components";
import AuthHeader from "../components/AuthHeader/AuthHeader";
import LoginFormContainer from "../components/LoginFormContainer/LoginFormContainer";

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  positon: relative;
  background-color: #e5e5e5;
  padding: 3rem;
  box-sizing: border-box;
`;

const Login = () => {
  return (
    <LoginWrapper>
      <AuthHeader
        path="/signup"
        content="Don’t have an account?"
        linkContent="Sign Up!"
      />
      <LoginFormContainer />
    </LoginWrapper>
  );
};

export default Login;
