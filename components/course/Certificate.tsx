"use client"
import React, { useRef } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import Image from "next/image"
import CloseIcon from "@mui/icons-material/Close"
import styled from "styled-components"
import Button from "@/components/Button"
import HiddenCertificate from "@/components/course/HiddenCert"
import { mobile, ipad } from "@/responsive"

const Container = styled.div<{ $visible?: boolean }>`
    padding: ${(props) => props.theme.paddings.pagePadding};
    display: ${(props) => (props.$visible ? "flex" : "none")};
    justify-content: space-between;
    align-items: center;
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
            padding: 5px 0;
        `,
    )}
    ${mobile(
        (props: any) => `
            width: ${props.theme.widths.mobileWidth};
            padding:0;
        `,
    )}
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
const Name = styled.div`
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
    font-weight: bold;
    ${ipad(
        (props: any) => `
            font-size: 25px;
            text-align: center;
        `,
    )}
    ${mobile(
        (props: any) => `
        top: 48%;
        font-size: 15px;
        `,
    )}
`
const Duration = styled.div`
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    color: #36a9e1;
    ${ipad(
        (props: any) => `
            top: 51%;
            left: 51%;
            font-size: 12px;
            text-align: center;
        `,
    )}
    ${mobile(
        (props: any) => `
        font-size: 6px;
        `,
    )}
`
const CourseTitle = styled.div`
    position: absolute;
    top: 56%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 28px;
    color: #021d41;
    ${ipad(
        (props: any) => `
            top: 54%;
            font-size: 15px;
            text-align: center;
            width: 400px;
        `,
    )}
    ${mobile(
        (props: any) => `
        top: 52%;
        font-size: 10px;
        `,
    )}
`
const Desc = styled.div`
    position: absolute;
    top: 64%;
    left: 50%;
    width: 550px;
    transform: translate(-50%, -50%);
    font-size: 20px;
    width: 800px;
    line-height: 1.5;
    color: #36a9e1;
    text-align: center;
    ${ipad(
        (props: any) => `
            right: 15%;
            bottom: 20%;
            font-size: 14px;
            width: 500px;
            line-height: 1;
        `,
    )}
    ${mobile(
        (props: any) => `
        font-size: 8px;
        bottom: 15%;
        width: 280px;
        `,
    )}
`
const DateIssued = styled.div`
    position: absolute;
    bottom: 16%;
    right: 29%;
    transform: translateX(-50%);
    font-size: 20px;
    font-weight: bold;
    color: #36a9e1;
    ${ipad(
        (props: any) => `
            right: 15%;
            bottom: 28%;
            font-size: 16px;
        `,
    )}
    ${mobile(
        (props: any) => `
        bottom: 39%;
        font-size: 8px;
        `,
    )}
`
const Id = styled.div`
    position: absolute;
    top: 10%;
    left: 25%;
    transform: translateX(-50%);
    font-size: 14px;
    color: #000;
    ${ipad(
        (props: any) => `
            left: 20%;
            top: 28%;
            font-size: 12px;
        `,
    )}
    ${mobile(
        (props: any) => `
        left: 20%;
            top: 38%;
            font-size: 8px;
        `,
    )}
`
const DownloadBtn = styled.div`
    position: fixed;
    z-index: 1000;
    left: 45%;
    bottom: 0%;
    ${ipad(
        (props: any) => `
            left: 40%;
            bottom: 12%;
        `,
    )}
    ${mobile(
        (props: any) => `
            left: 30%;
            bottom: 27%;
        `,
    )}
`
const Icon = styled(CloseIcon)`
    z-index: 9999;
    font-size: 50px;
    position: fixed;
    right: 12%;
    top: 0;
    color: red;
    ${ipad(
        (props: any) => `
            left: 96%;
            top: 13%;
            font-size: 35px;
        `,
    )}
    ${mobile(
        (props: any) => `
            left: 93%;
            top: 30%;
            font-size: 30px;
        `,
    )}
`

interface CertProf {
    user: any
    title: any
    id: any
    duration: any
    handleClose: () => void
    $visible?: boolean
}

export default function Certificate({
    $visible,
    user,
    title,
    id,
    duration,
    handleClose,
}: CertProf) {
    const certRef = useRef<HTMLDivElement>(null)

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
            <Icon onClick={handleClose} />
            <ResponsivePreview>
                <Image
                    src="/BitkovaCert.jpg"
                    alt="Certificate"
                    priority
                    fill
                    style={{ objectFit: "contain" }}
                />

                <Name>{user}</Name>
                {/* <Duration>has successfully completed all requirements for the</Duration> */}
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
