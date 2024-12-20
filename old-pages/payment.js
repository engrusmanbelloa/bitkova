import { PaystackButton } from "react-paystack"
import styled from "styled-components"
import { mobile, ipad } from "../responsive"
import useStore from "../config/store"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import {
    getProviders,
    useSession,
    signIn,
    signOut,
    getCsrfToken,
    getSession,
} from "next-auth/react"

const Container = styled.div``

const Wrapper = styled.div`
    padding: 10px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #cddeff;
    border-bottom: 1px solid #cddeff;
`

const Info = styled.div`
    flex: 3;
`

const Course = styled.div`
    display: flex;
    justify-content: space-between;
    ${ipad({})}
`

const CourseDetail = styled.div`
    flex: ${(props) => (props.ipad ? "1" : "2")};
    justify-content: ${(props) => (props.ipad ? "flex-start" : "")};
    display: flex;
    margin: 5px 10px 0 0;
    padding: 0;
    ${ipad({ alignItems: "center", flexDirection: "column" })}
`

const Image = styled.img`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50%;
    ${ipad({ width: "100%", height: 150, borderRadius: 5 })}
    ${mobile({ width: "100%" })}
`

const Details = styled.div`
    padding: 5px;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
    ${ipad({ padding: "0 5px" })}
`

const CourseName = styled.span`
    font-size: 20px;
    font-weight: bold;
    padding: 5px 0;
    ${mobile({ fontSize: "16px", textAlign: "center" })}
`

const CourseId = styled.span`
    ${mobile({ textAlign: "center" })}
`

const Price = styled.p`
    font-size: 20px;
    font-weight: 500;
    color: ##1c3879;
    ${ipad({ fontSize: "18px", margin: "0, auto" })}
    ${mobile({ fontSize: "17px", margin: "0, auto" })}
`

const Hr = styled.hr`
    background-color: #cddeff;
    border: none;
    height: 1px;
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
    background: rgba(28, 56, 121, 1);
    ${ipad({ width: "80%" })}
    ${mobile({})}
`

const PayButton = styled(PaystackButton)`
    width: 150px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 5px 5px #cddeff;
    background-color: #1c3879;
    color: white;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
`

const Payment = () => {
    // hydration function
    const hasHydrated = useStore((state) => state._hasHydrated)
    const router = useRouter()
    const {
        enrolledCourses,
        cart,
        activeCourse,
        completedCourses,
        wishlist,
        ownCourses,
        points,
        lessonSteps,
        addToEnrolledCourses,
        addToActiveCourse,
        addToCompletedCourses,
        addToWishlist,
        addToOwnCourses,
        addToCart,
        removeFromCart,
        clearCart,
    } = useStore()
    const { data: session, status } = useSession()

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
    // "pk_test_6d1156302a45948dbc8116471bbea4ccacdcc550"
    console.log("PAYSTACK_PUBLIC_KEY: ", process.env.PAYSTACK_PUBLIC_KEY)

    // if (!hasHydrated || status === "loading") {
    // console.log("i am not hydrated")
    // return <SetUpdate>Loading....</SetUpdate>
    // }

    const totalAmount = cart.reduce((acc, course) => acc + course.price, 0).toFixed(2)
    const email = session?.user.email
    const name = session?.user.name
    const phone = session?.user.phone
    const amount = totalAmount * 100

    const componentProps = {
        email,
        amount,
        metadata: {
            name,
            phone,
        },
        publicKey: publicKey,
        text: "Pay Now",
        onSuccess: () => {
            const success = async () => {
                try {
                    const courseIds = cart.map((course) => course._id)
                    const response = await Promise.all(
                        courseIds.map((id) =>
                            fetch(`/api/courses/${id}`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }),
                        ),
                    )
                    if (response.every(async (res) => res.ok)) {
                        console.log("ids posts are successful")
                        await addToEnrolledCourses(courseIds)
                        await addToActiveCourse(courseIds)
                        await clearCart()
                        setTimeout(() => {
                            router.push("/success")
                        }, 1000)
                        console.log(" the purchased courses: ", enrolledCourses)
                    }
                } catch (error) {
                    console.error("Error adding courses to enrolledCourses: ", error)
                    alert("Error adding courses to enrolledCourses")
                }
            }
            success()
        },
        onClose: () => alert("Wait! Don't leave :("),
    }

    return (
        <Container>
            {session ? (
                <Wrapper>
                    <Info>
                        {cart.map((course) => (
                            <div key={course._id}>
                                <Course>
                                    <CourseDetail>
                                        <Image src={course.image} alt={course.title} />
                                        <Details>
                                            <CourseName>{course.title}</CourseName>
                                            <CourseId>
                                                <b>ID: </b>
                                                {course._id}
                                            </CourseId>
                                        </Details>
                                        <Price style={{ color: "#1C3879" }}>
                                            Price: &#8358; {course.price.toFixed(2)}
                                        </Price>
                                    </CourseDetail>
                                </Course>
                                <Hr />
                            </div>
                        ))}
                    </Info>
                    <Price style={{ color: "#1C3879" }}>Total: &#8358; {totalAmount}</Price>
                    <div>
                        <PayButton {...componentProps} />
                    </div>
                </Wrapper>
            ) : (
                <SetUpdate>Unauthorized</SetUpdate>
            )}
        </Container>
    )
}

export default Payment
