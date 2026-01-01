// components/payments/Success.tsx
"use client"
import styled from "styled-components"
import { useRouter } from "next/navigation"
import { mobile, ipad } from "@/responsive"
import { useAuthReady } from "@/hooks/useAuthReady"
import Image from "next/image"

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
    text-align: center;
`
const Img = styled(Image)`
    margin: auto;
`
const Price = styled.p`
    font-weight: 400;
    color: ${(props) => props.theme.palette.primary.main};
    ${ipad({ fontSize: "18px", margin: "0 auto" })}
    ${mobile({ fontSize: "17px", margin: "0 auto" })}
`
const Button = styled.button`
    width: 150px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 5px 5px #cddeff;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: white;
    font-weight: 400;
    cursor: pointer;
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
`

export default function Success() {
    const router = useRouter()
    const { user, authReady } = useAuthReady()

    if (!authReady) {
        return <SetUpdate>Loading...</SetUpdate>
    }

    return (
        <Container>
            {user ? (
                <Wrapper>
                    <Info>
                        <Img
                            src="intro.jpg"
                            width={100}
                            height={100}
                            priority={true}
                            alt="Course purchase successful"
                        />
                        <Price>Course purchase successful</Price>
                    </Info>
                    <Button onClick={() => router.push("/my-learning")}>Go to learn</Button>
                </Wrapper>
            ) : (
                <SetUpdate>Unauthorized</SetUpdate>
            )}
        </Container>
    )
}
