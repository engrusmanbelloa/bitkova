import styled, { keyframes } from "styled-components"
import "animate.css/animate.min.css"
import CoursesList from "../components/CoursesList"
import Link from "next/link"
import { mobile, ipad } from "../responsive"
import Intro from "../components/intro"
import Testimonals from "../components/Testimonals"
import Newsletter from "../components/Newsletter"

const Container = styled.section`
    border-top: 1px solid #cddeff;
`

const Wrapper = styled.section`
    display: flex;
    height: 70vh;
    margin: 20px 0px 0px 20px;
    align-items: center;
    font-weight: 400;
    justify-content: center;
    letter-spacing: 1px;
    ${ipad({ display: "block", height: "100%", margin: "0" })}
    ${mobile({})}
`

const ImageContainer = styled.div`
    flex: 1.3;
    margin: 0 auto;
    padding: 0;
`

const Image = styled.img`
    width: 120vh;
    height: 60vh;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({ width: "110vh" })}
    ${mobile({ display: "none" })}
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 15px;
    text-align: justify;
    animation: pulse;
    animation-duration: 2s;
    ${ipad({ textAlign: "justify" })}
`

const Title = styled.h1`
    font-size: 35px;
`

const Desc = styled.p`
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 2px;
    line-height: 1.5;
`

const Button = styled.button`
    padding: 10px;
    height: 50px;
    font-size: 20px;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: rgba(28, 56, 121, 1);
    color: #fff;

    &:hover {
        background-color: #cddeff;
        color: rgba(28, 56, 121, 1);
    }
`

const Courses = (href) => {
    return (
        <Container>
            <Wrapper>
                <InfoContainer>
                    <Title>Courses</Title>
                    <Desc>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra tristique
                        consectetur adipiscing elit. Viverra tristique laoreet ut elementum cras
                        cursuslaoreet ut elementum cras consectetur adipiscing elit. Viverra
                        tristique laoreet ut elementum cras cursus cursus consectetur adipiscing
                        elit. Viverra tristique laoreet ut elementum cras cursus. Viverra tristique
                        laoreet ut elementum cras cursus Morbi morbi at diam.
                    </Desc>
                    <Link href="#courses" passHref legacyBehavior>
                        <Button>View courses</Button>
                    </Link>
                </InfoContainer>
                <ImageContainer>
                    <Image src="/chd.jpg" alt="Picture of the author" />
                </ImageContainer>
            </Wrapper>
            <div id="courses">
                <CoursesList title="Latest courses" />
            </div>
            <Testimonals />
            <Newsletter />
        </Container>
    )
}

export default Courses
