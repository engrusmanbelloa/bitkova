"use client"
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    margin: 40px 0;
`
const Title = styled.h2`
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 20px;
    color: ${(props) => props.theme.palette.common.back};
`
const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`
const Tag = styled.div`
    padding: 10px 18px;
    background: ${(props) => props.theme.palette.common.white};
    border: 1px solid ${(props) => props.theme.mobile.horizontalrule};
    border-radius: 8px;
    font-size: 18px;
    color: ${(props) => props.theme.palette.common.back};
    font-weight: 400;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
        background: ${(props) => props.theme.mobile.mobileNavBg};
    }
`

const categories = [
    "Crypto Trading",
    "Forex Trading",
    "Graphic Design",
    "UI/UX",
    "Certificate in Basic Blockchain",
    "Diploma in Graphic Design",
    "Programming for Beginners",
    "Advanced Web Development",
    "Digital Marketing",
    "Data Science",
    "Cybersecurity Fundamentals",
    "Project Management",
    "Artificial Intelligence",
    "Cloud Computing",
    "Mobile App Development",
    "Entrepreneurship",
    "Financial Analysis",
    "Photography Basics",
    "Video Editing",
    "Social Media Marketing",
]

export default function ExploreCourses() {
    return (
        <Wrapper>
            <Title>Explore Courses</Title>
            <TagsContainer>
                {categories.map((cat, i) => (
                    <Tag key={i}>{cat}</Tag>
                ))}
            </TagsContainer>
        </Wrapper>
    )
}
