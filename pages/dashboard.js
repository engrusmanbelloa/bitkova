import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from "styled-components"
import Newsletter from "../components/Newsletter"
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CastForEducationIcon from '@mui/icons-material/CastForEducation'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import MyLearning from '../components/MyLearning'
import {mobile, ipad} from "../responsive"
import { getProviders, useSession, signIn, signOut, getCsrfToken, getSession } from "next-auth/react"


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
  height: 100%;
  ${'' /* background-color: red; */}
  ${ipad({height: "77vh", marginLeft: 10, marginBottom: "-20px", paddingBottom: 0})}
  ${ipad({marginBottom: "-35px",})}
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
  border: 1px solid #CDDEFF;
  height: 70%;
  flex: 1;
  position: relative;
  top: 10px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  background: rgba(28, 56, 121, 1);
  color: #fff;
  &:hover {
    background-color: #CDDEFF;
    color: rgba(28, 56, 121, 1);
  }
  ${ipad({left: 0,})}
  ${mobile({width: "270px", left: 0, marginBottom: 10})}
`;

const Desc = styled.p`
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
  width: 97%;
  right: 1.5%;
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
  ${ipad({top: -45, bottom: "30px", left: 0, right: 0})}
  ${mobile({margin: "5px auto", top: -30})}
`;

const AddButton = styled.button`
  height: 50px;
  position: relative;
  top: 50px;
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
  ${ipad({width: "90%%", bottom: "30px", left: 10})}
  ${mobile({top: 0, left: "60%", fontSize: 15, width: "90%", height: 30, fontWeight: 300})}
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
  width: 10%;
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

//  create the user table data structure
function createData(regDate, fullName, username, email,  phone, bio) {
  return { regDate, fullName, username, email, phone, bio };
}

const rows = [
  {Joined: "Dec 12, 2022"},
  {Name: "Bello Usman A"},
  {Username: "Bello1234"},
  {Email: "bello@gmail.com"},
  {Phone: "1234567890"},
  {Bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit"},
]


const Dashboard = () => {
  const [value, setValue] = useState(0)
  const [update, setUpdate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  const addCourse = () => {
    router.push("/course-register")
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

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
        router.push("/profile-update")
      }, 3000)
    } else {
      setIsLoading(false) // Session is loaded
    }
  },[session, status])

  if (isLoading) {
    return <SetUpdate>Loading....</SetUpdate>
  }
  if (update) {
    return <SetUpdate>Please complete your profile setup</SetUpdate>
  }

  return (
    <Container>
      { session ? <Wrapper> 
        <InfoContainer>
          <AvatarImg src={session.user.image} alt="profile picture"/>
        </InfoContainer>
        <InfoContainer>
          <Title>{session.user.name}</Title>
          <Desc> {session.user.bio}</Desc>
        </InfoContainer>
        <AddCourseBtn>
        {session.user.isAdmin || session.user.isTutor 
          ? 
          <AddButton ipadBtn onClick={addCourse}>Add new course</AddButton> 
          : 
          <Points>Points: {session.user.points}</Points>}
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
                ml: 0, mr: 1, padding: 0, width: "20%", height: "80%",
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
              <Title>5</Title>
            </DashItemsBox>
            <DashItemsBox>
              <Paragraph>Active courses</Paragraph>
              <Title>4</Title>
            </DashItemsBox>
            <DashItemsBox>
              <Paragraph>Completed courses</Paragraph>
              <Title>3</Title>
            </DashItemsBox>
          </DashBox>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Title>Profile</Title>
          <DashBox>
          <DashItemsBox>
            <TableContainer  component={Paper} sx={{ width: "100%", background: "#1C3879",
              '@media screen and (max-width: 768px)': {
                fontSize: "18px",
                },
                '@media screen and (max-width: 600px)': {
                  fontSize: "16px", fontWeight: 300, width: "270px",
                },
            }}>
              <Table aria-label="simple table">
              {/* <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead> */}
                <TableBody>
                  {rows.map((row) => (
                    <div key={row.Email}>
                    <TableRow >
                      <TableCell sx={{ border: 0, fontSize: 20, color: "#fff", padding: 1}} component="th" scope="row">{row.regDate}</TableCell>
                      <TableCell sx={{ border: 0, fontSize: 20, color: "#fff", padding: 1.6}} align="left">{row.fullName}</TableCell>
                    </TableRow>
                    </div>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DashItemsBox>
          </DashBox>
        </TabPanel>
        <TabPanel value={value} index={2} sx={{ }}>
          <LearnDashBox>
            <MyLearning title="My Learning"/>
            <Button> View all</Button>
          </LearnDashBox>
        </TabPanel>
        <TabPanel value={value} index={3} sx={{ }}>
          <LearnDashBox>
            <MyLearning title="Wishlist"/>
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