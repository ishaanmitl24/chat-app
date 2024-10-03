import styled from "styled-components";
import AuthHeader from "../components/AuthHeader/AuthHeader";
import SignupFormContainer from "../components/SignupFormContainer/SignupFormContainer";

const SignupWrapper = styled.div`
  width: 100%;
  height: 100vh;
  positon: relative;
  background-color: #e5e5e5;
  padding: 3rem;
  box-sizing: border-box;
`;

const Signup = () => {
  return (
    <SignupWrapper>
      <AuthHeader
        path="/login"
        content="Already, have an account?"
        linkContent="Sign in!"
      />
      <SignupFormContainer />
    </SignupWrapper>
  );
};

export default Signup;
