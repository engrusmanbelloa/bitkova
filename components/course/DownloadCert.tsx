"use client"
import React, { AnyActionArg, useRef } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import Image from "next/image"
import CloseIcon from "@mui/icons-material/Close"
import styled from "styled-components"
import Button from "@/components/Button"
import { mobile, ipad } from "@/responsive"
import HiddenCertificate from "@/components/course/HiddenCert"

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
// Hidden certificate container for PDF generation
// const HiddenCertContainer = styled.div`
//     position: fixed;
//     top: 50px;
//     left: 50px;
//     z-index: 9999;
//     visibility: visible;
//     opacity: 1;
//     border: 2px solid red;
// `
const HiddenCertContainer = styled.div`
    position: absolute;
    top: 300px;
    left: 100px;
    width: 842px;
    height: 595px;
    background: white;
    visibility: visible;
    opacity: 1;
    border: 2px solid red;
    z-index: 9999;
`
const CertificateContent = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`
const Name = styled.div`
    position: absolute;
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
    font-weight: bold;
    color: #000;
    z-index: 10;
`
const CourseTitle = styled.div`
    position: absolute;
    top: 57%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 28px;
    color: #000;
    z-index: 10;
    text-align: center;
`
const Desc = styled.div`
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    width: 900px;
    line-height: 1.5;
    color: #000;
    text-align: center;
    z-index: 10;
`
const DateIssued = styled.div`
    position: absolute;
    bottom: 17%;
    right: 27%;
    transform: translateX(-50%);
    font-size: 20px;
    font-weight: bold;
    color: #000;
    z-index: 10;
`
const Id = styled.div`
    position: absolute;
    top: 10%;
    left: 25%;
    transform: translateX(-50%);
    font-size: 14px;
    color: #000;
    z-index: 10;
`

const PreviewName = styled(Name)`
    ${ipad(
        (props: any) => `
            font-size: 25px;
            text-align: center;
            top: 47%;
        `,
    )}
    ${mobile(
        (props: any) => `
        top: 48%;
        font-size: 15px;
        `,
    )}
`
const PreviewCourseTitle = styled(CourseTitle)`
    ${ipad(
        (props: any) => `
            top: 55%;
            font-size: 15px;
            text-align: center;
            width: 400px;
        `,
    )}
    ${mobile(
        (props: any) => `
        top: 53%;
        font-size: 10px;
        `,
    )}
`
const PreviewDesc = styled(Desc)`
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
        bottom: 14%;
        width: 280px;
        `,
    )}
`
const PreviewDateIssued = styled(DateIssued)`
    ${ipad(
        (props: any) => `
            right: 10%;
            bottom: 26%;
            font-size: 16px;
        `,
    )}
    ${mobile(
        (props: any) => `
        bottom: 38%;
        font-size: 8px;
        `,
    )}
`
const PreviewId = styled(Id)`
    ${ipad(
        (props: any) => `
            left: 10%;
            top: 20%;
            font-size: 12px;
        `,
    )}
    ${mobile(
        (props: any) => `
        left: 15%;
            top: 36%;
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
            bottom: 10%;
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
    right: 15%;
    top: 0;
    color: red;
    cursor: pointer;
    ${ipad(
        (props: any) => `
            left: 96%;
            top: 10%;
            font-size: 35px;
        `,
    )}
    ${mobile(
        (props: any) => `
            left: 93%;
            top: 29%;
            font-size: 30px;
        `,
    )}
`

interface CertProf {
    user: any
    title: any
    id: any
    duration: any
    desc: any
    handleClose: () => void
    $visible?: boolean
    issuedAt: any
}

export default function CertificateDownload({
    $visible,
    user,
    title,
    id,
    duration,
    desc,
    handleClose,
    issuedAt,
}: CertProf) {
    const certRef = useRef<HTMLDivElement>(null)

    const handleDownload = async () => {
        if (!certRef.current) {
            console.error("Certificate ref not found")
            return
        }

        try {
            console.log("Starting certificate generation...")

            // Wait for images to load
            const images = certRef.current.querySelectorAll("img")
            console.log(`Found ${images.length} images`)

            await Promise.all(
                Array.from(images).map((img) => {
                    if (img.complete) {
                        console.log("Image already loaded:", img.src)
                        return Promise.resolve()
                    }
                    return new Promise((resolve, reject) => {
                        img.onload = () => {
                            console.log("Image loaded:", img.src)
                            resolve(null)
                        }
                        img.onerror = (error) => {
                            console.error("Image failed to load:", img.src, error)
                            reject(error)
                        }
                        // Set a timeout in case image loading hangs
                        setTimeout(() => {
                            console.log("Image loading timeout:", img.src)
                            resolve(null) // Resolve anyway to continue
                        }, 5000)
                    })
                }),
            )

            // Additional wait for rendering
            await new Promise((resolve) => setTimeout(resolve, 1000))

            console.log("Generating canvas...")
            const canvas = await html2canvas(certRef.current, {
                scale: 2,
                useCORS: true,
                allowTaint: false,
                backgroundColor: "#ffffff",
                logging: true,
                width: 842,
                height: 595,
                windowWidth: 842,
                windowHeight: 595,
            })

            console.log("Canvas generated:", canvas.width, "x", canvas.height)

            const imgData = canvas.toDataURL("image/png", 1.0)
            console.log("Image data length:", imgData.length)

            // Check if imgData is valid
            if (!imgData || imgData === "data:," || imgData.length < 1000) {
                throw new Error(`Invalid image data generated. Length: ${imgData.length}`)
            }

            console.log("Creating PDF...")
            const pdf = new jsPDF("landscape", "pt", "a4")
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()

            console.log("PDF dimensions:", pdfWidth, "x", pdfHeight)

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
            pdf.save(`Bitkova_Certificate_${user}.pdf`)

            console.log("PDF saved successfully!")
        } catch (error: any) {
            console.error("Error generating certificate:", error)
            alert(`Failed to generate certificate: ${error.message}`)
        }
    }

    const formatDate = (firebaseTimestamp: FirebaseFirestore.Timestamp) => {
        const date = new Date(firebaseTimestamp.toMillis())
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            // hour: "2-digit",
            // minute: "2-digit",
            // second: "2-digit",
        })
    }

    return (
        <Container $visible={$visible}>
            <Icon onClick={handleClose} />
            <ResponsivePreview>
                <Image
                    src="/BitkovaCert.png"
                    alt="Certificate"
                    priority
                    fill
                    style={{ objectFit: "contain" }}
                />

                <PreviewName>{user}</PreviewName>
                <PreviewCourseTitle>{title}</PreviewCourseTitle>
                <PreviewDesc>
                    This student has successfully completed more than {duration} Credit hours of
                    theory and practice courses in {desc}.
                </PreviewDesc>
                <PreviewDateIssued>{formatDate(issuedAt)}</PreviewDateIssued>
                <PreviewId>
                    <span style={{ color: "#36A9E1" }}>Certificate id: </span>
                    {id}
                </PreviewId>
            </ResponsivePreview>

            {/* Hidden certificate for PDF generation */}
            {/* <HiddenCertContainer ref={certRef}>
                <CertificateContent>
                    <Image
                        src="/BitkovaCert.png"
                        alt="Certificate"
                        fill
                        style={{ objectFit: "contain" }}
                        priority
                    />
                    <Name>{user}</Name>
                    <CourseTitle>{title}</CourseTitle>
                    <Desc>
                        This student has successfully completed more than {duration} Credit hours of
                        theory and practice courses in {desc}.
                    </Desc>
                    <DateIssued>
                        {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </DateIssued>
                    <Id>
                        <span style={{ color: "#36A9E1" }}>Certificate id: </span>
                        {id}
                    </Id>
                </CertificateContent>
            </HiddenCertContainer> */}
            <HiddenCertificate
                $visible={$visible}
                user={user}
                id={id}
                title={title}
                duration={duration}
                desc={desc}
                handleClose={handleClose}
                certRef={certRef}
                issuedAt={issuedAt}
            />
            <DownloadBtn>
                <Button $main={true} title="Download" onClick={handleDownload} />
            </DownloadBtn>
        </Container>
    )
}
