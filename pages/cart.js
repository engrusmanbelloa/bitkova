import "animate.css/animate.min.css"
import styled from "styled-components"
import { mobile, ipad} from "../responsive"
import useStore from "../config/store"
import { useState, useEffect } from "react"
import {useRouter} from "next/router"
import { getProviders, useSession, signIn, signOut, getCsrfToken, getSession } from "next-auth/react"

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
  ${mobile({fontSize: 15})}
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
  ${ipad({ flexDirection: "column" })}
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
  font-size: 20px;
  font-weight: 700;
  color: #1C3879;
  ${ipad({ fontSize: "18px", margin: "0 auto"})}
  ${mobile({ fontSize: "17px", margin: "0 auto"})}
`;

const Remove = styled.p`
  font-size: 28px;
  font-weight: 300;
  color: ##CDDEFF;
  cursor: pointer;
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

const SummaryItemText = styled.span`
  ${ipad({fontSize: 20})}
  ${mobile({fontSize: 30})}
`;

const SummaryItemPrice = styled.span`
  ${ipad({fontSize: 20})}
  ${mobile({fontSize: 30})}
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #1C3879;
  cursor: pointer;
  color: white;
  font-size: 20px;
  font-weight: 600;
  ${mobile({fontSize: 15})}
`;

const SetUpdate = styled.div`
  font-size: 18px;
  margin: 10px auto;
  font-weight: 400;
  color: #fff;
  width: 10%;
  padding: 10px;
  border-radius: 5px;
  border: 0.5px solid;
  box-shadow: 5px 5px #CDDEFF;
  text-align: center;
  background: rgba(28, 56, 121, 1);
  ${ipad({width: "80%"})}
  ${mobile({})}
`;

const Cart = () => {
  const {cart, removeFromCart} = useStore()
  const router = useRouter ()
  const [success, setSuccess] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const { data: session, status } = useSession()

  // // hydration function
  // const hasHydrated = useStore(state => state._hasHydrated)
  // if (!hasHydrated) {
  //   console.log("i am not hydrated")
  //   return <SetUpdate>Loading....</SetUpdate>
  // }

  // Calculate the total amount
  const totalAmount = cart.reduce((acc, course) => acc + course.price, 0).toFixed(2)
  console.log("Total amount in your cart", totalAmount)

  // remove course from cart
  const remove = async () => {
    try {
      const existingCourse = cart.find((item) => item._id)
      if (!existingCourse) {
        // Course already exists in the cart, do nothing
        return
      }
      removeFromCart(existingCourse)
    } catch (err) {
      console.log(err)
    } 
  }
  return (
      <Container>
      {session ?
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <TopButton onClick={() => router.push("/courses")}>BUY MORE COURSES</TopButton>
          <TopTexts>
            <TopText>Your Cart ({cart.length})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={() => router.push("/payment")}>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info >
          {cart.map((course) => (
            <div key={course._id}>
            <Course >
              <CourseDetail>
                <Image src={course.image}  alt={course.title}/>
                <Details>
                  <CourseName>{course.title}</CourseName>
                  <CourseId><b>ID: </b>{course._id}</CourseId>
                  <Duration>
                    <b>Duration: </b> 
                    {
                      course.duration.hours > 0
                      ? `${course.duration.hours} hours ${course.duration.minutes} mins`
                      : `${course.duration.minutes} mins`
                    }
                  </Duration>
                  <Duration>
                    <b>{course.lessons.length} </b>Lectures
                  </Duration>
                </Details>
              </CourseDetail>
              <CourseDetail ipad>
                <Price>Price: &#8358; {course.price.toFixed(2)}</Price>
                <ChangeContainer>
                 <Remove onClick={remove}>Remove</Remove>
                 <Remove>Move to Wishlist</Remove>
                </ChangeContainer>
              </CourseDetail>
            </Course>
            <Hr />
            </div>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>CHECKOUT SUMMARY</SummaryTitle>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>&#8358; {totalAmount}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={() => router.push("/payment")}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      : <SetUpdate>Please login or update your profile</SetUpdate>}
    </Container>
  )
}

export default Cart