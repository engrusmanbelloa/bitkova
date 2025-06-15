"use client"
import React, { useState } from "react"
import styled from "styled-components"
import Image from "next/image"
import { mobile, ipad } from "@/responsive"
// import { db } from '@/firebase' // your initialized firestore instance
import { doc, getDoc } from "firebase/firestore"

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
`
const TopContainer = styled.div`
    display: flex;
    justify-content: flex-start;
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

export default function CertificateVerifier() {
    const [certificateId, setCertificateId] = useState("")
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)

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
                        Now that your <span>certificate</span> is in your <span>hands</span>
                    </Title>
                    <Description>
                        Type your Certificate ID here to authenticate your skill certificates and
                        badges.
                    </Description>
                    <InputContainer>
                        <Input
                            placeholder="Enter your Certificate ID here"
                            value={certificateId}
                            onChange={(e) => setCertificateId(e.target.value)}
                        />
                        {/* <Button onClick={handleVerify}> */}
                        <Button>{loading ? "Verifying..." : "Verify ID"}</Button>
                    </InputContainer>

                    {result && (
                        <ResultBox>
                            {result.notFound ? (
                                <p>❌ Certificate not found.</p>
                            ) : (
                                <>
                                    <h3>✅ Certificate Verified</h3>
                                    <p>
                                        <strong>Name:</strong> {result.userName}
                                    </p>
                                    <p>
                                        <strong>Course:</strong> {result.courseTitle}
                                    </p>
                                    <p>
                                        <strong>Issued On:</strong> {result.issueDate}
                                    </p>
                                    <p>
                                        <strong>Issuer:</strong> {result.issuer}
                                    </p>
                                </>
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
                        priority={true}
                    />
                </Right>
            </TopContainer>
        </Container>
    )
}
