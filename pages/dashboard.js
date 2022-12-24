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
import Paper from '@mui/material/Paper';
import MyLearning from '../components/MyLearning';


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
  margin: 0 0 0 100px;
  width: 100%;
  height: 40%;
  display: flex;
`;

const DashItemsBox = styled.div`
  margin-right: 30px;
  border: 1px solid #CDDEFF;
  height: 70%;
  width: 300px;
  flex: 1;
  position: relative;
  top: 10px;
  left: -100px;
  text-align: center;
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
  bottom: 20px;
  right: 215px;
  width: 55.7%;
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
`;

const Title = styled.h1`
  margin: 2% 0 0 0;
`;

const Paragraph = styled.p`
  margin: 15px;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 1.5;
`;

const AvatarImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: auto 50px;
`;


const ImageBox = styled.img`
  width: 100%;
  height: 200px;
  
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
          <Button style={{top: 140, width: "10%"}}>Add new course</Button>
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
          <Tab label="My learning"
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"} 
              }}
          />
          <Tab label="Wishlist" className="tabLabel"
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"} }}
          />
          <Tab label="Logout" 
            sx={{fontSize: "25px", m:3, fontWeight: 600, color: "#000", "&:focus":{color: "#1C3879"} }}
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
          <DashItemsBox style={{width: "900px"}}>
            <TableContainer sx={{ width: "100%", background: "#1C3879"}} component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.email}>
                      <TableCell sx={{ border: 0, fontSize: 20, color: "#fff" }} component="th" scope="row">{row.regDate}</TableCell>
                      <TableCell sx={{ border: 0, fontSize: 20, color: "#fff"}} align="left">{row.fName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DashItemsBox>
          </DashBox>
        </TabPanel>
        <TabPanel value={value} index={2}>
         <MyLearning title="My Learning"/>
         <Button> View all</Button>
        </TabPanel>
        <TabPanel value={value} index={3}>
         <MyLearning title="Wishlist"/>
         <Button> View all</Button>
        </TabPanel>
        <TabPanel value={value} index={4}>
        <Title>Logout</Title>
          
        </TabPanel>
      </Box>
      <Newsletter />
    </Container>
  );
};

export default Dashboard;