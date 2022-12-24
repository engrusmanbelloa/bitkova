import * as React from 'react';
import styled from "styled-components";
import Card from '@mui/material/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Newsletter from "../components/Newsletter"
import MyLearning from "../components/MyLearning";

import {mobile} from "../responsive";

const Container = styled.div`
  border-top: 1px solid black;
  width: 100%;
  margin-top: 0px;
  padding-top: 50px;
  position: relative;
  justify-content: center;
`;

const Wrapper = styled.div`
  margin: 20px auto;
  width: 100%;
  display: flex;
  justify-content: center;
  aling-items: center;
`;

const Box = styled.div`
  margin: 0 auto;
  text-align: center;
  margin-right: -30px;
  padding: 10px;
  
`;

const Title = styled.h1`
  margin: 5px 20px;
`;

const MyCourses = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Container>
        <Wrapper>
        <Card variant="elevation" elevation={20} sx={{borderRadius: 3, height: 600, pb: 3,}}>
          <Tabs>
            <TabList style={{background: "#1C3879", color: "#fff", textAlign: "center", border: "none"}}>
              <Tab><Title>My Learning</Title></Tab>
              <Tab><Title>Wishlist</Title></Tab>
              <Tab><Title>Archive</Title></Tab>
            </TabList>
            <Box>
              <TabPanel>
                <MyLearning title="My Learning" />
              </TabPanel>
              <TabPanel>
                <MyLearning title="Wishlist"/>
              </TabPanel>
              <TabPanel>
                <MyLearning title="Archive"/>
              </TabPanel>
            </Box>
          </Tabs>
        </Card>
      </Wrapper>
      <Newsletter />
    </Container>
  );
};

export default MyCourses;