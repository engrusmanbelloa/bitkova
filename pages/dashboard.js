import * as React from 'react';
import styled from "styled-components";
import Newsletter from "../components/Newsletter"
import { mobile } from "../responsive";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import CoursesList from '../components/CoursesList';
import {featuredCoures} from "../data"
import User from '../components/Users';


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px 0px 10px 0px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  border-top: 1px solid #CDDEFF;
  border-bottom: 1px solid #CDDEFF;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const InfoContainer = styled.div`
  padding: 10px;
  animation: pulse;
`;

const Box = styled.div`
  margin: 0 0 5px 20px;
  display: flex;
  height: 60vh;
  width: 100%;
`;
const DashBox = styled.div`
  margin: 0 0 0 10px;
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const DashItemsBox = styled.div`
  margin: auto;
  border: 1px solid #CDDEFF;
  height: 70%;
  width: 300px;
  flex: 1;
  position: relative;
  top: 70px;
  left: -100px;
  border-radius: 5px;
  cursor: pointer;
  background: rgba(28, 56, 121, 1);
  color: #fff;

  &:hover {
    background-color: #CDDEFF;
    color: rgba(28, 56, 121, 1);
  }
`;

const Desc = styled.p`
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 2px;
  line-height: 1.5;
`;

const Button = styled.button`
  height: 50px;
  width: 200px;
  position: absolute;
  margin-top: 50px;
  right: 100px;
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
`;

const Title = styled.h1`
  margin: 5% 0 0 0;
`;

const Paragraph = styled.p`
  margin: 15px;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 1.5;
`;

const Image = styled.img`
    width: 90%;
    height: 40vh;
`;

const AvatarImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: auto 50px;
`;

const Learn = styled.ul`
  list-style: square;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const LearnItem = styled.li`
  font-size: 25px;
  font-weight: 400;
  text-align: left;
  margin: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
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
`;
//  dashborad tab pannel 
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div>
      {value === index && (
        <Box>
          <DashBox>{children}</DashBox>
        </Box>
      )}
    </div>
  );
}

//  create the table data structure
function createData(regDate, fName, lName, username, email,  phone, bio) {
  return { regDate, fName, lName, username, email, fName, lName, phone, bio };
}

const rows = [
  createData('Registered date', "Dec 12, 2022"),
  createData('Fisrt name', "Bello"),
  createData('Last name', "Usman"),
  createData('username', "Bello1234"),
  createData("email", "bello@gmail.com"),
  createData('Phone', "1234567890"),
  createData('Bio', "lorem ipsum dolor sit amet, consectetur adipiscing elit"),
];


const Dashboard = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Container>
      <Wrapper> 
        <InfoContainer>
          <AvatarImg src="/review/usman.jpg" alt="profile picture"/>
        </InfoContainer>
        <InfoContainer>
          <Title>Bello Usman</Title>
          <Desc>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          </Desc>
        </InfoContainer>
        <InfoContainer>
          <Button>Add new course</Button>
        </InfoContainer>
      </Wrapper>
        <Box>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            selected={false}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', height: 520, width: 300, ml: 20, mr: 10, mb: 1 }}
          >
          <Tab label="Dashboard" 
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"} }}
          />
          <Tab label="Profile"
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"} }}
          />
          <Tab label="Enrolled sourses"
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"} }}
          />
          <Tab label="Wishlist"
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"} }}
          />
          <Tab label="Logout" 
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"} }}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Title style={{position: "relative", top: -60,}}>Dashboard</Title>
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
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Title style={{position: "relative", top: -60,}}>Profile</Title>
          <DashItemsBox style={{width: "900px", left: -42}}>
            <TableContainer sx={{ width: "100%", background: "#1C3879"}} component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.username}
                    >
                      <TableCell sx={{ border: 0, fontSize: 20, color: "#fff" }} component="th" scope="row">{row.regDate}</TableCell>
                      <TableCell sx={{ border: 0, fontSize: 20, color: "#fff"}} align="left">{row.fName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DashItemsBox>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <Title style={{position: "relative", top: -70,}}>Dashboard</Title>
          <DashItemsBox>
            <Paragraph>Enlrolled courses</Paragraph>
            <Title>5</Title>
          </DashItemsBox>
          <DashItemsBox>
            <Paragraph>Active courses</Paragraph>
            <Title>5</Title>
          </DashItemsBox>
          <DashItemsBox>
            <Paragraph>Completed courses</Paragraph>
            <Title>5</Title>
          </DashItemsBox>
        </TabPanel>
        <TabPanel value={value} index={3}>
        <Title style={{position: "relative", top: -70,}}>Dashboard</Title>
          <DashItemsBox>
            <Paragraph>Enlrolled courses</Paragraph>
            <Title>5</Title>
          </DashItemsBox>
          <DashItemsBox>
            <Paragraph>Active courses</Paragraph>
            <Title>5</Title>
          </DashItemsBox>
          <DashItemsBox>
            <Paragraph>Completed courses</Paragraph>
            <Title>5</Title>
          </DashItemsBox>
        </TabPanel>
        <TabPanel value={value} index={4}>
        <Title style={{position: "relative", top: -70,}}>Dashboard</Title>
          <DashItemsBox>
            <Paragraph>Enlrolled courses</Paragraph>
            <Title>5</Title>
          </DashItemsBox>
          <DashItemsBox>
            <Paragraph>Active courses</Paragraph>
            <Title>5</Title>
          </DashItemsBox>
          <DashItemsBox>
            <Paragraph>Completed courses</Paragraph>
            <Title>5</Title>
          </DashItemsBox>
        </TabPanel>
      </Box>
      <Newsletter />
    </Container>
  );
};

export default Dashboard;