import "animate.css/animate.min.css";
import styled from "styled-components";

import { mobile, ipad} from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid #CDDEFF;
  border-radius: 5px;
  ${ipad({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 400;
  text-align: center;
  ${ipad({ fontSize: "18px" })}
  ${mobile({ fontSize: "14px" })}
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
  ${ipad({ margin: 5 })}
`;

const TopTexts = styled.div`
  ${ipad({ display: "none" })}
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
  ${ipad({  })}
`;

const CourseDetail = styled.div`
  flex: ${props => props.ipad ? "1": "2"};
  justify-content: ${props => props.ipad ? "flex-start": ""};
  display: flex;
  margin: 5px 10px 0 0;
  padding: 0;
  ${ipad({alignItems: "center", flexDirection: "column" })}
`;

const Image = styled.img`
  width: 300px;
  height: 200px;
  ${ipad({ height: "150px", width: "100%" })}
  ${mobile({height: "100px", width: "100%" })}
`;

const Details = styled.div`
  padding: 0px 20px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${ipad({padding: "0 5px" })}
`;

const CourseName = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  ${ipad({padding: "5px 0" })}
  ${mobile({fontSize: "16px" })}
`;

const CourseId = styled.span`
  ${ipad({padding: "5px 0" })}
`;


const Duration = styled.span`
  ${ipad({padding: "5px 0" })}
`;

const ChangeContainer = styled.div`
  margin: 0 20px 0;
  ${ipad({ margin: 0, padding: 0, position: "relative", top: 50})}
`;


const Price = styled.p`
  font-size: 28px;
  font-weight: 300;
  color: ##CDDEFF;
  ${ipad({ fontSize: "18px", margin: "0, auto"})}
  ${mobile({ fontSize: "17px", margin: "0, auto"})}
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
              <CourseDetail ipad>
                <Price style={{fontWeight: 700,  color: "#1C3879"}}>Price: &#8358; 6,999</Price>
                <ChangeContainer>
                 <Price>Remove</Price>
                 <Price>Move to Wishlist</Price>
                </ChangeContainer>
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
              <CourseDetail ipad>
                <Price style={{fontWeight: 700,  color: "#1C3879"}}>Price: &#8358; 6,999</Price>
                <ChangeContainer>
                 <Price>Remove</Price>
                 <Price>Move to Wishlist</Price>
                </ChangeContainer>
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