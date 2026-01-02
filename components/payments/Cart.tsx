// components/payments/Cart.tsx
"use client"
import "animate.css/animate.min.css"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"
import { useUserStore } from "@/lib/store/useUserStore"
import { useRouter } from "next/navigation"
import { CourseWithExtras } from "@/types/courseType"
import { useAuthReady } from "@/hooks/useAuthReady"
import { useFetchCourses } from "@/hooks/courses/useFetchCourse"
import IsLoading from "@/components/IsLoading"

const Container = styled.div`
    width: ${(props) => props.theme.widths.dsktopWidth};
    margin: 10 auto;
    padding: ${(props) => props.theme.paddings.pagePadding};
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
            padding: 5px 0;
        `,
    )}
    ${mobile(
        (props: any) => `
            width: ${props.theme.widths.mobileWidth};
            background: ${props.theme.mobile.mobileNavBg};
            box-shadow: 0px 4px 4px 0px ${props.theme.mobile.offWhite};
        `,
    )}
`
const Wrapper = styled.div`
    padding: 20px;
    border: 1px solid ${(props) => props.theme.mobile.horizontalrule};
    border-radius: 5px;
    ${ipad({ padding: "10px" })}
`
const Title = styled.h2`
    text-align: center;
`
const TopDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const BuyMoreBtn = styled.button<{ $type?: string }>`
    padding: 10px;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.mobile.mobileNavBg};
    background-color: transparent;
    border-radius: 5px;
    color: ${(props) => props.$type === "filled" && "white"};
    ${ipad({ margin: 5 })}
    ${mobile({ fontSize: 15 })}
`
const CheckOutBtn = styled.button<{ $type?: string }>`
    padding: 10px;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) =>
        props.$type === "filled" ? "none" : `solid 1px ${props.theme.mobile.mobileNavBg}`};
    background-color: ${(props) =>
        props.$type === "filled" ? props.theme.palette.primary.main : "transparent"};
    border-radius: 5px;
    color: ${(props) => props.$type === "filled" && "white"};
    ${ipad({ margin: 5 })}
    ${mobile({})}
`
const TopTexts = styled.div`
    ${ipad({ display: "none" })}
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
    color: ${(props) => props.theme.palette.primary.main};
`
const BottomDiv = styled.div`
    display: flex;
    justify-content: space-between;
    ${ipad({ flexDirection: "column" })}
`
const Info = styled.div`
    flex: 3;
`
const Course = styled.div`
    display: flex;
    justify-content: space-between;
    ${ipad({})}
`
const CourseDetail = styled.div<{ $ipad?: boolean }>`
    flex: ${(props) => (props.$ipad ? "1" : "2")};
    justify-content: ${(props) => (props.$ipad ? "flex-start" : "")};
    display: flex;
    margin: 5px 10px 0 0;
    padding: 0;
    ${ipad({ alignItems: "center", flexDirection: "column" })}
`
const Image = styled.img`
    width: 300px;
    height: 200px;
    ${ipad({ height: "150px", width: "100%" })}
    ${mobile({ height: "100px", width: "100%" })}
`
const Details = styled.div`
    padding: 0px 20px;
    margin: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    ${ipad({ padding: "0 5px" })}
`
const CourseName = styled.span`
    font-weight: 600;
    margin: 0;
    ${ipad({ padding: "5px 0" })}
    ${mobile({})}
`
const CourseId = styled.span`
    ${ipad({ padding: "5px 0" })}
`
const Duration = styled.span`
    ${ipad({ padding: "5px 0" })}
`
const ChangeContainer = styled.div`
    margin: 0 20px 0;
    ${ipad({ margin: 0, padding: 0, position: "relative", top: 50 })}
`
const Price = styled.p`
    font-weight: 600;
    color: ${(props) => props.theme.palette.primary.main};
    ${ipad({ margin: "0 auto" })}
    ${mobile({ margin: "0 auto" })}
`
const Remove = styled.p`
    color: ##cddeff;
    cursor: pointer;
    ${ipad({ margin: "0, auto" })}
    ${mobile({ margin: "0, auto" })}
`
const Hr = styled.hr`
    background-color: #cddeff;
    border: none;
    height: 1px;
`
const Summary = styled.div`
    flex: 1;
    text-align: center;
    border: 0.5px solid ${(props) => props.theme.mobile.horizontalrule};
    border-radius: 10px;
    padding: 20px;
    height: 50%;
    animation: pulse;
    animation-duration: 2s;
`
const SummaryTitle = styled.h3``
const SummaryItem = styled.div<{ $type?: string }>`
    margin: 30px 0px;
    display: flex;
    justify-content: center;
    font-weight: ${(props) => props.$type === "total" && "500"};
    font-size: ${(props) => props.$type === "total" && "20px"};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span`
    ${ipad({ fontSize: 20 })}
    ${mobile({ fontSize: 30 })}
`
const SetUpdate = styled.div`
    font-size: 18px;
    margin: 10px auto;
    font-weight: 400;
    color: #fff;
    width: 10%;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid;
    box-shadow: 5px 5px #cddeff;
    text-align: center;
    background: ${(props) => props.theme.palette.primary.main};
    ${ipad({ width: "80%" })}
    ${mobile({})}
`
export default function Cart() {
    const { cart, removeFromCart, isInCart } = useUserStore()
    const { user, firebaseUser, authReady, isLoadingUserDoc } = useAuthReady()
    const router = useRouter()
    const { data: courses, isLoading, error } = useFetchCourses()

    // Calculate the total amount
    const totalAmount = (courses ?? [])
        .filter((course) => cart.includes(course.id))
        .reduce((acc, course) => acc + course.price, 0)
        .toFixed(2)

    console.log("Total amount in your cart", totalAmount)

    // remove course from cart
    const remove = (courseId: string) => {
        removeFromCart(courseId)
    }

    if (isLoadingUserDoc || isLoading || !authReady) return <IsLoading />
    return (
        <Container>
            {firebaseUser ? (
                <Wrapper>
                    <Title>YOUR CART</Title>
                    <TopDiv>
                        <BuyMoreBtn onClick={() => router.push("/courses")}>
                            BUY MORE COURSES
                        </BuyMoreBtn>
                        <TopTexts>
                            <TopText>Your Cart ({cart.length})</TopText>
                            <TopText>Your Wishlist (0)</TopText>
                        </TopTexts>
                        <CheckOutBtn onClick={() => router.push("/checkout")}>
                            CHECKOUT NOW
                        </CheckOutBtn>
                    </TopDiv>
                    <BottomDiv>
                        <Info>
                            {courses
                                ?.filter((course) => cart.includes(course.id))
                                .map((course) => (
                                    <div key={course.id}>
                                        <Course>
                                            <CourseDetail>
                                                <Image src={course.image} alt={course.title} />
                                                <Details>
                                                    <CourseName>{course.title}</CourseName>
                                                    <CourseId>
                                                        <b>ID: </b>
                                                        {course.id}
                                                    </CourseId>
                                                    <Duration>
                                                        <b>Duration: </b>
                                                        {course.duration.hours > 0
                                                            ? `${course.duration.hours} hours ${course.duration.minutes} mins`
                                                            : `${course.duration.minutes} mins`}
                                                    </Duration>
                                                    <Duration>
                                                        <b>{course.onDemandVideos} </b>Lectures
                                                    </Duration>
                                                </Details>
                                            </CourseDetail>
                                            <CourseDetail $ipad={true}>
                                                <Price>₦ {course.price.toFixed(2)}</Price>
                                                <ChangeContainer>
                                                    <Remove onClick={() => remove(course.id)}>
                                                        Remove
                                                    </Remove>
                                                    <Remove>Move to Wishlist</Remove>
                                                </ChangeContainer>
                                            </CourseDetail>
                                        </Course>
                                    </div>
                                ))}
                        </Info>
                        <Summary>
                            <SummaryTitle>CHECKOUT SUMMARY</SummaryTitle>
                            <SummaryItem $type="total">
                                <SummaryItemText>Total:&nbsp;&nbsp;</SummaryItemText>
                                <SummaryItemPrice>&#8358;{totalAmount}</SummaryItemPrice>
                            </SummaryItem>
                            <CheckOutBtn $type="filled" onClick={() => router.push("/pay")}>
                                CHECKOUT NOW
                            </CheckOutBtn>
                        </Summary>
                    </BottomDiv>
                </Wrapper>
            ) : (
                <SetUpdate>Please login or update your profile</SetUpdate>
            )}
        </Container>
    )
}
