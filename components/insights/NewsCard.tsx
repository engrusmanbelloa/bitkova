"use client"

import React, { useState, MouseEvent } from "react"
import styled from "styled-components"
import { NewsArticle } from "@/types/news"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { TrendingUp, TrendingDown, ArrowLeft, Bookmark, Share } from "@mui/icons-material"
import { Card, Badge, Box, CardContent, Button, IconButton, Avatar } from "@mui/material"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import ShareIcon from "@mui/icons-material/Share"

const StyledCard = styled(Card)`
    background: ${(props) => props.theme.palette.common.white};
    border-radius: 8px;
    margin-bottom: 16px;
    cursor: pointer;
    overflow: hidden;
    transition:
        transform 0.2s,
        box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
    }
`
const NewsImage = styled.img`
    width: 100%;
    height: 200px;
    margin-bottom: 0;
    object-fit: cover;
`
const NewsContent = styled(CardContent)`
    border-top: 5px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 8px;
    padding: 16px;
    margin-top: 0;
`
const ActionRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`
const IconGroup = styled.div`
    display: flex;
    gap: 8px;
`
const ImageHeader = styled.div<{ $imageUrl: string }>`
    height: 230px;
    background-image: url(${(props) => props.$imageUrl});
    background-size: cover;
    background-position: center;
    position: relative;
`
// Placeholder gradient if image fails or for style
const ImagePlaceholder = styled.div`
    height: 230px;
    background: linear-gradient(
        45deg,
        ${(props) => props.theme.palette.primary.main} 45%,
        ${(props) => props.theme.mobile.offWhite} 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
`
const Tag = styled.span`
    background-color: ${(props) => props.theme.mobile.horizontalrule};
    color: ${(props) => props.theme.palette.primary.main};
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: 10px;
`
const Title = styled.h3`
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 5px;
    color: ${(props) => props.theme.palette.common.black};
`
const DateText = styled.p`
    margin: 0 0 12px 0;
    color: ${(props) => props.theme.mobile.gray};
`
const Summary = styled.p`
    color: ${(props) => props.theme.palette.common.black};
    margin: 0 0 20px 0;
    line-height: 1.5;
`
const ReadMoreBtn = styled.button`
    background: none;
    border: none;
    color: ${(props) => props.theme.palette.primary.main};
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0;

    &:hover {
        text-decoration: underline;
    }
`
const NewsExcerpt = styled.p`
    color: ${(props) => props.theme.palette.common.black};
    line-height: 1.6;
    margin: 0 0 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`

interface NewsCardProps {
    article: NewsArticle
    onReadMore: () => void
}

export default function NewsCard({ article, onReadMore }: NewsCardProps) {
    const [bookmarked, setBookmarked] = useState(article.isBookmarked || false)
    // Using a placeholder strategy because I don't have the actual images
    // In a real app, ImageHeader would use article.imageUrl

    const handleShare = async (e: MouseEvent) => {
        e.stopPropagation()
        const shareData = {
            title: article.title,
            text: article.summary,
            url: window.location.href, // In production, this would be the article link
        }

        if (navigator.share) {
            try {
                await navigator.share(shareData)
            } catch (err) {
                console.log("Error sharing", err)
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href)
            alert("Link copied to clipboard!")
        }
    }

    const toggleBookmark = (e: MouseEvent) => {
        e.stopPropagation()
        setBookmarked(!bookmarked)
        // Logic for Firebase: db.collection('bookmarks').add({ userId, articleId })
    }
    return (
        <StyledCard elevation={3} sx={{}}>
            {article.imageUrl.includes("placeholder") ? (
                <ImagePlaceholder>{article.category}</ImagePlaceholder>
            ) : (
                //  To use real images, uncomment below and ensure paths are correct in public folder
                //  <ImageHeader $imageUrl={article.imageUrl} />
                <ImagePlaceholder
                    style={{
                        backgroundImage: `url('https://picsum.photos/seed/${article.id}/800/400')`,
                        backgroundSize: "cover",
                    }}
                />
            )}

            <NewsContent>
                <Tag>{article.tag}</Tag>
                <Title>{article.title}</Title>
                <DateText>{article.date}</DateText>
                <Summary>{article.summary}</Summary>
                <ActionRow>
                    <ReadMoreBtn onClick={onReadMore}>
                        Read More <ChevronRightIcon fontSize="small" style={{ marginLeft: 4 }} />
                    </ReadMoreBtn>

                    <IconGroup>
                        <IconButton size="small" onClick={handleShare} sx={{ color: "#94a3b8" }}>
                            <ShareIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={toggleBookmark}
                            sx={{ color: bookmarked ? "#3b82f6" : "#94a3b8" }}
                        >
                            {bookmarked ? (
                                <BookmarkIcon fontSize="small" />
                            ) : (
                                <BookmarkBorderIcon fontSize="small" />
                            )}
                        </IconButton>
                    </IconGroup>
                </ActionRow>
            </NewsContent>
        </StyledCard>
    )
}
