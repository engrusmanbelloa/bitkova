"use client"
import React, { useState, useRef, ReactElement, useEffect } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import Image from "next/image"
import Dialog from "@mui/material/Dialog"
import { TransitionProps } from "@mui/material/transitions"
import Slide from "@mui/material/Slide"
import CloseIcon from "@mui/icons-material/Close"
import styled from "styled-components"
import Button from "@/components/Button"
import HiddenCertificate from "@/components/course/HiddenCert"

const Container = styled.div<{ $visible?: boolean }>`
    padding: ${(props) => props.theme.paddings.pagePadding};
    display: ${(props) => (props.$visible ? "flex" : "none")};
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.mobile.mobileNavBg};
`
const Name = styled.div`
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
    font-weight: bold;
`
const Duration = styled.div`
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: #36a9e1;
`
const CourseTitle = styled.div`
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 24px;
    color: #021d41;
`
const Desc = styled.div`
    position: absolute;
    top: 60%;
    left: 50%;
    width: 550px;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: #36a9e1;
`
const DateIssued = styled.div`
    position: absolute;
    bottom: 26%;
    right: 33%;
    transform: translateX(-50%);
    font-size: 20px;
    font-weight: bold;
    color: #36a9e1;
`
const Id = styled.div`
    position: absolute;
    top: 22%;
    left: 34%;
    transform: translateX(-50%);
    font-size: 14px;
    color: #000;
`
const DownloadBtn = styled.div`
    position: fixed;
    z-index: 1000;
    left: 45%;
    bottom: 8%;
`
const ResponsivePreview = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

interface CertProf {
    user: any
    title: any
    id: any
    duration: any
    handleClose: () => void
    open: boolean
    $visible?: boolean
}

export default function Certificate({
    $visible,
    user,
    title,
    id,
    duration,
    handleClose,
    open,
}: CertProf) {
    const certRef = useRef<HTMLDivElement>(null)

    const Transition = ({
        children,
        ...props
    }: TransitionProps & {
        children: ReactElement<any, any>
    }) => {
        const ref = useRef(null)

        return (
            <Slide direction="up" ref={ref} {...props}>
                {children}
            </Slide>
        )
    }

    const handleDownload = async () => {
        if (!certRef.current) return
        const canvas = await html2canvas(certRef.current, { scale: 2 })
        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF("landscape", "pt", "a4")
        const width = pdf.internal.pageSize.getWidth()
        const height = pdf.internal.pageSize.getHeight()
        pdf.addImage(imgData, "PNG", 0, 0, width, height)
        pdf.save(`Bitkova_Certificate_${user}.pdf`)
    }

    return (
        <Container $visible={$visible}>
            <CloseIcon
                sx={{
                    zIndex: 9999,
                    fontSize: 50,
                    position: "fixed",
                    left: "75%",
                    top: "10%",
                    color: "red",
                }}
                onClick={handleClose}
            />
            <ResponsivePreview>
                <Image
                    src="/certificate-bitkova.jpg"
                    alt="Certificate"
                    priority
                    width={900}
                    height={650}
                    // fill={true}
                    // style={{ objectFit: "cover" }}
                />
                <Name>{user}</Name>
                <Duration>has successfully completed all requirements for the</Duration>
                <CourseTitle>{title}</CourseTitle>
                <Desc>
                    This student has successfully completed more than {duration} Credit hours of
                    theory and practice courses in Blockchain studies, Decentralized Finance,
                    Fundamental Analysis, Onchain analysis and Cryptocurrency Trading.
                </Desc>
                <DateIssued>
                    {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long", // shows full month name
                        day: "numeric",
                    })}
                </DateIssued>
                <Id>
                    <span style={{ color: "#36A9E1" }}>Certificate id: </span>
                    {id}
                </Id>
            </ResponsivePreview>
            {/* <CertificateWrapper id="certificate-template" ref={certRef}>
                <Image
                    src="/certificate-bitkova.jpg"
                    alt="Certificate"
                    priority
                    fill={true}
                    style={{ objectFit: "cover" }}
                />
                <CertName>{user}</CertName>
                <CertDuration>has successfully completed all requirements for the</CertDuration>
                <CertCourseTitle>{title}</CertCourseTitle>
                <CertDesc>
                    This student has successfully completed more than {duration} Credit hours of
                    theory and practice courses in Blockchain studies, Decentralized Finance,
                    Fundamental Analysis, Onchain analysis and Cryptocurrency Trading.
                </CertDesc>
                <CertDateIssued>{new Date().toLocaleDateString()}</CertDateIssued>
                <CartId>
                    <span style={{ color: "#356DF1" }}>Certificate id: </span>
                    {id}
                </CartId>
            </CertificateWrapper> */}
            <HiddenCertificate
                certRef={certRef}
                user={user}
                title={title}
                id={id}
                duration={duration}
            />
            <DownloadBtn>
                <Button $main={true} title="Download" onClick={handleDownload} />
            </DownloadBtn>
        </Container>
    )
}
