import { useState, useEffect, useRef, useCallback } from "react"
import styled from "styled-components"
import { TrendingUp, TrendingDown, ArrowLeft, Bookmark, Share } from "@mui/icons-material"
import { Card, Badge, Box, CardContent, Button, IconButton, Avatar } from "@mui/material"
import {
    MOCK_NEWS,
    MARKET_PRICES,
    MarketPrice,
    CRYPTO_CATEGORIES,
    NewsArticle,
} from "@/typeInsights"
import { mobile, ipad } from "@/responsive"

const Container = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    padding: 0;
    margin: 0 auto 30px;
    box-sizing: border-box;
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
        `,
    )}
    ${mobile(
        (props: any) => `
            width: 100%;
            max-width: ${props.theme.widths.mobileWidth};
        `,
    )}
`
const ContentWrapper = styled.div``
const SectionTitle = styled.h2`
    margin-bottom: 16px;
    color: ${(props) => props.theme.palette.common.black};
`
const NewsCard = styled(Card)`
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
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
const StyledBadge = styled(Badge)`
    padding: 7px;
    background: ${(props) => props.theme.mobile.horizontalrule};
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 8px;
`
export const NewsHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
`
const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
`
export const NewsTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 5px;
    color: ${(props) => props.theme.palette.common.black};
`
const NewsDate = styled.p`
    color: ${(props) => props.theme.palette.common.black};
    margin: 0 0 5px;
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
const ReadMoreButton = styled.button`
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 14px;
    font-weight: 500;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
        color: ${({ theme }) => theme.mobile.offWhite};
    }
`
const DetailHeader = styled.div`
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
const DetailContent = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 24px 16px;
`
const DetailImage = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 20px;
`
const DetailTitle = styled.h1`
    font-size: 28px;
    font-weight: bold;
    margin: 16px 0;
    color: #1f2937;
`
const DetailMeta = styled.div`
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 24px;
`
const DetailBody = styled.div`
    font-size: 16px;
    line-height: 1.8;
    color: #374151;
    white-space: pre-line;
`
const LoadingIndicator = styled.div`
    text-align: center;
    padding: 20px;
    color: #6b7280;
    font-size: 14px;
`
const Spacer = styled.div`
    flex: 1;
`
const ScrollableView = styled.div`
    overflow-y: auto;
    height: calc(100vh - 56px);
`
interface CryptoNewsProps {
    filter?: "all" | "crypto" | "blockchain"
}
export default function CryptoNews() {
    const [news, setNews] = useState<NewsArticle[]>([])
    const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [bookmarkedNews, setBookmarkedNews] = useState<Set<string>>(new Set())
    const observerTarget = useRef<HTMLDivElement>(null)
    const initialLoadDone = useRef(false)

    const filteredNews = MOCK_NEWS.filter((article) => CRYPTO_CATEGORIES.includes(article.category))

    const loadMoreNews = useCallback(() => {
        if (loading || !hasMore) return

        setLoading(true)
        setTimeout(() => {
            const startIndex = news.length
            const newItems = filteredNews.slice(startIndex, startIndex + 2)

            if (newItems.length > 0) {
                setNews((prev) => [...prev, ...newItems])
            } else {
                setHasMore(false)
            }
            setLoading(false)
        }, 800)
    }, [news.length, loading, hasMore, filteredNews])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreNews()
                }
            },
            { threshold: 0.1 },
        )

        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }

        return () => observer.disconnect()
    }, [loadMoreNews])

    useEffect(() => {
        setNews(filteredNews.slice(0, 2))
    }, [])

    const toggleBookmark = (newsId: string) => {
        setBookmarkedNews((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(newsId)) {
                newSet.delete(newsId)
            } else {
                newSet.add(newsId)
            }
            return newSet
        })
    }

    const handleShare = async (newsItem: NewsArticle) => {
        const shareData = {
            title: newsItem.title,
            text: newsItem.content.substring(0, 100) + "...", // First 100 chars
            url: window.location.href,
        }

        try {
            if (navigator.share) {
                await navigator.share(shareData)
            } else {
                await navigator.clipboard.writeText(
                    `${newsItem.title}\n\n${newsItem.content.substring(0, 100)}...\n\n${window.location.href}`,
                )
                alert("Link copied to clipboard!")
            }
        } catch (err) {
            if (err instanceof Error && err.name !== "AbortError") {
                console.error("Error sharing:", err)
            }
        }
    }

    if (selectedNews) {
        return (
            <Container>
                <DetailHeader>
                    <IconButton onClick={() => setSelectedNews(null)}>
                        <ArrowLeft sx={{ fontSize: 20 }} />
                    </IconButton>
                    <Spacer />
                    <IconButton onClick={() => toggleBookmark(selectedNews.id)}>
                        <Bookmark
                            sx={{ fontSize: 20 }}
                            fill={bookmarkedNews.has(selectedNews.id) ? "currentColor" : "none"}
                        />
                    </IconButton>
                    <IconButton onClick={() => handleShare(selectedNews)}>
                        <Share sx={{ fontSize: 20 }} />
                    </IconButton>
                </DetailHeader>

                <ScrollableView>
                    <DetailContent>
                        <DetailImage src={selectedNews.image} alt={selectedNews.title} />

                        <div style={{ marginBottom: 16 }}>
                            <Badge>{selectedNews.category}</Badge>
                        </div>

                        <DetailTitle>{selectedNews.title}</DetailTitle>

                        <DetailMeta>
                            {selectedNews.date} • {selectedNews.priceInfo}
                        </DetailMeta>

                        <DetailBody>{selectedNews.content}</DetailBody>
                    </DetailContent>
                </ScrollableView>
            </Container>
        )
    }

    return (
        <Container>
            <ContentWrapper>
                <SectionTitle>Latest News</SectionTitle>
                {news.map((item) => (
                    <NewsCard elevation={3} key={item.id} onClick={() => setSelectedNews(item)}>
                        <NewsImage src={item.image} alt={item.title} />
                        <NewsContent>
                            <NewsHeader>
                                <StyledBadge>{item.category}</StyledBadge>
                                <ActionButtons>
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toggleBookmark(item.id)
                                        }}
                                    >
                                        <Bookmark
                                            sx={{ fontSize: 20, color: "#356DF1" }}
                                            fill={
                                                bookmarkedNews.has(item.id)
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                        />
                                    </IconButton>
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleShare(item)
                                        }}
                                    >
                                        <Share sx={{ fontSize: 20, color: "#356DF1" }} />
                                    </IconButton>
                                </ActionButtons>
                            </NewsHeader>
                            <NewsTitle>{item.title}</NewsTitle>
                            <NewsDate>{item.date}</NewsDate>
                            <NewsExcerpt>{item.content}</NewsExcerpt>
                            <ReadMoreButton>Read More →</ReadMoreButton>
                        </NewsContent>
                    </NewsCard>
                ))}

                <div ref={observerTarget}>
                    <LoadingIndicator>
                        {loading && "Loading more news..."}
                        {!hasMore && "No more news to load"}
                    </LoadingIndicator>
                </div>
            </ContentWrapper>
        </Container>
    )
}
