"use client"
import React, { useState } from "react"
import styled from "styled-components"
import Image from "next/image"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import LaptopIcon from "@mui/icons-material/Laptop"
import LanguageIcon from "@mui/icons-material/Language"
import { mobile, ipad } from "@/responsive"
import { toast } from "sonner"
import Certificate from "@/components/course/Certificate"

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
`
const TopContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    ${ipad(
        (props: any) => `
            `,
    )}
    ${mobile(
        (props: any) => `
           
            `,
    )}
`
const Left = styled.div`
    flex: 1;
`
const Title = styled.h1`
    span {
        color: #ff971a;
    }
`
const Description = styled.p`
    margin: 10px 0;
`
const InputContainer = styled.div`
    display: flex;
    justify-content: flex-start;
`
const Input = styled.input`
    padding: 10px;
    width: 350px;
    border: 1px solid ${(props) => props.theme.mobile.offWhite};
    border-radius: 5px 0 0 5px;
    outline: none;
    margin: 0;
    ${ipad(
        (props: any) => `
            width: 200px;
        `,
    )}
`
const Button = styled.button`
    background: #ff971a;
    border: none;
    padding: 10px 20px;
    color: white;
    font-weight: bold;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
`
const ResultBox = styled.div`
    margin-top: 20px;
    padding: 20px;
    background: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`
const Right = styled.div`
    border-radius: 8px;
    ${mobile(
        (props: any) => `
            display: none;
        `,
    )}
`
const InfoBoxes = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    gap: 20px;
    ${mobile(
        (props: any) => `
            flex-direction: column;
        `,
    )}
`
const Box = styled.div`
    flex: 1;
    display: flex;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    text-align: left;
`
const Icon = styled.div`
    font-size: 20px;
    margin: 5px;
`
const TextDiv = styled.div`
    margin: 5px;
    padding: 0;
    p {
        margin: 0;
        font-size: 12px;
        font-weight: 300;
    }
`
interface CertProf {
    user: any
    title: any
    id: any
    duration: any
    completed: boolean
}

export default function CertificateVerifier({ user, completed, title, duration, id }: CertProf) {
    const [certificateId, setCertificateId] = useState("")
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)

    const [open, setOpen] = useState(false)

    const openModal = () => {
        if (!completed) {
            toast.error("You haven't completed this course yet.")
            return
        }
        if (!title) {
            toast.warning("Please enter your course title.")
            return
        }
        setResult(true)
        setOpen(true)
        setVisible(true)
        toast.success("Congratulations>>> download your certificate")
        console.log(result, id, title, user)
    }

    const handleClose = () => {
        setOpen(false)
        setResult(false)
    }

    //   const handleVerify = async () => {
    //     setLoading(true)
    //     setResult(null)
    //     try {
    //       const docRef = doc(db, "certificates", certificateId.trim())
    //       const docSnap = await getDoc(docRef)

    //       if (docSnap.exists()) {
    //         setResult(docSnap.data())
    //       } else {
    //         setResult({ notFound: true })
    //       }
    //     } catch (err) {
    //       console.error(err)
    //     }
    //     setLoading(false)
    //   }

    return (
        <Container>
            <TopContainer>
                <Left>
                    <Title>
                        Now your <span>certificate</span> is in your <span>hands</span>
                    </Title>
                    <Description>
                        Type your Certificate ID here to authenticate your skill certificates and
                        badges.
                    </Description>
                    <InputContainer>
                        <Input
                            value={title}
                            // onChange={(e) => setCertificateId(e.target.value)}
                            disabled
                        />
                        {/* <Button onClick={handleVerify}> */}
                        <Button onClick={openModal}>{loading ? "Verifying..." : "Download"}</Button>
                    </InputContainer>

                    {result && (
                        <ResultBox>
                            {result.notFound ? (
                                <p> Certificate not found.</p>
                            ) : (
                                <Certificate
                                    handleClose={handleClose}
                                    user={user}
                                    title={title}
                                    duration={duration}
                                    id={id}
                                    $visible={visible}
                                />
                            )}
                        </ResultBox>
                    )}
                </Left>
                <Right>
                    <Image
                        src="/cert.png"
                        alt="certificate side"
                        fill={false}
                        width={300}
                        height={400}
                    />
                </Right>
            </TopContainer>
            <InfoBoxes>
                <Box>
                    <Icon>
                        <EmojiEventsIcon />
                    </Icon>
                    <TextDiv>
                        <p>
                            Our digital verification platform strengthens certificate integrity,
                            ensuring transparent and accessible authentication for stakeholders,
                            enhancing trust.
                        </p>
                    </TextDiv>
                </Box>
                <Box>
                    <Icon>
                        <LaptopIcon />
                    </Icon>
                    <TextDiv>
                        <p>
                            Streamlines external verification, enabling employers and institutions
                            to easily confirm certificates, enhancing user experience and reducing
                            issuer workload.
                        </p>
                    </TextDiv>
                </Box>
                <Box>
                    <Icon>
                        <LanguageIcon />
                    </Icon>
                    <TextDiv>
                        <p>
                            Effortless Online Verification.Quickly validate certificate authenticity
                            without physical checks or contacting the issuer, accessible from
                            anywhere.
                        </p>
                    </TextDiv>
                </Box>
            </InfoBoxes>
        </Container>
    )
}
