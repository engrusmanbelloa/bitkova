"use client"
import styled from "styled-components"
import { useRouter } from "next/navigation"
import { mobile, ipad } from "@/responsive"
import { useFetchActiveCohort } from "@/hooks/classes/useFetchCohorts"

const Section = styled.section`
    margin: 0 auto;
    padding: 0px;
    width: ${(props) => props.theme.widths.heroWidth};
    ${ipad((props: any) => `width: ${props.theme.widths.ipadWidth};`)}
    ${mobile((props: any) => `width: ${props.theme.widths.mobileWidth};`)}
`
const Label = styled.p`
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${(props) => props.theme.mobile.gray};
    margin: 0 0 6px;
`
const Title = styled.h2`
    text-align: center;
    margin: 0 0 32px;
    color: ${(props) => props.theme.palette.common.black};
`
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    ${ipad((props: any) => `grid-template-columns: repeat(2, 1fr); gap: 12px;`)}
    ${mobile((props: any) => `grid-template-columns: 1fr;`)}
`
const Card = styled.div<{ $accent?: boolean }>`
    background: ${(props) => props.theme.palette.common.white};
    border: ${(props) =>
        props.$accent
            ? `2px solid ${props.theme.palette.primary.main}`
            : `1px solid ${props.theme.mobile.horizontalrule}`};
    border-radius: 12px;
    padding: 24px 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    cursor: pointer;
    transition:
        transform 0.18s,
        box-shadow 0.18s;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.09);
    }
`
const EnrollingBadge = styled.span`
    position: absolute;
    top: -11px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 11px;
    font-weight: 700;
    padding: 3px 12px;
    border-radius: 20px;
    background: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.common.white};
    white-space: nowrap;
`
const IconWrap = styled.div<{ $bg: string }>`
    width: 90px;
    height: 90px;
    border-radius: 50px;
    background: ${(props) => props.$bg};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
`
const CardTitle = styled.h3`
    margin: 0;
    color: ${(props) => props.theme.palette.common.black};
`
const CardDesc = styled.p`
    color: ${(props) => props.theme.palette.common.black};
    margin: 0;
    flex: 1;
`
const TagRow = styled.div`
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
`
const Tag = styled.span<{ $bg: string; $color: string }>`
    font-size: 11px;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 20px;
    background: ${(props) => props.$bg};
    color: ${(props) => props.$color};
`
const ActionBtn = styled.button<{ $bg: string; $color: string }>`
    margin-top: 6px;
    width: 100%;
    padding: 10px 0;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    background: ${(props) => props.$bg};
    color: ${(props) => props.$color};
    transition: opacity 0.15s;

    &:hover {
        opacity: 0.85;
    }
`

export default function LearningPaths() {
    const router = useRouter()
    const { data: activeCohort } = useFetchActiveCohort()

    const paths = [
        {
            icon: "💻",
            iconBg: "#e8f4fd",
            title: "Online Courses",
            desc: "Self-paced video lessons. Learn anytime, anywhere at your own speed with lifetime access.",
            tags: [
                { label: "Self-paced", bg: "#e8f4fd", color: "#1565c0" },
                { label: "Certificate", bg: "#f3f4f6", color: "#555" },
            ],
            btnLabel: "Browse courses →",
            btnBg: "#e8f4fd",
            btnColor: "#1565c0",
            href: "/courses",
            accent: false,
        },
        {
            icon: "📍",
            iconBg: "#e8fdf4",
            title: "Physical Classes",
            desc: "Attend in-person at our hubs across northern Nigeria. Structured, hands-on learning with instructors.",
            tags: [
                { label: "In-person", bg: "#e8fdf4", color: "#00796b" },
                { label: "Certificate", bg: "#f3f4f6", color: "#555" },
            ],
            btnLabel: "See locations →",
            btnBg: "#e8fdf4",
            btnColor: "#00796b",
            href: "/our-hub#physical-classes",
            accent: true,
            badge: activeCohort ? `Now enrolling · ${activeCohort.name}` : "Now enrolling",
        },
        {
            icon: "✈️",
            iconBg: "#e8f8ff",
            title: "Telegram Classes",
            desc: "Live instructor-led sessions on Telegram. Flexible and interactive from anywhere.",
            tags: [
                { label: "Live sessions", bg: "#e8f8ff", color: "#0088cc" },
                { label: "Certificate", bg: "#f3f4f6", color: "#555" },
            ],
            btnLabel: "Join class →",
            btnBg: "#e8f8ff",
            btnColor: "#0088cc",
            href: "/our-hub#telegram-class",
            accent: false,
        },
    ]

    return (
        <Section>
            <Label>How do you want to learn?</Label>
            <Title>Choose your learning path</Title>
            <Grid>
                {paths.map((path) => (
                    <Card
                        key={path.title}
                        $accent={path.accent}
                        onClick={() => router.push(path.href)}
                    >
                        {path.accent && path.badge && <EnrollingBadge>{path.badge}</EnrollingBadge>}
                        <IconWrap $bg={path.iconBg}>{path.icon}</IconWrap>
                        <CardTitle>{path.title}</CardTitle>
                        <CardDesc>{path.desc}</CardDesc>
                        <TagRow>
                            {path.tags.map((tag) => (
                                <Tag key={tag.label} $bg={tag.bg} $color={tag.color}>
                                    {tag.label}
                                </Tag>
                            ))}
                        </TagRow>
                        <ActionBtn $bg={path.btnBg} $color={path.btnColor}>
                            {path.btnLabel}
                        </ActionBtn>
                    </Card>
                ))}
            </Grid>
        </Section>
    )
}
