import { useRouter } from "next/navigation"
import styled from "styled-components"
import Card from "@mui/material/Card"
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import PreviewIcon from "@mui/icons-material/Preview"
import CourseRating from "@/components/course/Review"
// import CourseRating from "@/components/course/CourseRating"
// import { formatPrice } from "@/utils/formatPrice"
import { formatPrice } from "@/config/FormatPrice"
import { CourseWithExtras } from "@/types"
import { mobile, ipad } from "@/responsive"
import "animate.css/animate.min.css"

const StyledCard = styled(Card)`
    margin: 0px;
    padding: 0;
    width: 300px;
    height: 490px;
    color: #fff;
    border-radius: 5px;
    animation: pulse;
    animation-duration: 2s;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }

    ${ipad({ margin: "0 auto", height: 470 })}
    ${mobile({ height: 450 })}
`
const CourseImg = styled.img`
    width: 100%;
    height: 170px;
`
const InfoContainer = styled.div`
    padding: 10px;
    height: 100%;
    color: ${(props) => props.theme.palette.common.black};
    text-align: start;
    background-color: ${(props) => props.theme.palette.common.white};
    border-radius: 3px;
    background-color: transparent;
`
const TitleSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 80px;
    ${ipad({ height: "70px" })}
    ${mobile({ height: "50px" })}
`
const Title = styled.h3`
    margin: 0px;
    text-align: start;
    ${mobile({
        fontSize: "18px",
    })}
`
const Price = styled.p`
    flex: 0.5;
    margin: 5px auto;
    font-weight: bold;
    white-space: nowrap;
`
const Desc = styled.p`
    margin: 10px 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`
const DurationContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 0;
    gap: 5px;
    flex-wrap: wrap;
`
const Time = styled.p`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 5px 0 0;
    padding: 0;
    font-size: 14px;
    ${ipad({ margin: "0 0px 0 0" })};
    ${mobile({})};
`
const Box = styled.div`
    margin: 5px auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
`
const BtnBox = styled.div`
    margin: 5px auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`
const PreviewContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
    background-color: ${(props) => props.theme.palette.primary.main};
    margin: 5px auto;
    ${ipad({ height: 35 })};
`
const PreviewBtn = styled.button<{ $priceBtn?: string }>`
    border: none;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
    font-size: ${(props) => (props.$priceBtn ? "16px" : "25px")};
    color: ${(props) => props.theme.palette.common.white};
    background-color: ${(props) => props.theme.palette.primary.main};
    &::first-letter {
        text-transform: uppercase;
    }
    &:hover {
        animation: pulse;
        animation-duration: 1s;
        background-color: ${(props) => props.theme.palette.action.hover};
        color: ${(props) => props.theme.palette.common.white};
    }
    ${ipad({ height: 35 })};
`
const WhishlistContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
    background-color: ${(props) => props.theme.palette.common.white};
    margin: 5px auto;
    ${ipad({ height: 35 })};
`
const WishlistBtn = styled.button<{ $priceBtn?: string }>`
    border: 1px;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
    font-size: 16px;
    color: ${(props) => props.theme.palette.primary.main};
    background-color: ${(props) => props.theme.palette.common.white};
    &::first-letter {
        text-transform: uppercase;
    }
    &:hover {
        animation: pulse;
        animation-duration: 1s;
        color: ${(props) => props.theme.palette.primary.main};
    }
    ${ipad({ height: 35 })};
`

interface CourseCardProps {
    course: CourseWithExtras
}

export default function CourseCard({ course }: CourseCardProps) {
    const router = useRouter()

    const handleCourseClick = () => {
        router.push(`/courses/${course.id}`)
    }

    return (
        <StyledCard variant="elevation" elevation={1}>
            <CourseImg src={course.image} alt={course.title} />
            <InfoContainer>
                <TitleSection>
                    <Title>{course.title}</Title>
                    <Price>{formatPrice(course.price)}</Price>
                </TitleSection>
                <Desc>{course.shortDesc}</Desc>
                <DurationContainer>
                    <Box>
                        <Time>
                            <OndemandVideoIcon sx={{ fontSize: 18 }} />
                            <span style={{ margin: "3px" }}>
                                {course.onDemandVideos > 0
                                    ? `${course.onDemandVideos} Videos`
                                    : "0 Videos"}
                            </span>
                        </Time>
                    </Box>
                    <Box>
                        <Time>
                            <PeopleAltIcon sx={{ fontSize: 18 }} />
                            <span style={{ margin: "3px" }}>{course.students} Students</span>
                        </Time>
                    </Box>
                    <Box>
                        <CourseRating courseId={course.id} />
                    </Box>
                </DurationContainer>
                <BtnBox>
                    <WhishlistContainer>
                        <FavoriteBorderIcon sx={{ color: "#356DF1" }} />
                        <WishlistBtn type="button" onClick={handleCourseClick}>
                            Wishlist
                        </WishlistBtn>
                    </WhishlistContainer>
                    <PreviewContainer>
                        <PreviewIcon sx={{ color: "white" }} />
                        <PreviewBtn $priceBtn="PriceBtn" type="button" onClick={handleCourseClick}>
                            Preview
                        </PreviewBtn>
                    </PreviewContainer>
                </BtnBox>
            </InfoContainer>
        </StyledCard>
    )
}
