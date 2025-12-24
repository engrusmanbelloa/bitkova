"use client"

import { useState, useEffect, useMemo } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import styled from "styled-components"
import NewsCard from "@/components/insights/NewsCard"
import ArticleModal from "@/components/insights/ArticleModal"
import { DUMMY_NEWS, NewsArticle, NewsCategory } from "@/types/news"
import CircularProgress from "@mui/material/CircularProgress"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { mobile, ipad } from "@/responsive"

const FeedContainer = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    box-sizing: border-box;
    margin: 0 auto 40px;
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
        `,
    )};
    ${mobile(
        (props: any) => `
            width: ${props.theme.widths.mobileWidth};
        `,
    )};
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
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([])
    const [displayedArticles, setDisplayedArticles] = useState<NewsArticle[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

    const itemsPerPage = 3

    // 1. Handle Deep Linking: Check URL for ?id=... on initial load
    useEffect(() => {
        const articleId = searchParams.get("id")
        if (articleId) {
            // We search the entire DUMMY_NEWS, not just displayedArticles
            // so it works even if the user hasn't scrolled down yet
            const article = DUMMY_NEWS.find((a) => a.id === articleId)
            if (article) {
                setSelectedArticle(article)
                document.body.style.overflow = "hidden"
            }
        } else {
            setSelectedArticle(null)
            document.body.style.overflow = "auto"
        }
    }, [searchParams])

    // 2. Filter logic based on Tabs
    useEffect(() => {
        let filtered = DUMMY_NEWS
        if (filterCategory !== "All") {
            filtered = DUMMY_NEWS.filter((article) => {
                const cats = Array.isArray(article.category) ? article.category : [article.category]
                return cats.includes(filterCategory)
            })
        }
        setFilteredArticles(filtered)
        setDisplayedArticles(filtered.slice(0, itemsPerPage))
        setHasMore(filtered.length > itemsPerPage)
    }, [filterCategory])

    // 3. Infinite Scroll logic
    const fetchMoreData = () => {
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

    // 4. Update URL when opening modal
    const handleReadMore = (article: NewsArticle) => {
        // This updates the URL to ?id=123 without reloading the page
        const params = new URLSearchParams(searchParams)
        params.set("id", article.id)
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    // 5. Update URL when closing modal
    const handleCloseModal = () => {
        router.push(pathname, { scroll: false })
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
