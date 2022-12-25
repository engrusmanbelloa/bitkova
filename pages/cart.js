import "animate.css/animate.min.css";
import styled from "styled-components";

import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid #CDDEFF;
  border-radius: 5px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 400;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" ? "none" : "solid 1px #CDDEFF"};
  background-color: ${(props) =>
    props.type === "filled" ? "#1C3879" : "transparent"};
  border-radius: 5px;
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  color: #1C3879;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Course = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const CourseDetail = styled.div`
  flex: 2;
  display: flex;
  margin: 5px 10px 0 0;
  padding: 0;
`;

const Image = styled.img`
  width: 300px;
  height: 200px;
`;

const Details = styled.div`
  padding: 0px 20px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const CourseName = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`;

const CourseId = styled.span``;


const Duration = styled.span``;

const ChangeContainer = styled.div`
  margin: 0 20px 0;
`;


const Price = styled.p`
  font-size: 30px;
  font-weight: 300;
  color: ##CDDEFF;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #CDDEFF;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid #CDDEFF;
  border-radius: 10px;
  padding: 20px;
  height: 50%;
  animation: pulse;
  animation-duration: 2s;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #1C3879;
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

const Cart = () => {
  return (
    <Container>
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <TopButton>BUY MORE COURSES</TopButton>
          <TopTexts>
            <TopText>Your Cart (2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            <Course>
              <CourseDetail>
                <Image src="/courses/mkt.jpeg"/>
                <Details>
                  <CourseName>
                    Certified CryptoCurrency Market Analyst (CCA)
                  </CourseName>
                  <CourseId>
                    <b>ID:</b> 93813718293
                  </CourseId>
                  <Duration>
                    <b>6.5</b> Total Hours
                  </Duration>
                  <Duration>
                    <b>50 </b>Lectures
                  </Duration>
                </Details>
              </CourseDetail>
              <CourseDetail style={{flex: 1, justifyContent: "flex-end"}}>
                <ChangeContainer>
                 <Price>Remove</Price>
                 <Price>Move to Wishlist</Price>
                </ChangeContainer>
                <Price style={{fontWeight: 500, color: "#1C3879"}}>&#8358; 6,999</Price>
              </CourseDetail>
            </Course>
            <Hr />
            <Course>
              <CourseDetail>
                <Image src="/courses/mkt.jpeg"/>
                <Details>
                  <CourseName>
                    Certified CryptoCurrency Market Analyst (CCA)
                  </CourseName>
                  <CourseId>
                    <b>ID:</b> 93813718293
                  </CourseId>
                  <Duration>
                    <b>6.5</b> Total Hours
                  </Duration>
                  <Duration>
                    <b>50 </b>Lectures
                  </Duration>
                </Details>
              </CourseDetail>
              <CourseDetail style={{flex: 1, justifyContent: "flex-end"}}>
                <ChangeContainer>
                 <Price>Remove</Price>
                 <Price>Move to Wishlist</Price>
                </ChangeContainer>
                <Price style={{fontWeight: 500, color: "#1C3879"}}>&#8358; 6,999</Price>
              </CourseDetail>
            </Course>
          </Info>
          <Summary>
            <SummaryTitle>CHECKOUT SUMMARY</SummaryTitle>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>&#8358; 13,999</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;