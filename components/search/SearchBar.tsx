"use client"
import { useRef, useEffect } from "react"
import styled, { keyframes, css } from "styled-components"
import { useRouter } from "next/navigation"
import SearchIcon from "@mui/icons-material/Search"
import SchoolIcon from "@mui/icons-material/School"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import TelegramIcon from "@mui/icons-material/Telegram"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { useSearch, SearchResult } from "@/hooks/search/useSearch"
import { mobile } from "@/responsive"

// Animations
const fadeSlide = keyframes`
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
`
// Wrapper
const Wrap = styled.div`
    position: relative;
    flex: 0.8;
`
// Input row
const InputRow = styled.div<{ $focused: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    height: 36px;
    padding: 0 12px;
    border-radius: 20px;
    border: 1.5px solid
        ${(props) =>
            props.$focused ? props.theme.palette.primary.main : props.theme.mobile.offWhite};
    background: ${(props) => props.theme.palette.common.white};
    transition:
        border-color 0.2s,
        box-shadow 0.2s;
    box-shadow: ${(props) =>
        props.$focused ? `0 0 0 3px ${props.theme.palette.primary.main}22` : "none"};

    svg {
        color: ${(props) => props.theme.mobile.gray};
        font-size: 18px;
        flex-shrink: 0;
    }
    ${mobile({ height: "30px", padding: "0 8px", gap: "6px" })}
`
const Input = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 13px;
    color: ${(props) => props.theme.palette.common.black};
    &::placeholder {
        color: ${(props) => props.theme.mobile.gray};
    }
    ${mobile({ width: "100%", fontSize: 12 })}
`
const Kbd = styled.span`
    font-size: 10px;
    font-weight: 600;
    color: ${(props) => props.theme.mobile.gray};
    background: ${(props) => props.theme.palette.action.hover};
    border: 1px solid ${(props) => props.theme.mobile.offWhite};
    border-radius: 4px;
    padding: 1px 5px;
    white-space: nowrap;
    font-family: monospace;
    ${mobile({ display: "none" })}
`
// Dropdown
const Dropdown = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    background: ${(props) => props.theme.palette.common.white};
    border: 1px solid ${(props) => props.theme.mobile.offWhite};
    border-radius: 14px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    z-index: 999;
    animation: ${fadeSlide} 0.18s ease both;
    min-width: 360px;
    ${mobile({ right: "100%", minWidth: "260px" })}
`
const SectionLabel = styled.div`
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${(props) => props.theme.palette.text?.secondary ?? "#aaa"};
    padding: 10px 14px 4px;
`
const ResultItem = styled.div<{ $highlighted: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    cursor: pointer;
    background: ${(props) =>
        props.$highlighted ? (props.theme.palette.action?.hover ?? "#f5f5f5") : "transparent"};
    transition: background 0.12s;

    &:hover {
        background: ${(props) => props.theme.palette.action?.hover ?? "#f5f5f5"};
    }
`
const TypeIcon = styled.div<{ $type: string }>`
    width: 34px;
    height: 34px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${(props) =>
        props.$type === "course"
            ? "#e8f4fd"
            : props.$type === "physical_class"
              ? "#e8f0fe"
              : "#e8fdf4"};
    color: ${(props) =>
        props.$type === "course"
            ? "#1565c0"
            : props.$type === "physical_class"
              ? "#3949ab"
              : "#00796b"};
    svg {
        font-size: 16px;
    }
`
const ResultText = styled.div`
    flex: 1;
    min-width: 0;
`
const ResultTitle = styled.div`
    font-size: 13px;
    font-weight: 600;
    color: ${(props) => props.theme.palette.common.black};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const ResultSub = styled.div`
    font-size: 11px;
    color: ${(props) => props.theme.palette.text?.secondary ?? "#888"};
    margin-top: 1px;
`
const ResultPrice = styled.div`
    font-size: 12px;
    font-weight: 700;
    color: ${(props) => props.theme.palette.primary?.main ?? "#1565c0"};
    white-space: nowrap;
`
const Hr = styled.div`
    height: 1px;
    background: ${(props) => props.theme.palette.divider ?? "#eee"};
    margin: 4px 0;
`
const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-top: 1px solid ${(props) => props.theme.palette.divider ?? "#eee"};
    background: ${(props) => props.theme.palette.action?.hover ?? "#fafafa"};
`
const FooterHint = styled.span`
    font-size: 11px;
    color: ${(props) => props.theme.palette.text?.secondary ?? "#aaa"};
`
const SeeAll = styled.button`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 700;
    color: ${(props) => props.theme.palette.primary?.main ?? "#1565c0"};
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    svg {
        font-size: 14px;
    }
    &:hover {
        text-decoration: underline;
    }
`
const Empty = styled.div`
    padding: 24px 14px;
    text-align: center;
    font-size: 13px;
    color: ${(props) => props.theme.palette.text?.secondary ?? "#aaa"};
`

// Icon helper
function TypeIconEl({ type }: { type: string }) {
    return (
        <TypeIcon $type={type}>
            {type === "course" ? (
                <SchoolIcon />
            ) : type === "physical_class" ? (
                <LocationOnIcon />
            ) : (
                <TelegramIcon />
            )}
        </TypeIcon>
    )
}

// Highlight matched text
function Highlight({ text, query }: { text: string; query: string }) {
    if (!query) return <>{text}</>
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return <>{text}</>
    return (
        <>
            {text.slice(0, idx)}
            <mark style={{ background: "#fff3cd", borderRadius: 2, padding: "0 1px" }}>
                {text.slice(idx, idx + query.length)}
            </mark>
            {text.slice(idx + query.length)}
        </>
    )
}

export default function SearchBar() {
    const router = useRouter()
    const wrapRef = useRef<HTMLDivElement>(null)
    const { query, setQuery, results, isOpen, setIsOpen, inputRef, hasQuery } = useSearch()

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [setIsOpen])

    const handleSelect = (item: SearchResult) => {
        setIsOpen(false)
        setQuery("")
        router.push(item.href)
    }

    const handleSeeAll = () => {
        if (!query.trim()) return
        setIsOpen(false)
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && query.trim()) handleSeeAll()
    }

    // Group by type
    const courses = results.filter((r) => r.type === "course")
    const classes = results.filter((r) => r.type !== "course")

    const showDropdown = isOpen && hasQuery

    return (
        <Wrap ref={wrapRef}>
            <InputRow $focused={isOpen}>
                <SearchIcon />
                <Input
                    ref={inputRef}
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setIsOpen(true)
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                />
                {!isOpen && <Kbd>⌘K</Kbd>}
            </InputRow>

            {showDropdown && (
                <Dropdown>
                    {results.length === 0 ? (
                        <Empty>No results for "{query}"</Empty>
                    ) : (
                        <>
                            {courses.length > 0 && (
                                <>
                                    <SectionLabel>Courses</SectionLabel>
                                    {courses.map((item, i) => (
                                        <ResultItem
                                            key={item.id}
                                            $highlighted={false}
                                            onClick={() => handleSelect(item)}
                                        >
                                            <TypeIconEl type={item.type} />
                                            <ResultText>
                                                <ResultTitle>
                                                    <Highlight text={item.title} query={query} />
                                                </ResultTitle>
                                                <ResultSub>{item.subtitle}</ResultSub>
                                            </ResultText>
                                            {item.price !== undefined && (
                                                <ResultPrice>
                                                    {item.price === 0
                                                        ? "Free"
                                                        : `₦${item.price.toLocaleString()}`}
                                                </ResultPrice>
                                            )}
                                        </ResultItem>
                                    ))}
                                </>
                            )}

                            {courses.length > 0 && classes.length > 0 && <Hr />}

                            {classes.length > 0 && (
                                <>
                                    <SectionLabel>Classes</SectionLabel>
                                    {classes.map((item) => (
                                        <ResultItem
                                            key={item.id}
                                            $highlighted={false}
                                            onClick={() => handleSelect(item)}
                                        >
                                            <TypeIconEl type={item.type} />
                                            <ResultText>
                                                <ResultTitle>
                                                    <Highlight text={item.title} query={query} />
                                                </ResultTitle>
                                                <ResultSub>{item.subtitle}</ResultSub>
                                            </ResultText>
                                            {item.price !== undefined && (
                                                <ResultPrice>
                                                    {item.price === 0
                                                        ? "Free"
                                                        : `₦${item.price.toLocaleString()}`}
                                                </ResultPrice>
                                            )}
                                        </ResultItem>
                                    ))}
                                </>
                            )}
                        </>
                    )}

                    <Footer>
                        <FooterHint>
                            {results.length > 0
                                ? `${results.length} result${results.length > 1 ? "s" : ""}`
                                : "Try a different term"}
                        </FooterHint>
                        {results.length > 0 && (
                            <SeeAll onClick={handleSeeAll}>
                                See all results <ArrowForwardIcon />
                            </SeeAll>
                        )}
                    </Footer>
                </Dropdown>
            )}
        </Wrap>
    )
}
