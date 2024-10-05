import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from "styled-components"
import Newsletter from "../components/Newsletter"
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CastForEducationIcon from '@mui/icons-material/CastForEducation'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import MyLearning from '../components/MyLearning'
import {mobile, ipad} from "../responsive"
import { getProviders, useSession, signIn, signOut, getCsrfToken, getSession } from "next-auth/react"
import AddModal from '../components/AddModal'
import DashboardTable from '../components/DashboardTable'

const Container = styled.div`
  margin: 0;
  padding: 0;
`;

const Wrapper = styled.div`
  padding: 20px 0px 10px 0px;
  margin-bottom: 20px;
  margin-top: 0;
  display: flex;
  justify-content: flex-start;
  border-top: 1px solid #CDDEFF;
  border-bottom: 1px solid #CDDEFF;
  ${ipad({ padding: "10px", margin: 0})}
  ${mobile({ padding: "0", flexDirection:"column",})}
`;

const InfoContainer = styled.div`
  padding: 10px;
  animation: pulse;
  margin: 0;
  ${mobile({ textAlign: "center", padding: 5, margin: 0 })}
`;

const AddCourseBtn = styled.div`
  padding: 10px;
  width: 10%;
  animation: pulse;
  position: absolute;
  right: 15%;
  ${ipad({ width: "20%", right: "3%", top: "12%", height: "5%" })}
  ${mobile({ width: "50%", position: "relative", left: "", top: "0"})}
`;

const Box = styled.div`
  margin: 0 0 5px 20px;
  display: flex;
  height: 60vh;
  ${'' /* background-color: red; */}
  ${ipad({height: "67vh", marginLeft: 10, marginBottom: "0px", paddingBottom: 0})}
  ${mobile({height: "65vh",})}
`;

const DashBox = styled.div`
  flex: 1;
  margin: 0;
  padding: 0;
  height: 30%;
  width: 1000px;
  display: flex;
  justify-content: center;
  ${ipad({width: "560px", marginLeft: 10})}
  ${mobile({display: "block", marginLeft: 0, width: 270})}
`;

const LearnDashBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  ${ipad({width: "560px", marginLeft: 10})}
  ${mobile({display: "block", marginLeft: 0, width: 270})}
`;

const DashItemsBox = styled.div`
  margin-right: 30px;
  padding: 10px;
  border: 1px solid #CDDEFF;
  ${'' /* height: 70%; */}
  height: ${props => props.height === "table" ? '500px' : "70%"};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: relative;
  top: 10px;
  border-radius: 5px;
  cursor: pointer;
  background: rgba(28, 56, 121, 1);
  color: #fff;
  &:hover {
    background-color: #CDDEFF;
    color: rgba(28, 56, 121, 1);
  }
  ${ipad({left: 0,})}
  ${mobile({width: "255px", left: 0, marginBottom: 10})}
`;

const Desc = styled.div`
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 2px;
  line-height: 1.5;
  ${ipad({ margin: 0, fontSize: 16, width: "100%", marginTop: 15})}
  ${mobile({width: "100%"})}
`;

const Button = styled.button`
  height: 50px;
  position: relative;
  bottom: 20px;
  width: 99%;
  top: ${props => props.ipadBtn ? "140" : "100"};
  margin-top: 50px;
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
  ${ipad({top: -45, left: 4, right: 0, height: 35, fontSize: 16})}
  ${mobile({margin: "5px auto", top: 0, width: "100%", left: 0,})}
`;

const Title = styled.h1`
  margin: 2% 0 0 0;
  ${ipad({fontSize: 25})}
  ${mobile({fontSize: 18, marginLeft: 10, marginTop: 10})}
`;

const Paragraph = styled.p`
  margin: auto;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 1.5;
  ${ipad({width: "130px"})}
  ${mobile({fontSize: 14})}
`;

const AvatarImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: auto 50px;
    ${ipad({width: "80px", height: "80px",})}
`;

const Points = styled.p`
  margin: 0 auto;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  position: relative;
  top: 50px; 
  ${ipad({})}
  ${mobile({top: 0, left: 80, fontSize: 17,})}
`;


const SetUpdate = styled.div`
  font-size: 18px;
  margin: 10px auto;
  font-weight: 400;
  color: #fff;
  width: 25%;
  padding: 10px;
  border-radius: 5px;
  border: 0.5px solid;
  box-shadow: 5px 5px #CDDEFF;
  text-align: center;
  background: rgba(28, 56, 121, 1);
`;

//  dashborad tab pannel 
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div>
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}

const head = ["Joined", "Name", "Username", "Email", "Phone", "Bio"]

const Dashboard = (props) => {
  const [value, setValue] = useState(0)
  const [update, setUpdate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isFetchingUser, setIsFetchingUser] = useState(false)
  const [error, setError] = useState()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [courses, setCourses] = useState([])
  const [user, setUser] = useState([])
  const modalOptions = ["Add course", "Add post", "Add event", "Add Team"]
  const limit = 4

  useEffect(() => {
    setIsFetching(true)
    // console.log("Fech course useEffect started")
    async function fetchCourses() {
      try {
        const response = await fetch("/api/courses/getCourses")
        const data = await response.json()
        const filteredCourses = user ? data.filter(course => course.students.includes(user._id)) : null
        setCourses(filteredCourses)
        setIsFetching(false)
      } catch (error) {
        setError("Could not fetch the courses detail.")
        console.log(error)
      }
    }
    if (user) { // add a check to see if the user state is defined
      fetchCourses()
    }
  }, [user])
  
  useEffect(() => {
    setIsFetchingUser(true)
    // console.log("Fech user useEffect started")
    async function fetchUser() {
      try {
        const response = await fetch("/api/profile/getUser", {
          method: "GET",
        })
        if (response.ok) {
          const data = await response.json()
          setUser(data)
          setIsFetchingUser(false)
          console.log("The logged user detail: ", data)
        }
      } catch (error) {
        setError("Could not fetch the user detail.")
        console.log("something is wrong with the user" ,error)
      }
    }
    fetchUser()
  }, [])

  useEffect(() =>{
    setIsLoading(true)
    // console.log("Fech session useEffect started")
    if (!session) {
      if (status === "loading") {
        return 
      }
      setIsLoading(false)
      router.push("/login")
    } else if (session.user.phone === undefined || session.user.phone === null){
      setUpdate(true)
      setTimeout(() => {
        router.push("/profile-update")
      }, 3000)
    } else {
      setIsLoading(false) // Session is loaded
    }
  },[session, status])



  const addCourse = () => {
    router.push("/NewCourseForm")
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const isAdmin = user?.isAdmin
  const numEnrolledCourses = user?.enrolledCourses?.length || 0
  const numActiveCourses = user?.activeCourse?.length || 0
  const numCompletedCourses = user?.completedCourses?.length || 0
  console.log("numCompletedCourses", numCompletedCourses)

  if (isLoading || isFetching || isFetchingUser) { 
    return <SetUpdate>Loading....</SetUpdate>
  }

  if (update) { 
    return <SetUpdate>Please complete your profile setup</SetUpdate>
  }

  if (update) { 
    return <SetUpdate>{error}</SetUpdate>
  }

  return (
    <Container>
      { session ? <Wrapper> 
        <InfoContainer>
          <AvatarImg src={user.image} alt="profile picture"/>
        </InfoContainer>
        <InfoContainer>
          <Title>{user.name}</Title>
          <Desc>{user.bio}</Desc>
        </InfoContainer>
        <AddCourseBtn>
        {user.isAdmin || user.isTutor 
          ? 
          <AddModal modalOptions={modalOptions} isAdmin={isAdmin} onOptionClick={(option) => {
            if (option === "Add course") {
              addCourse()
            } else if (option === "Add post" ) {
              return
            } else if (option === "Add event") {
              return
            } else if (option === "Add Team" && isAdmin) {
              return
            }
          }} />
          : 
          <Points>Points: {user.points}</Points>}
        </AddCourseBtn>
      </Wrapper>
      : ""}
        <Box>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            selected={false}
            aria-label="Vertical tabs example"
            sx={{height: 520, ml: 20, mr: 10, mb: 1,
              // ipad media queries
              '@media screen and (max-width: 768px)': {
                ml: 0, mr: 1, padding: 0, width: "20%", height: "99%",
              },
              // moblie media queries
              '@media screen and (max-width: 600px)': {
                height: "75%", ml: -5, mr: 0, mt: 8, width: "18%", pr: 0
              },
             }}
          >
          <Tab label={<DashboardIcon sx={{
            fontSize: 40,
            '@media screen and (max-width: 768px)': {
              //  fontSize: "20px",
              },
              '@media screen and (max-width: 600px)': {
               fontSize: 20, margin: 0
              },
          }}/>} 
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"},
            '@media screen and (max-width: 768px)': {
               fontSize: "18px", width: "70%", m:1
              },
              '@media screen and (max-width: 600px)': {
               fontSize: "14px", fontWeight: 300, m: 0
              },
            }}
          />
          <Tab label={<AccountCircleIcon sx={{
            fontSize: 40,
            '@media screen and (max-width: 768px)': {
              //  fontSize: "20px",
              },
              '@media screen and (max-width: 600px)': {
               fontSize: 20, margin: 0
              },
            }}/>}
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"},
              '@media screen and (max-width: 768px)': {
                fontSize: "18px", width: "70%", m:1
                },
                '@media screen and (max-width: 600px)': {
                  fontSize: "14px", fontWeight: 300, m: 0
                },
             }}
          />
          <Tab label={<CastForEducationIcon sx={{
            fontSize: 40,
            '@media screen and (max-width: 768px)': {
              //  fontSize: "20px",
              },
              '@media screen and (max-width: 600px)': {
               fontSize: 20, margin: 0
              },
            }}/>}
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"},
              '@media screen and (max-width: 768px)': {
                fontSize: "18px", width: "70%", m:1
                  },
                  '@media screen and (max-width: 600px)': {
                    fontSize: "14px", fontWeight: 300, m: 0
                  }, 
              }}
          />
          <Tab label={<FavoriteBorderIcon sx={{
            fontSize: 40,
            '@media screen and (max-width: 768px)': {
              //  fontSize: "20px",
              },
              '@media screen and (max-width: 600px)': {
               fontSize: 20, margin: 0
              },
            }}/>}
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"},
            '@media screen and (max-width: 768px)': {
              fontSize: "18px", width: "70%", m:1
                },
                '@media screen and (max-width: 600px)': {
                  fontSize: "14px", fontWeight: 300, m: 0
                },
             }}
          />
          <Tab label={<ExitToAppIcon sx={{
            fontSize: 40,
            '@media screen and (max-width: 768px)': {
              //  fontSize: "20px",
              },
              '@media screen and (max-width: 600px)': {
               fontSize: 20, margin: 0
              },
            }}/>} 
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"},
              '@media screen and (max-width: 768px)': {
                  fontSize: "18px", width: "70%", m:1
                  },
                  '@media screen and (max-width: 600px)': {
                    fontSize: "14px", fontWeight: 300, m: 0
                  },
             }}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Title>Dashboard</Title>
          <DashBox>
            <DashItemsBox>
              <Paragraph>Enlrolled courses</Paragraph>
              <Title>{numEnrolledCourses}</Title>
            </DashItemsBox>
            <DashItemsBox>
              <Paragraph>Active courses</Paragraph>
              <Title>{numActiveCourses}</Title>
            </DashItemsBox>
            <DashItemsBox>
              <Paragraph>Completed courses</Paragraph>
              <Title>{numCompletedCourses}</Title>
            </DashItemsBox>
          </DashBox>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Title>Profile</Title>
          <DashboardTable user={user} head={head} />
        </TabPanel>
        <TabPanel value={value} index={2} sx={{ }}>
          <LearnDashBox>
            <MyLearning courses={courses} limit={limit} title="My Learning"/>
            <Button> View all</Button>
          </LearnDashBox>
        </TabPanel>
        <TabPanel value={value} index={3} sx={{ }}>
          <LearnDashBox>
            <MyLearning courses={courses} limit={limit} title="Wishlist"/>
            <Button> View all</Button>
          </LearnDashBox>
        </TabPanel>
        <TabPanel value={value} index={4}>
        <Title>Logout</Title>
        </TabPanel>
      </Box>
      <Newsletter />
    </Container>
  )
}

export default Dashboard