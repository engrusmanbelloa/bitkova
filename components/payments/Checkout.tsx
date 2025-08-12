"use client"
import { PaystackButton, usePaystackPayment } from "react-paystack"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/lib/store/useUserStore"
import { useAuthReady } from "@/hooks/useAuthReady"
import { enrollCourses } from "@/lib/firebase/uploads/enrollCourses"
import { toast } from "sonner"
import { useFetchCourses } from "@/hooks/courses/useFetchCourse"
import { EnrolledCourse } from "@/userType"
import { removeFromCartDb } from "@/lib/firebase/queries/cart"

const Container = styled.div`
    width: ${(props) => props.theme.widths.dsktopWidth};
    margin: 0 auto;
    ${ipad(
        (props: any) => `
            display: block;
            width: ${props.theme.widths.ipadWidth};
        `,
    )}
    ${mobile(
        (props: any) => `
            width: ${props.theme.widths.mobileWidth};
        `,
    )}
`
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
const CourseDetail = styled.div<{ $ipad?: boolean }>`
    flex: ${(props) => (props.$ipad ? "1" : "2")};
    justify-content: ${(props) => (props.$ipad ? "flex-start" : "")};
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
    font-weight: 500;
    color: ${(props) => props.theme.palette.primary.main};
    ${ipad({ fontSize: "18px", margin: "0, auto" })};
    ${mobile({ fontSize: "17px", margin: "0, auto" })};
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
const PayButton = styled.button`
    width: 150px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 5px 5px #cddeff;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: white;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
`

export default function Checkout() {
    // const {
    //     enrolledCourses,
    //     cart,
    //     activeCourse,
    //     completedCourses,
    //     wishlist,
    //     ownCourses,
    //     points,
    //     lessonSteps,
    //     addToEnrolledCourses,
    //     addToActiveCourse,
    //     addToCompletedCourses,
    //     addToWishlist,
    //     addToOwnCourses,
    //     addToCart,
    //     removeFromCart,
    //     clearCart,
    // } = useStore()

    const router = useRouter()
    const { cart, enrolledCourses, removeFromCart, addToEnrolledCourses } = useUserStore()
    const { user, authReady } = useAuthReady()
    const { data: courses, isLoading, error } = useFetchCourses()

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!
    // "pk_test_6d1156302a45948dbc8116471bbea4ccacdcc550"
    console.log("PAYSTACK_PUBLIC_KEY: ", process.env.PAYSTACK_PUBLIC_KEY)

    const cartCourses = (courses ?? []).filter((course) => cart.includes(course.id))
    const totalAmount = cartCourses.reduce((acc, course) => acc + course.price, 0)

    const amount = totalAmount * 100

    const onSuccess = async () => {
        if (!user) return

        const courseIds = cartCourses.map((c) => c.id)
        const newEnrollments: EnrolledCourse[] = cartCourses.map((course) => ({
            userId: user.id,
            courseId: course.id,
            completedLessons: 0,
            progress: 0,
            status: "in progress",
            enrolledAt: new Date(),
            updatedAt: new Date(),
        }))

        try {
            await enrollCourses(user.id, courseIds) // Enroll the user in the courses in firebase
            newEnrollments.forEach(addToEnrolledCourses) // Update the user store with new enrollments
            courseIds.forEach((id) => removeFromCart(id)) // Remove courses from the cart in the user store
            courseIds.forEach((id) => removeFromCartDb(user.id, id)) // Remove courses from cart in the database
            toast.success("Payment successful! Courses added.")
            router.push("/success")
        } catch (err) {
            console.error(err)
            toast.error("Payment succeeded but enrollment failed!")
        }
    }

    const onClose = () => {
        toast("Payment cancelled.")
    }

    const componentProps = {
        email: user?.email || "",
        amount: amount,
        reference: new Date().getTime().toString(),
        metadata: {
            custom_fields: [
                {
                    display_name: "Email",
                    value: user?.email || "",
                    variable_name: "CUSTOM_EMAIL",
                },
                {
                    display_name: "Phone",
                    value: user?.phoneNumber || "N/A",
                    variable_name: "CUSTOM_PHONE",
                },
            ],
        },
        publicKey: publicKey,
        text: "Pay Now",
    }

    const PaystackHook = () => {
        const initializePayment = usePaystackPayment(componentProps)
        return (
            <div>
                <PayButton
                    onClick={() => {
                        initializePayment({
                            onSuccess,
                            onClose: onClose,
                            ...componentProps,
                        })
                    }}
                >
                    Pay now
                </PayButton>
            </div>
        )
    }

    if (!authReady || isLoading) return <p>Loading</p>
    if (error) return <p>Failed to load courses</p>

    return (
        <Container>
            {user ? (
                <Wrapper>
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
                    <Price>Total: &#8358; {totalAmount}</Price>
                    <div>
                        <PaystackHook />
                    </div>
                </Wrapper>
            ) : (
                <SetUpdate>Unauthorized</SetUpdate>
            )}
        </Container>
    )
}
