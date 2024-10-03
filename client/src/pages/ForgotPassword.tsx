import styled from "styled-components";
import AuthHeader from "../components/AuthHeader/AuthHeader";
import ForgotPasswordContainer from "../components/ForgotPasswordContainer/ForgotPasswordContainer";

const ForgotPasswordWrapper = styled.div`
  width: 100%;
  height: 100vh;
  positon: relative;
  background-color: #e5e5e5;
  padding: 3rem;
  box-sizing: border-box;
`;

const ForgotPassword = () => {
  return (
    <ForgotPasswordWrapper>
      <AuthHeader
        path="/login"
        content="Already have an account?"
        linkContent="Sign in!"
      />
      <ForgotPasswordContainer />
    </ForgotPasswordWrapper>
  );
};

export default ForgotPassword;
