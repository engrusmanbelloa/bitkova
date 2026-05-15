"use client"
import { useState } from "react"
import styled, { keyframes } from "styled-components"
import DownloadIcon from "@mui/icons-material/Download"
import SchoolIcon from "@mui/icons-material/School"
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"
import EnrollButton from "@/components/EnrollButton"

// animations
const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0);    }
`
// Card components and styles
const Card = styled.div`
    border-radius: 16px;
    overflow: hidden;
    background: ${(p) => p.theme.palette.common.white};
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.07);
    animation: ${fadeUp} 0.38s ease both;
    transition:
        transform 0.2s,
        box-shadow 0.2s;

    &:nth-child(1) {
        animation-delay: 0.04s;
    }
    &:nth-child(2) {
        animation-delay: 0.09s;
    }
    &:nth-child(3) {
        animation-delay: 0.14s;
    }
    &:nth-child(4) {
        animation-delay: 0.19s;
    }
    &:nth-child(5) {
        animation-delay: 0.24s;
    }
    &:nth-child(6) {
        animation-delay: 0.29s;
    }

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    }
`
const Banner = styled.div<{ $bg: string }>`
    height: 108px;
    background: ${(p) => p.$bg};
    position: relative;
    display: flex;
    align-items: flex-end;
    padding: 0 18px 14px;
    overflow: hidden;

    /* shimmer sweep */
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
            105deg,
            transparent 38%,
            rgba(255, 255, 255, 0.09) 50%,
            transparent 62%
        );
        background-size: 200% 100%;
        animation: ${shimmer} 3.5s linear infinite;
    }

    /* big decorative circle top-right */
    &::after {
        content: "";
        position: absolute;
        right: -36px;
        top: -36px;
        width: 110px;
        height: 110px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        pointer-events: none;
    }
`
const BannerSmallCircle = styled.div`
    position: absolute;
    right: 58px;
    bottom: -32px;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #ffffff0d;
    pointer-events: none;
`
const TypeChip = styled.span`
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.1px;
    color: ${(props) => props.theme.palette.common.white};
    background: #ffffff21;
    border: 1px solid ${(props) => props.theme.mobile.gray};
    border-radius: 20px;
    padding: 3px 10px;
    position: relative;
    z-index: 1;
`
const BannerIcon = styled.div`
    position: absolute;
    top: 14px;
    right: 14px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.16);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.palette.common.white};
    z-index: 1;
    svg {
        font-size: 19px;
    }
`

// Body
const Body = styled.div`
    padding: 18px 18px 14px;
`
const CertTitle = styled.h3`
    font-size: 15px;
    font-weight: 700;
    color: ${(p) => p.theme.palette.common.black};
    margin: 0 0 3px;
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`
const CertSub = styled.p`
    font-size: 12px;
    color: ${(p) => p.theme.palette.common.black};
    margin: 0 0 14px;
`
const Hr = styled.div`
    height: 1px;
    background: ${(props) => props.theme.mobile.horizontalrule};
    margin-bottom: 14px;
`
const MetaRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
`
const MetaItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`
const MetaLabel = styled.span`
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: ${(p) => p.theme.mobile.gray};
`
const MetaValue = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: ${(props) => props.theme.palette.common.black};
`
const CertIdRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 14px;
`
const CertIdValue = styled.span`
    font-size: 11px;
    font-weight: 600;
    font-family: "Courier New", monospace;
    color: ${(props) => props.theme.palette.primary.main};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
`
// banner gradients for different cert types
const BANNERS = {
    async_course: "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
    physical_class: "linear-gradient(135deg, #0d47a1 0%, #1565c0 55%, #1976d2 100%)",
    telegram_class: "linear-gradient(135deg, #006064 0%, #00838f 55%, #00acc1 100%)",
}

interface CertificateCardProps {
    type: keyof typeof BANNERS
    chipLabel: string
    title: string
    subtitle: string
    issued: string
    duration: string
    certId: string
    onDownload: () => void
}

export default function CertificateCard({
    type,
    chipLabel,
    title,
    subtitle,
    issued,
    duration,
    certId,
    onDownload,
}: CertificateCardProps) {
    return (
        <Card>
            <Banner $bg={BANNERS[type]}>
                <BannerSmallCircle />
                <TypeChip>{chipLabel}</TypeChip>
                <BannerIcon>
                    {type === "async_course" ? <SchoolIcon /> : <WorkspacePremiumIcon />}
                </BannerIcon>
            </Banner>
            <Body>
                <CertTitle>{title}</CertTitle>
                <CertSub>{subtitle}</CertSub>
                <Hr />
                <MetaRow>
                    <MetaItem>
                        <MetaLabel>Issued</MetaLabel>
                        <MetaValue>{issued}</MetaValue>
                    </MetaItem>
                    <MetaItem style={{ alignItems: "flex-end" }}>
                        <MetaLabel>Duration</MetaLabel>
                        <MetaValue>{duration}</MetaValue>
                    </MetaItem>
                </MetaRow>
                <CertIdRow>
                    <MetaLabel>Certificate ID</MetaLabel>
                    <CertIdValue title={certId}>{certId}</CertIdValue>
                </CertIdRow>
                <Hr />
                <EnrollButton onClick={onDownload}>
                    <DownloadIcon /> Download Certificate
                </EnrollButton>
                {/* <DownloadBtn onClick={onDownload}>
                    <DownloadIcon /> Download Certificate
                </DownloadBtn> */}
            </Body>
        </Card>
    )
}
