import SendIcon from '@mui/icons-material/Send';
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 300px;
  background-color: #CDDEFF;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin: 10px 10px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
  font-size: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: rgba(28, 56, 121);
  color: white;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates for new discoveries, discounts and scholarships from bitkova academy</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;