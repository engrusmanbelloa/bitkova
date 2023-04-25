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
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getProviders, useSession, signIn, signOut, getCsrfToken, getSession } from "next-auth/react"
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Paper from '@mui/material/Paper'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import useStore from "../../config/store"


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

const PdfLink = styled.a`
  font-size: 20px;
  font-weight: 500;
  &:link{color: #1c3879}
  &:visited{color: #1c3879}
  &:active{color: #CDDEFF}
`;

const VideoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: justify;
  margin: 10px;
`;

const VideoPlayer = styled.a`
  font-size: 20px;
  font-weight: 500;
  &:link{color: #1c3879}
  &:visited{color: #1c3879}
  &:active{color: #CDDEFF}
`;

const LessonBtn = styled.button`
  height: 30px;
  width: 80px;
  margin: 3px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #CDDEFF;
  color: ##1C3879;

  &:hover {
    background-color: #1C3879;
    color: #CDDEFF;
  }
  ${'' /* ${ipad({ height: 40, width: 150, fontSize: 18, fontWeight: 400, margin: "5px 0",})} */}
  ${'' /* ${mobile({width: "100%"})} */}
`;

const StyledCard = styled(Card)`
  margin: 10px 20px;
  padding:0; 
  position: relative;
  width: 50%;
  height: 350px; 
  color: #fff; 
  border-radius: 10px;
  ${ipad({marginLeft: 5, width: 720, height: 300})}
  ${mobile({ width: "100%", height: 250, margin: 0, padding : 0})}
`;

const LessonCard = styled(Card)`
  border-radius: 10px;
  text-align: center;
  ${'' /* ${ipad({marginLeft: 5, width: 720})}
  ${mobile({ width: "100%", height: 250, margin: 0, padding : 0})} */}
`;

const LessonInnerCard = styled(Card)`
  border-radius: 10px;
  text-align: center;
  margin: 3px;
  width: 100%;
  z-index: 99;
  ${'' /* ${ipad({marginLeft: 5, width: 720})}
  ${mobile({ width: "100%", height: 250, margin: 0, padding : 0})} */}
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
  const { data: session, status } = useSession()
  const [activeStep, setActiveStep] = useState(0)
  const { 
    serverState,
    enrolledCourses,
    cart,
    activeCourse,
    completedCourses,
    wishlist,
    ownCourses,
    points,
    lessonSteps,
    addToEnrolledCourses, 
    addToActiveCourse, 
    addToCompletedCourses, 
    addToWishlist, 
    addToOwnCourses, 
    addToCart,
    removeFromCart,
    clearCart
  } = useStore()

  const [courses, setCourses] = useState([])
  const [count, setCount] = useState(0)
  const [skip, setSkip] = useState(0)

  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch("/api/courses/getCourses")
      const data = await response.json()
      setCourses(data)
      setCount(data.count)
    }
    fetchCourses()
  }, [])
  const limit = 8

  // const [isCoursePurchased, setIsCoursePurchased] = useState(false)
  // const [purchasedCourses, setPurchasedCourses] = useState([])


  // const id = router.query.id

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
    serverState()
  }, [id])

  // making sure that the user is logedin and he's updated his account
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
  const price = course?.price
  const introUrl = lessons && lessons[0]?.videos[0]?.link // add null checks using the ? operator
  const lessonPdfs = lessons && lessons[1]?.pdfs

  let pdfCount = 0

  lessons.forEach((lesson) => {
    if (lesson.pdfs) {
      pdfCount += lesson.pdfs.length
    }
  })

  let videosCount = 0

  lessons.forEach((lesson) => {
    if (lesson.videos) {
      videosCount += lesson.videos.length
    }
  })

  // check if the course is purchased
  const isCoursePurchased = enrolledCourses.some(course => course.includes(String(id)))
  console.log(" the purchased courses: ", enrolledCourses)

  const handleEnroll = async () => {
    if (price > 0) {
      const existingCourse = cart.find((item) => item._id === course._id)
      if (existingCourse) {
        // Course already exists in the cart, do nothing
        return
      }else{
        addToCart(course)
      }
    } else {
      const response = await fetch(`/api/courses/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        addToEnrolledCourses(id)
        addToActiveCourse(id)
        // console.log(" the purchased courses: ", enrolledCourses)
      }  
    }
  }
  // Handle lessons 
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const handleCert = () => {
    setActiveStep(0)
  }

  console.log('isCoursePurchased: ', isCoursePurchased)

  return (
    <Container>
      <Wrapper> 
      <InfoContainer>
          <Title>{course.title}</Title>
          <Desc>{course.about}</Desc>
          {!isCoursePurchased ? <Button>ENROLL</Button> : null}
        </InfoContainer>
        <StyledCard variant="elevation" elevation={20}>
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/viKC9knLQUw" allow="accelerometer; 
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen>
        </iframe>
        {/* <Iframe  url={introUrl} width="100%" height="100%" display="block" position="relative" margin="auto"top="0" bottom="0" /> */}
        </StyledCard>
        </Wrapper>
        <Box>
        <LessonCard variant="elevation" elevation={20}>
          <Tabs>
            <TabList style={{background: "#1C3879", color: "#fff", border: "none"}}>
              {!isCoursePurchased ? <Tab style={{margin: "auto 15px",}}><Title>About</Title></Tab>: null}
              <Tab style={{margin: "auto 15px"}}><Title>Course content</Title></Tab>
              {!isCoursePurchased ? <Tab style={{margin: "auto 15px"}}><Title>Review</Title></Tab>: null}
              {isCoursePurchased ? <Tab style={{margin: "auto 15px"}}><Title>lessons</Title></Tab>: null}
              {isCoursePurchased ? <Tab style={{margin: "auto 15px"}}><Title>Resources</Title></Tab>: null}
            </TabList>

            {/* // about the course */}
            {!isCoursePurchased ? 
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
            : null}

            {/* // course outline */}
            <TabPanel>
            <Title style={{textAlign: "left", marginLeft: 5}}>Course outline</Title>
              <Learn style={{display: "flex", flexWrap:"wrap"}}>
                {course.courseContent.map((item, index) => (
                  <LearnItem key={index}>{item}</LearnItem>
                ))}
              </Learn>
            </TabPanel>

             {/* // course reviews */}
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
            
            {/* // Lessons videos */}
            {isCoursePurchased ? 
            <TabPanel>
            <Title style={{textAlign: "left", marginLeft: 5}}>lessons</Title>
            <LessonsBox>
              <Stepper activeStep={activeStep} orientation="vertical" sx={{width: "100%"}}>
              {lessons.map((lesson, index) => (
                <Step key={index}>
                  <StepLabel onClick={() => setActiveStep(index)}>
                    <div style={{fontSize: 25, fontWeight: 600}}>{lesson.title}</div>
                  </StepLabel>
                  <LessonInnerCard variant="elevation" elevation={10}>
                  <StepContent>
                    {lesson.videos?.map((video, index) => (
                      <VideoContainer key={index}>
                        <VideoPlayer href={video.link}><PlayCircleIcon sx={{mb: -0.7, mr: 1}} />{video.title}</VideoPlayer>
                      </VideoContainer>
                    ))}
                      <div>
                        <LessonBtn disabled={index === 0} onClick={handleBack}>Back</LessonBtn>
                        <LessonBtn variant="contained" onClick={handleNext}>
                          {index === lessons.length - 1 ? 'Finish' : 'Next'}
                        </LessonBtn>
                      </div>
                  </StepContent>
                  </LessonInnerCard>
                </Step>
              ))}
              </Stepper>
              {activeStep === lessons.length && (
                <Paper square elevation={10} sx={{ p: 2, borderRadius: 2 }}>
                  <Paragraph>Course completed! Congratulations</Paragraph>
                  <LessonBtn style={{width: "100%"}}>Print your Certificate</LessonBtn>
                </Paper>
              )}
            </LessonsBox>
            </TabPanel>
            : null}
            {/* // Lessons pdfs */}
            {isCoursePurchased ? 
            <TabPanel>
              <Title style={{textAlign: "left", marginLeft: 5}}>Resources</Title>
              <LessonsBox>
              {lessons.map((lesson, index) => (
                <LessonContainer key={index}>
                  <LessonInnerCard variant="elevation" elevation={10}>
                    <Title style={{fontSize: 25, fontWeight: 600}}>{lesson.title}</Title>
                    {lesson.pdfs?.map((pdf, index) => (
                      <VideoContainer key={index}>
                        <PdfLink href={pdf.link} target="_blank" ><CloudDownloadIcon sx={{mr: 1, mb: -0.7}} />{pdf.title}</PdfLink>
                      </VideoContainer>
                  ))}
                  </LessonInnerCard>
                </LessonContainer>
              ))}
              </LessonsBox>
            </TabPanel>
            : null}
          </Tabs>
        </LessonCard>

         {/* //course add to cart section */}
        <CheckoutBox>
          <LessonInnerCard variant="elevation" elevation={20}>
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
            <Button onClick={handleEnroll} style={{width: "100%"}}>{!isCoursePurchased ? "Enroll" : null}</Button>
          </LessonInnerCard>
        </CheckoutBox>
      </Box>
      <CoursesList title="Related courses" courses={courses} limit={limit}/>
      <Newsletter />
    </Container>
  )
}

export default SingleCourse