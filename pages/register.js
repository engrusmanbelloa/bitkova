import styled from "styled-components";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { mobile } from "../responsive";

const Container = styled.div`
  border-top: 1px solid #CDDEFF;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 35%;
  height: 65vh;
  margin: 30px auto;
  background: linear-gradient(
    rgba(28, 56, 121, 0.5),
    rgba(28, 56, 121, 0.5)
    ),
    url("/intro.jpg")
      center;
  background-size: cover;
  border-radius: 20%;
 
`;

const Box = styled.div`
  width: 80%;
  height: 80%;
  margin: 10px 0px;
  padding: 10px 20px 20px;
  position: relative;
  left: 7%;
  top: 5%;
  text-align: center;
  background-color: #CDDEFF;
  opacity: 0.8;
  color: #000;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  line-spacing: 1.5;
  border-radius: 20px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 10px;
  font-weight: 400;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  font-weight: 400;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 10px 20px;
  background: #1C3879;
  font-size: 20px;
  color: #FFF;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  text-decoration: underline;
  cursor: pointer;
`;

const Social = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;



const Agreement = styled.span`
  font-size: 20px;
  margin: 10px 0px;
  font-weight: 40;
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
      <Box>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input placeholder="username" />
          <Input placeholder="email" />
          <Input placeholder="password" />
          <Input placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
        <Title>Sign up with</Title>
        <Social>
          <GoogleIcon sx={{color: "#db3236", m: 1, cursor: "pointer", fontSize: 35}} onClick={() => signIn()}/>
          <FacebookIcon sx={{color: "#3b5998", m: 1, cursor: "pointer", fontSize: 35}} onClick={() => signIn()}/>
          <TwitterIcon sx={{color: "#00acee", m: 1, cursor: "pointer", fontSize: 35}} onClick={() => signIn()}/>
          <LinkedInIcon sx={{color: "#0000EE", m: 1, cursor: "pointer", fontSize: 35}} onClick={() => signIn()}/>
        </Social>
        </Box>
      </Wrapper>
    </Container>
  );
};

export default Register;