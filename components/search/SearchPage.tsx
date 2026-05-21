// components/search/SearchPage.tsx
"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import SchoolIcon from "@mui/icons-material/School"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import TelegramIcon from "@mui/icons-material/Telegram"
import SearchIcon from "@mui/icons-material/Search"
import FilterListIcon from "@mui/icons-material/FilterList"
import { useSearch, SearchResult } from "@/hooks/search/useSearch"
import { mobile, ipad } from "@/responsive"

// Animations
const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
`
// Layout
const Page = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 0 80px;
    ${ipad((p: any) => `padding: 30px 20px 60px;`)}
    ${mobile((p: any) => `padding: 20px 16px 60px;`)}
`
const TopBar = styled.div`
    margin-bottom: 32px;
`
const SearchRow = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 20px;
    ${mobile((p: any) => `flex-direction: column; align-items: stretch;`)}
`
const InputWrap = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 48px;
    padding: 0 16px;
    border-radius: 12px;
    border: 1.5px solid ${(p) => p.theme.palette.primary?.main ?? "#1565c0"};
    background: ${(p) => p.theme.palette.common.white};
    box-shadow: 0 0 0 3px ${(p) => p.theme.palette.primary?.main ?? "#1565c0"}18;

    svg {
        color: ${(p) => p.theme.palette.primary?.main ?? "#1565c0"};
        font-size: 20px;
    }
`
const Input = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 15px;
    color: ${(p) => p.theme.palette.common.black};
    &::placeholder {
        color: ${(p) => p.theme.palette.text?.secondary ?? "#bbb"};
    }
`
// Filter chips
const FilterRow = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
`
const FilterLabel = styled.span`
    font-size: 12px;
    font-weight: 600;
    color: ${(p) => p.theme.palette.text?.secondary ?? "#888"};
    display: flex;
    align-items: center;
    gap: 4px;
    svg {
        font-size: 14px;
    }
`
const Chip = styled.button<{ $active: boolean }>`
    height: 30px;
    padding: 0 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    border: 1.5px solid
        ${(p) =>
            p.$active ? (p.theme.palette.primary?.main ?? "#1565c0") : p.theme.mobile.offWhite};
    background: ${(p) =>
        p.$active ? (p.theme.palette.primary?.main ?? "#1565c0") : "transparent"};
    color: ${(p) => (p.$active ? "#fff" : p.theme.palette.common.black)};

    &:hover {
        border-color: ${(p) => p.theme.palette.primary?.main ?? "#1565c0"};
        color: ${(p) => (p.$active ? "#fff" : (p.theme.palette.primary?.main ?? "#1565c0"))};
    }
`
// Meta
const Meta = styled.div`
    font-size: 13px;
    color: ${(p) => p.theme.palette.text?.secondary ?? "#888"};
    margin-bottom: 20px;

    strong {
        color: ${(p) => p.theme.palette.common.black};
        font-weight: 700;
    }
`
// Results grid
const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
`
const Card = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 18px;
    border-radius: 12px;
    background: ${(p) => p.theme.palette.common.white};
    border: 1px solid ${(p) => p.theme.palette.divider ?? "#eee"};
    cursor: pointer;
    transition:
        transform 0.15s,
        box-shadow 0.15s,
        border-color 0.15s;
    animation: ${fadeUp} 0.3s ease both;

    &:nth-child(1) {
        animation-delay: 0.03s;
    }
    &:nth-child(2) {
        animation-delay: 0.06s;
    }
    &:nth-child(3) {
        animation-delay: 0.09s;
    }
    &:nth-child(4) {
        animation-delay: 0.12s;
    }
    &:nth-child(5) {
        animation-delay: 0.15s;
    }

    &:hover {
        transform: translateX(4px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border-color: ${(p) => p.theme.palette.primary?.main ?? "#1565c0"}44;
    }

    ${mobile((p: any) => `flex-direction: column; align-items: flex-start;`)}
`
const IconWrap = styled.div<{ $type: string }>`
    width: 44px;
    height: 44px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${(p) =>
        p.$type === "course" ? "#e8f4fd" : p.$type === "physical_class" ? "#e8f0fe" : "#e8fdf4"};
    color: ${(p) =>
        p.$type === "course" ? "#1565c0" : p.$type === "physical_class" ? "#3949ab" : "#00796b"};
    svg {
        font-size: 20px;
    }
`
const CardImg = styled.img`
    width: 64px;
    height: 44px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
`
const CardBody = styled.div`
    flex: 1;
    min-width: 0;
`
const CardTitle = styled.h3`
    font-size: 15px;
    font-weight: 700;
    margin: 0 0 3px;
    color: ${(p) => p.theme.palette.common.black};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const CardSub = styled.p`
    font-size: 12px;
    color: ${(p) => p.theme.palette.text?.secondary ?? "#888"};
    margin: 0;
`
const CardRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    flex-shrink: 0;
    ${mobile((p: any) => `flex-direction: row; align-items: center; gap: 10px;`)}
`
const TypeBadge = styled.span<{ $type: string }>`
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 3px 8px;
    border-radius: 20px;
    background: ${(p) =>
        p.$type === "course" ? "#e8f4fd" : p.$type === "physical_class" ? "#e8f0fe" : "#e8fdf4"};
    color: ${(p) =>
        p.$type === "course" ? "#1565c0" : p.$type === "physical_class" ? "#3949ab" : "#00796b"};
`
const Price = styled.span`
    font-size: 13px;
    font-weight: 700;
    color: ${(p) => p.theme.palette.primary?.main ?? "#1565c0"};
`
// Empty
const Empty = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 20px;
    text-align: center;
`
const EmptyIcon = styled.div`
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: ${(p) => p.theme.palette.action?.hover ?? "#f5f5f5"};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    svg {
        font-size: 34px;
        color: ${(p) => p.theme.palette.text?.secondary ?? "#ccc"};
    }
`
const EmptyTitle = styled.h3`
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 8px;
    color: ${(p) => p.theme.palette.common.black};
`
const EmptyText = styled.p`
    font-size: 14px;
    color: ${(p) => p.theme.palette.text?.secondary ?? "#888"};
    max-width: 280px;
    margin: 0;
`

// Highlight
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

type FilterType = "all" | "course" | "physical_class" | "telegram_class"

const FILTERS: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "course", label: "Courses" },
    { key: "physical_class", label: "Physical Classes" },
    { key: "telegram_class", label: "Telegram Classes" },
]

export default function SearchPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const initialQ = searchParams.get("q") ?? ""

    const [localQ, setLocalQ] = useState(initialQ)
    const [filter, setFilter] = useState<FilterType>("all")

    const { query, setQuery, results, inputRef } = useSearch()

    // Sync URL param → search hook on mount
    useEffect(() => {
        setQuery(initialQ)
        setLocalQ(initialQ)
    }, [initialQ])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalQ(e.target.value)
        setQuery(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && localQ.trim()) {
            router.push(`/search?q=${encodeURIComponent(localQ.trim())}`)
        }
    }

    const filtered = filter === "all" ? results : results.filter((r) => r.type === filter)

    const typeLabel = (type: string) =>
        type === "course" ? "Course" : type === "physical_class" ? "Physical" : "Telegram"

    return (
        <Page>
            <TopBar>
                <SearchRow>
                    <InputWrap>
                        <SearchIcon />
                        <Input
                            ref={inputRef}
                            value={localQ}
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                            placeholder="Search courses and classes…"
                            autoFocus
                        />
                    </InputWrap>
                </SearchRow>

                <FilterRow>
                    <FilterLabel>
                        <FilterListIcon /> Filter:
                    </FilterLabel>
                    {FILTERS.map((f) => (
                        <Chip
                            key={f.key}
                            $active={filter === f.key}
                            onClick={() => setFilter(f.key)}
                        >
                            {f.label}
                        </Chip>
                    ))}
                </FilterRow>
            </TopBar>

            {localQ.trim().length >= 2 && (
                <Meta>
                    {filtered.length > 0 ? (
                        <>
                            <strong>{filtered.length}</strong> result
                            {filtered.length > 1 ? "s" : ""} for <strong>"{localQ}"</strong>
                        </>
                    ) : (
                        <>
                            No results for <strong>"{localQ}"</strong>
                        </>
                    )}
                </Meta>
            )}

            {localQ.trim().length < 2 ? (
                <Empty>
                    <EmptyIcon>
                        <SearchIcon />
                    </EmptyIcon>
                    <EmptyTitle>What are you looking for?</EmptyTitle>
                    <EmptyText>
                        Type at least 2 characters to start searching courses and classes.
                    </EmptyText>
                </Empty>
            ) : filtered.length === 0 ? (
                <Empty>
                    <EmptyIcon>
                        <SearchIcon />
                    </EmptyIcon>
                    <EmptyTitle>No results found</EmptyTitle>
                    <EmptyText>Try different keywords or remove filters.</EmptyText>
                </Empty>
            ) : (
                <Grid>
                    {filtered.map((item) => (
                        <Card key={item.id} onClick={() => router.push(item.href)}>
                            {item.image ? (
                                <CardImg src={item.image} alt={item.title} />
                            ) : (
                                <IconWrap $type={item.type}>
                                    {item.type === "course" ? (
                                        <SchoolIcon />
                                    ) : item.type === "physical_class" ? (
                                        <LocationOnIcon />
                                    ) : (
                                        <TelegramIcon />
                                    )}
                                </IconWrap>
                            )}
                            <CardBody>
                                <CardTitle>
                                    <Highlight text={item.title} query={localQ} />
                                </CardTitle>
                                <CardSub>{item.subtitle}</CardSub>
                            </CardBody>
                            <CardRight>
                                <TypeBadge $type={item.type}>{typeLabel(item.type)}</TypeBadge>
                                {item.price !== undefined && (
                                    <Price>
                                        {item.price === 0
                                            ? "Free"
                                            : `₦${item.price.toLocaleString()}`}
                                    </Price>
                                )}
                            </CardRight>
                        </Card>
                    ))}
                </Grid>
            )}
        </Page>
    )
}
