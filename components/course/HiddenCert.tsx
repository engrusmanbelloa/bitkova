"use client"
import Image from "next/image"
import styled from "styled-components"

const Container = styled.div<{ $visible?: boolean }>`
    display: ${(props) => (props.$visible ? "flex" : "none")};
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: -3000px;
    left: 100px;
    width: 842px;
    height: 595px;
    background: white;
    visibility: visible;
    opacity: 1;
    z-index: 9999;
`
const HiddenCertContainer = styled.div`
    position: relative;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
`
const CertificateContent = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
`
const Name = styled.div`
    position: absolute;
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
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
    font-size: 20px;
    color: #000;
    z-index: 10;
    text-align: center;
    width: 80%;
`
const Desc = styled.div`
    position: absolute;
    top: 66%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    width: 80%;
    line-height: 1.5;
    color: #000;
    text-align: center;
    z-index: 10;
`
const DateIssued = styled.div`
    position: absolute;
    bottom: 17%;
    right: 13%;
    transform: translateX(-50%);
    font-size: 14px;
    font-weight: bold;
    color: #000;
    z-index: 10;
`
const Id = styled.div`
    position: absolute;
    top: 9%;
    left: 15%;
    transform: translateX(-50%);
    font-size: 14px;
    color: #000;
    z-index: 10;
`

interface CertProf {
    user: any
    title: any
    id: any
    duration: any
    desc: any
    handleClose: () => void
    $visible?: boolean
    certRef: any
    issuedAt: any
}

export default function HiddenCertificate({
    $visible,
    user,
    title,
    id,
    duration,
    desc,
    certRef,
    issuedAt,
}: CertProf) {
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
            {/* Hidden certificate for PDF generation */}
            <HiddenCertContainer ref={certRef}>
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
                    <DateIssued>{formatDate(issuedAt)}</DateIssued>
                    <Id>
                        <span style={{ color: "#36A9E1" }}>Certificate id: </span>
                        {id}
                    </Id>
                </CertificateContent>
            </HiddenCertContainer>
        </Container>
    )
}
