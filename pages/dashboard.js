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
  ${mobile({ textAlign: "center" })}
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
  ${ipad({height: "75vh", marginLeft: 10, marginBottom: "-40px", paddingBottom: 0})}
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
  ${mobile({display: "block", marginLeft: 0, width: "100%"})}
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
  ${mobile({width: "280px", left: 0})}
`;

const Desc = styled.p`
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 2px;
  line-height: 1.5;
  ${ipad({ margin: 0, fontSize: 16, width: "70%"})}
  ${mobile({width: "100%"})}
`;

const Button = styled.button`
  height: 50px;
  position: relative;
  bottom: 20px;
  right: ${props => props.ipadBtn ? "140" : ""};
  width: 97.5%;
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
  ${ipad({width: "90%%", bottom: "30px", left: 10})}
  ${mobile({margin: "5px", width: "100%", left: -6})}
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
  ${mobile({top: 0, left: 135})}
`;

const Title = styled.h1`
  margin: 2% 0 0 0;
  ${ipad({fontSize: 25})}
`;

const Paragraph = styled.p`
  margin: auto;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 1.5;
  ${ipad({width: "130px"})}
`;

const AvatarImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: auto 50px;
    ${ipad({width: "100px", height: "100px",})}
`;


const ImageBox = styled.img`
  width: 100%;
  height: 200px;
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
  const { children, value, index, ...other } = props;

  return (
    <div>
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

//  create the user table data structure
function createData(regDate, fullName, username, email,  phone, bio) {
  return { regDate, fullName, username, email, phone, bio };
}

const rows = [
  createData('Joined', "Dec 12, 2022"),
  createData('Name', "Bello Usman A"),
  createData('Username', "Bello1234"),
  createData("Email", "bello@gmail.com"),
  createData('Phone', "1234567890"),
  createData('Bio', "lorem ipsum dolor sit amet, consectetur adipiscing elit"),
];


const Dashboard = () => {
  const [value, setValue] = useState(0)
  const [update, setUpdate] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  useEffect(() =>{
    if (!session) {
      router.push("/login")
    } else if (session.user.phone === undefined || session.user.phone === null){
      setUpdate(true)
      setTimeout(() => {
        router.push("/profile-update")
      }, 3000)
    }
  },[session])

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
        {session.user.isAdmin || session.user.isTutor ? <AddButton ipadBtn>Add new course</AddButton> : ""}
        </AddCourseBtn>
        {/* <AddButton  type="button" onClick={() => router.push("/profile-update")}>Edit profile</AddButton> */}
      </Wrapper>
      : ""}
        <Box>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            selected={false}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', height: 520, ml: 20, mr: 10, mb: 1,
              // ipad media queries
              '@media screen and (max-width: 768px)': {
                ml: 0, mr: 1, padding: 0, width: "20%", height: "80%",
              },
              // moblie media queries
              '@media screen and (max-width: 600px)': {
                height: "80%", mr: 0, mt: 8, width: "18%", marginBottom: -50
              },
             }}
          >
          <Tab label={<DashboardIcon sx={{fontSize: 40}}/>} 
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"},
            '@media screen and (max-width: 768px)': {
               fontSize: "18px", width: "70%", m:1
              },
              '@media screen and (max-width: 600px)': {
               fontSize: "14px", fontWeight: 300, m: 0
              },
            }}
          />
          <Tab label={<AccountCircleIcon sx={{fontSize: 40}}/>}
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"},
              '@media screen and (max-width: 768px)': {
                fontSize: "18px", width: "70%", m:1
                },
                '@media screen and (max-width: 600px)': {
                  fontSize: "14px", fontWeight: 300, m: 0
                },
             }}
          />
          <Tab label={<CastForEducationIcon sx={{fontSize: 40}}/>}
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"},
              '@media screen and (max-width: 768px)': {
                fontSize: "18px", width: "70%", m:1
                  },
                  '@media screen and (max-width: 600px)': {
                    fontSize: "14px", fontWeight: 300, m: 0
                  }, 
              }}
          />
          <Tab label={<FavoriteBorderIcon sx={{fontSize: 40}}/>} className="tabLabel"
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"},
            '@media screen and (max-width: 768px)': {
              fontSize: "18px", width: "70%", m:1
                },
                '@media screen and (max-width: 600px)': {
                  fontSize: "14px", fontWeight: 300, m: 0
                },
             }}
          />
          <Tab label={<ExitToAppIcon sx={{fontSize: 40}}/>} 
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
          <DashItemsBox profile>
            <TableContainer  component={Paper} sx={{ width: "100%", background: "#1C3879",
              '@media screen and (max-width: 768px)': {
                fontSize: "18px",
                },
                '@media screen and (max-width: 600px)': {
                  fontSize: "16px", fontWeight: 300, width: "315px", 
                },
            }}>
              <Table aria-label="simple table">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.email}>
                      <TableCell sx={{ border: 0, fontSize: 20, color: "#fff", padding: 1}} component="th" scope="row">{row.regDate}</TableCell>
                      <TableCell sx={{ border: 0, fontSize: 20, color: "#fff", padding: 1.6}} align="left">{row.fullName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DashItemsBox>
          </DashBox>
        </TabPanel>
        <TabPanel value={value} index={2} sx={{ }}>
         <MyLearning title="My Learning"/>
         <Button> View all</Button>
        </TabPanel>
        <TabPanel value={value} index={3} sx={{ }}>
         <MyLearning title="Wishlist"/>
         <Button>View all</Button>
        </TabPanel>
        <TabPanel value={value} index={4}>
        <Title>Logout</Title>
        </TabPanel>
      </Box>
      <Newsletter />
    </Container>
  );
};

export default Dashboard