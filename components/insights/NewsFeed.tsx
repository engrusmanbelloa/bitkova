"use client"

import { useState, useEffect, useMemo } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import styled from "styled-components"
import NewsCard from "@/components/insights/NewsCard"
import ArticleModal from "@/components/insights/ArticleModal"
import { DUMMY_NEWS, NewsArticle, NewsCategory } from "@/types/news"
import CircularProgress from "@mui/material/CircularProgress"

const FeedContainer = styled.div`
    margin-bottom: 40px;
`
const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
`
interface NewsFeedProps {
    filterCategory: "All" | NewsCategory
}

export default function NewsFeed({ filterCategory }: NewsFeedProps) {
    const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([])
    const [displayedArticles, setDisplayedArticles] = useState<NewsArticle[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

    const itemsPerPage = 3

    // 1. Filter the full dataset based on the selected tab
    useEffect(() => {
        let filtered = DUMMY_NEWS
        if (filterCategory !== "All") {
            filtered = DUMMY_NEWS.filter((article) => {
                if (Array.isArray(article.category)) {
                    return article.category.includes(filterCategory)
                }
                return article.category === filterCategory
            })
        }
        setFilteredArticles(filtered)
        // Reset display on tab change
        setDisplayedArticles(filtered.slice(0, itemsPerPage))
        setHasMore(filtered.length > itemsPerPage)
    }, [filterCategory])

    // 2. Infinite Scroll loader function
    const fetchMoreData = () => {
        // Simulate network delay
        setTimeout(() => {
            const currentLength = displayedArticles.length
            const nextSlice = filteredArticles.slice(currentLength, currentLength + itemsPerPage)

            if (nextSlice.length === 0) {
                setHasMore(false)
                return
            }

            setDisplayedArticles((prev) => [...prev, ...nextSlice])

            if (currentLength + nextSlice.length >= filteredArticles.length) {
                setHasMore(false)
            }
        }, 800)
    }

    const handleReadMore = (article: NewsArticle) => {
        setSelectedArticle(article)
        // Prevent background scrolling when modal is open
        document.body.style.overflow = "hidden"
    }

    const handleCloseModal = () => {
        setSelectedArticle(null)
        document.body.style.overflow = "auto"
    }

    return (
        <FeedContainer>
            <InfiniteScroll
                dataLength={displayedArticles.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                    <LoaderContainer>
                        <CircularProgress size={30} />
                    </LoaderContainer>
                }
                endMessage={
                    <p style={{ textAlign: "center", color: "#888" }}>
                        <b>You have seen all the news for now.</b>
                    </p>
                }
            >
                {displayedArticles.map((article) => (
                    <NewsCard
                        key={article.id}
                        article={article}
                        onReadMore={() => handleReadMore(article)}
                    />
                ))}
            </InfiniteScroll>

            {/* Modal Overlay */}
            {selectedArticle && (
                <ArticleModal article={selectedArticle} onClose={handleCloseModal} />
            )}
        </FeedContainer>
    )
}
