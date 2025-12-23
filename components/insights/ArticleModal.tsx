"use client"

import React, { MouseEvent, useState } from "react"
import styled, { keyframes } from "styled-components"
import { NewsArticle } from "@/types/news"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import { Card, Badge, Box, CardContent, Button, IconButton, Avatar } from "@mui/material"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import ShareIcon from "@mui/icons-material/Share"

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: flex-start; // Start from top to allow scrolling long content
    overflow-y: auto;
    padding: 20px;
    animation: ${fadeIn} 0.3s ease-out;
    backdrop-filter: blur(5px);
`

// Matches the card style but expanded
const ModalContainer = styled.div`
    background: white;
    border-radius: 16px;
    overflow: hidden;
    width: 100%;
    max-width: 800px; // Wider than the feed card
    margin-top: 40px;
    margin-bottom: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: ${slideUp} 0.4s ease-out;
    position: relative;
`
const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`
const ImageHeader = styled.div`
    height: 300px;
    // Using picsum placeholder again for demo
    background-image: url("https://picsum.photos/seed/modal/1200/600");
    background-size: cover;
    background-position: center;
`

const ModalContent = styled.div`
    padding: 30px;
    text-align: left;
`

const Tag = styled.span`
    background-color: #e0f2fe;
    color: #0284c7;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: 15px;
`

const Title = styled.h2`
    margin: 0 0 15px 0;
    color: #1e293b;
    font-size: 28px;
    line-height: 1.2;
`

// Styles for the injected HTML content
const ArticleBody = styled.div`
    color: #334155;
    line-height: 1.7;
    font-size: 16px;

    h4 {
        color: #0f172a;
        margin-top: 25px;
        margin-bottom: 10px;
        font-size: 18px;
    }

    p {
        margin-bottom: 20px;
    }

    // Style for the market data block seen in the image
    strong {
        font-weight: 700;
        color: #0f172a;
    }
`

const ReadLessBtn = styled.button`
    background-color: #ef4444; // Red color from image
    border: none;
    color: white;
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 25px;
    margin-top: 30px;
    box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.4);

    &:hover {
        background-color: #dc2626;
    }
`

interface ArticleModalProps {
    article: NewsArticle
    onClose: () => void
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
    const [bookmarked, setBookmarked] = useState(article.isBookmarked || false)
    // Stop clicks inside the modal from closing it
    const handleContainerClick = (e: MouseEvent) => {
        e.stopPropagation()
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({ title: article.title, url: window.location.href })
        }
    }
    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={handleContainerClick}>
                {/* Using placeholder image for demo */}
                <ImageHeader
                    style={{
                        backgroundImage: `url('https://picsum.photos/seed/${article.id}/1200/600')`,
                    }}
                />

                <ModalContent>
                    <ModalHeader>
                        <Tag>{article.tag}</Tag>
                        <div style={{ display: "flex", gap: "5px" }}>
                            <IconButton onClick={handleShare}>
                                <ShareIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => setBookmarked(!bookmarked)}
                                color={bookmarked ? "primary" : "default"}
                            >
                                {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                            </IconButton>
                        </div>
                    </ModalHeader>
                    <Title>{article.title}</Title>

                    {/* Injecting dummy full content HTML */}
                    <ArticleBody dangerouslySetInnerHTML={{ __html: article.fullContent }} />

                    <ReadLessBtn onClick={onClose}>
                        Read Less <ArrowUpwardIcon fontSize="small" style={{ marginLeft: 8 }} />
                    </ReadLessBtn>
                </ModalContent>
            </ModalContainer>
        </Overlay>
    )
}
