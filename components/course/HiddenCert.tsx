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

const Container = styled.div`
    padding: ${(props) => props.theme.paddings.pagePadding};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.mobile.mobileNavBg};
`
const CertificateWrapper = styled.div`
    position: fixed;
    z-index: 99;
    background: rgba(0, 0, 0, 0.6);
    top: -9999px;
    left: -9999px;
    width: 1123px;
    height: 794px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const CertName = styled.div`
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
    font-weight: bold;
`
const CertDuration = styled.div`
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: #36a9e1;
`
const CertCourseTitle = styled.div`
    position: absolute;
    top: 57%;
    left: 50%;
    width: 600px;
    text-align: center;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 24px;
    color: #031c3d;
`
const CertDesc = styled.div`
    position: absolute;
    top: 63%;
    left: 50%;
    width: 600px;
    transform: translate(-50%, -50%);
    font-size: 18px;
    text-align: center;
    color: #36a9e1;
`
const CertDateIssued = styled.div`
    position: absolute;
    bottom: 16%;
    right: 12%;
    transform: translateX(-50%);
    font-size: 26px;
    font-weight: bold;
    color: ${(props) => props.theme.palette.primary.main};
`
const CartId = styled.div`
    position: absolute;
    top: 10%;
    left: 15%;
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
interface CertProf {
    user: any
    title: any
    id: any
    duration: any
    certRef: any
}

export default function HiddenCertificate({ certRef, user, title, id, duration }: CertProf) {
    //  const certRef = useRef<HTMLDivElement>(null)

    return (
        <CertificateWrapper id="certificate-template" ref={certRef}>
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
                This student has successfully completed more than {duration} Credit hours of theory
                and practice courses in Blockchain studies, Decentralized Finance, Fundamental
                Analysis, Onchain analysis and Cryptocurrency Trading.
            </CertDesc>
            <CertDateIssued>
                {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long", // shows full month name
                    day: "numeric",
                })}
            </CertDateIssued>
            <CartId>
                <span style={{ color: "#36A9E1" }}>Certificate id: </span>
                {id}
            </CartId>
        </CertificateWrapper>
    )
}
