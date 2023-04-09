import * as React from 'react'
import styled from "styled-components"
import Card from '@mui/material/Card'
import Newsletter from "../../components/Newsletter"
import { mobile, ipad } from "../../responsive"
import Iframe from 'react-iframe'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Rating from '@mui/material/Rating'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import CoursesList from '../../components/CoursesList'
import {featuredCoures} from "../../data"
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getProviders, useSession, signIn, signOut, getCsrfToken, getSession } from "next-auth/react"
import Link from 'next/link'

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px 0px 10px 0px;
  margin-bottom: 20px;
  display: flex;
  border-top: 1px solid #CDDEFF;
  border-bottom: 1px solid #CDDEFF;
  ${ipad({ padding: "10px", flexDirection:"column" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 10px;
  margin-top: 30px;
  text-align: justify;
  animation: pulse;
  animation-duration: 2s;
  ${ipad({ marginTop: 5,})}
`;

const Box = styled.div`
  margin: 0 0 20px;
  width: 70%;
  height: 90vh;
  ${ipad({ height: "100%", width: "98%", margin: "20px auto"})}
`;
const CheckoutBox = styled.div`
  margin: 0 0 0 10px;
  width: 25%;
  position: absolute;
  top: 530px;
  right: 70px;
  ${ipad({ position: "relative", top: "10px", right: "0", width: "100%", margin: "auto",})}
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  border-bottom: 1px solid #CDDEFF;
`;

const Desc = styled.p`
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 2px;
  line-height: 1.5;
  ${ipad({ fontSize: 18, margin: "5px 0"})}
  ${mobile({ fontSize: 16, fontWeight: 400, textAlign: "left", textAlign: "justify"})}
`;

const Button = styled.button`
  height: 50px;
  width: 200px;
  margin: auto;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: rgba(28, 56, 121, 1);
  color: #fff;

  &:hover {
    background-color: #CDDEFF;
    color: rgba(28, 56, 121, 1);
  }
  ${ipad({ height: 40, width: 150, fontSize: 18, fontWeight: 400, margin: "5px 0",})}
  ${mobile({width: "100%"})}
`;

const Title = styled.h1`
  margin: 0;
  ${'' /* text-align: left; */}
  ${ipad({ fontSize: 20, fontWeight: 500,})}
`;

const Paragraph = styled.p`
  margin: 15px;
  text-align: left;
  font-size: 25px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 1.5;
  ${ipad({ fontSize: 20, fontWeight: 300, margin: 5})}
  ${mobile({})}
`;

const Learn = styled.ul`
  list-style: square;
  ${ipad({ fontSize: 20, fontWeight: 300, margin: "5px"})}
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const LearnItem = styled.li`
  font-size: 25px;
  font-weight: 400;
  text-align: left;
  margin: 25px;
  ${ipad({ fontSize: 20, fontWeight: 300, margin: 15})}
  ${mobile({ marginLeft: 0 })}
`;

const Duration = styled.div`
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin: 20px;
  font-size: 25px;
  font-weight: 500;
  ${ipad({fontWeight: 500,})}
  ${mobile({fontWeight: 350,})}
`;

const SetUpdate = styled.div`
  font-size: 18px;
  margin: 10px auto;
  font-weight: 400;
  color: #fff;
  width: 10%;
  padding: 10px;
  border-radius: 5px;
  border: 0.5px solid;
  box-shadow: 5px 5px #CDDEFF;
  text-align: center;
  background: rgba(28, 56, 121, 1);
  ${ipad({width: "80%"})}
  ${mobile({})}
`;

const LessonContainer = styled.div`

`;

const LessonsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  border-bottom: 1px solid #CDDEFF;
`;

const PdfLink = styled.div``;

const VideoContainer = styled.div`
  
`;

const VideoPlayer = styled.a`
  font-size: 20px;
  font-weight: 500;
  &:link{color: red}
  &:link{color: red}
`;

const SingleCourse = () => {
  const router = useRouter()
  const { id } = router.query
  const [value, setValue] = React.useState(0)
  const [course, setCourse] = useState()
  const [success, setSuccess] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  // const [isCoursePurchased, setIsCoursePurchased] = useState(false)
  // const [purchasedCourses, setPurchasedCourses] = useState([])
  const { data: session, status } = useSession()

  console.log("the course id", id)

  // const id = router.query.id
  console.log("the session is", session)

  // fetch the course click by the user based on the course id
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        await fetch(`/api/courses/${id}`, {
          method: "GET",
        }).then(async (res) => {
          if (res.ok ){
            setSuccess(true)
            const data = await res.json()
            setCourse(data)
            console.log("course data is: ", course)
          } else {
            setSuccess(false)
            setError("course course not available")
          }
        })
      } catch (error) {
        setError("could not fect the course")
        console.log(error)
      }
    }
    if (id) {
      fetchCourse()
    } else {
      return
    }
  }, [id])

  useEffect(() =>{
    setIsLoading(true);
    if (!session) {
      if (status === "loading") {
        return 
      }
      setIsLoading(false)
      router.push("/login")
    } else if (session.user.phone === undefined || session.user.phone === null){
      setUpdate(true)
      setTimeout(() => {
        router.push("/profile-update");
      }, 3000)
    } else {
      setIsLoading(false); // Session is loaded
    }
  },[session, status])

  if (isLoading || !course) {
    return <SetUpdate>Loading....</SetUpdate>
  }

  if (update) {
    return <SetUpdate>Please complete your profile setup</SetUpdate>
  }

  const lessons = course?.lessons // add a null check using the ? operator
  const introUrl = lessons && lessons[0]?.videos[0]?.link // add null checks using the ? operator
  const lessonPdfs = lessons && lessons[1]?.pdfs
  console.log("lessons: ", lessons)

  let pdfCount = 0

  lessons.forEach((lesson) => {
    if (lesson.pdfs) {
      pdfCount += lesson.pdfs.length
    }
  })

  console.log(`Number of PDF links: ${pdfCount}`)

  let videosCount = 0

  lessons.forEach((lesson) => {
    if (lesson.videos) {
      videosCount += lesson.videos.length
    }
  })

  console.log(`Number of video links: ${videosCount}`)
  let purchasedCourses = []
  purchasedCourses = session.user.enrolledCourses
  console.log("array of registered courses: ", purchasedCourses)

  const isCoursePurchased = purchasedCourses.includes(id)

  return (
    <Container>
      <Wrapper> 
      <InfoContainer>
          <Title>{course.title}</Title>
          <Desc>{course.about}</Desc>
          <Button>ENROLL</Button>
        </InfoContainer>
        <Card variant="elevation" elevation={20} sx={{mb: 2, ml: 2, mt: 0, width: 1000, height: 350, borderRadius: 7, position: "relative",
          '@media screen and (max-width: 768px)': {
            ml: 1, width: 720,
          },
          '@media screen and (max-width: 600px)': {
            width: "100%", height: 250, margin: 0, padding : 0,
          },
        }}>
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/viKC9knLQUw" allow="accelerometer; 
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen>
        </iframe>
        {/* <Iframe  url={introUrl} width="100%" height="100%" display="block" position="relative" margin="auto"top="0" bottom="0" /> */}
        </Card>
        </Wrapper>
        <Box>
        <Card variant="elevation" elevation={20} sx={{borderRadius: 3, textAlign: "center",}}>
          <Tabs>
            <TabList style={{background: "#1C3879", color: "#fff", border: "none"}}>
              <Tab><Title>About the course</Title></Tab>
              <Tab><Title>Course content</Title></Tab>
              {!isCoursePurchased ? <Tab><Title>Review</Title></Tab>: null}
              {!isCoursePurchased ? <Tab><Title>lessons</Title></Tab>: null}
            </TabList>
            <TabPanel>
              <Title style={{textAlign: "left", margin: 5}}>About the course</Title>
              <Paragraph>{course.about}</Paragraph>
              <Title style={{textAlign: "left", marginLeft: 5, marginBottom: 20, marginTop: 40}}>What you will learn: </Title>
              <Learn>
                {course.whatYoullLearn.map((item, index) => (
                  <LearnItem key={index}>{item}</LearnItem>
                ))}
              </Learn>
            </TabPanel>
            <TabPanel>
            <Title style={{textAlign: "left", marginLeft: 5}}>Course outline</Title>
              <Learn style={{display: "flex", flexWrap:"wrap"}}>
                {course.courseContent.map((item, index) => (
                  <LearnItem key={index}>{item}</LearnItem>
                ))}
              </Learn>
            </TabPanel>
            {!isCoursePurchased ? 
            <TabPanel>
              <Title style={{textAlign: "left", marginLeft: 5}}>Course reviews</Title>
              <ReviewBox>
              {course.reviews.map((review, index) => (
                <div key={index}>
                  <Rating name="read-only" value={review.rating} readOnly />
                  <Title  style={{fontSize: 25}}>{review.name}</Title>
                  <Paragraph>{review.comment}</Paragraph>
                </div>
                ))}
              </ReviewBox>
            </TabPanel>
            : null}

            {!isCoursePurchased ? 
            <TabPanel>
              <Title style={{textAlign: "left", marginLeft: 5}}>lessons</Title>
              <LessonsBox>
              {lessons.map((lesson, index) => (
                <LessonContainer key={index}>
                  <Title>{lesson.title}</Title>
                  {/* {lesson.pdfs?.map((pdf, index) => (
                    <PdfLink href={pdf.link} target="_blank" key={index}>
                      {pdf.title}
                    </PdfLink>
                  ))} */}
                  {lesson.videos?.map((video, index) => (
                    <VideoContainer key={index}>
                      <VideoPlayer href={video.link}>{video.title}</VideoPlayer>
                    </VideoContainer>
                  ))}
                </LessonContainer>
              ))}
              </LessonsBox>
            </TabPanel>
            : null}
          </Tabs>
        </Card>
        <CheckoutBox>
          <Card variant="elevation" elevation={20} sx={{borderRadius: 3, textAlign: "center", width:"100%",}}>
            <Button style={{width: "100%",}}>INSIDE THE COURSE</Button>
            <Duration>
              <AccessTimeFilledIcon style={{margin: "10px", fontSize: 50, color: "#1C3879"}}/>
              <span style={{margin: "10px"}}>
                {
                  course.duration.hours > 0
                  ? `${course.duration.hours} hours ${course.duration.minutes} mins`
                  : `${course.duration.minutes} mins`
                }
              </span>
            </Duration>
            <Duration>
              <OndemandVideoIcon style={{margin: "10px", fontSize: 50, color: "#1C3879"}}/>
              <span style={{margin: "10px"}}>Ondemand videos: {videosCount}</span>
            </Duration>
            <Duration>
              <CloudDownloadIcon style={{margin: "10px", fontSize: 50, color: "#1C3879"}}/>
              <span style={{margin: "10px"}}>Downloadable files: {pdfCount}</span>
            </Duration>
            <Duration>
              <PowerSettingsNewIcon style={{margin: "10px", fontSize: 50, color: "#1C3879"}}/>
              <span style={{margin: "10px"}}>Lifetime Access</span>
            </Duration>
            <Duration>
              <WorkspacePremiumIcon style={{margin: "10px", fontSize: 50, color: "#1C3879"}}/>
              <span style={{margin: "10px"}}>Certificate Of Completion</span>
            </Duration>
            <Duration>
              <ImportantDevicesIcon style={{margin: "10px", fontSize: 50, color: "#1C3879"}}/>
              <span style={{margin: "10px"}}>Accessable on all devices</span>
            </Duration>
            <Button style={{width: "100%"}}>Enroll</Button>
          </Card>
        </CheckoutBox>
      </Box>
      <CoursesList title="Related courses"/>
      <Newsletter />
    </Container>
  )
}

export default SingleCourse