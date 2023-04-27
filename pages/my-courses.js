import * as React from 'react'
import styled from "styled-components"
import Card from '@mui/material/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Newsletter from "../components/Newsletter"
import MyLearning from "../components/MyLearning"
import {Progress} from "rsuite";
import {mobile, ipad} from "../responsive"
import { featuredCoures } from '../data';
import { useState } from "react"

const Container = styled.div`
  border-top: 1px solid #CDDEFF;
  width: 100%;
  margin-top: 0px;
  padding-top: 50px;
  
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
  width: 100%;
  ${ipad({})}
  ${mobile({})}
`;

const Title = styled.h1`
  margin: 5px 20px;
  font-size: 25px;
  ${ipad({ fontSize: 20 })}
  ${mobile({ fontSize: 16, margin: "5px 10px" })}
`;


const MyCourses = (props) => {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  // course progress bar state change
  const [percent, setPercent] = useState(0)
  const increase = () => {
    const value = Math.min(percent + 10, 100)
    setPercent(value)
  }

  return (
    <Container>
      <Wrapper>
        <Card variant="elevation" elevation={20} 
          sx={{
            borderRadius: 3, height: "100%", width: "75", pb: 3, textAlign: "center",
            '@media screen and (max-width: 768px)': {
              width: "85%",
            },
            '@media screen and (max-width: 600px)': {
              width: "98%",
            },
          }}>
          <Tabs style={{width: "100%",}}>
            <TabList style={{background: "#1C3879", color: "#fff", textAlign: "center", border: "none"}}>
              <Tab><Title>My Learning</Title></Tab>
              <Tab><Title>Wishlist</Title></Tab>
              <Tab><Title>Archive</Title></Tab>
            </TabList>
            <Box>
              <TabPanel>
                <MyLearning courses={featuredCoures} display="grid" title="My Learning"/>
              </TabPanel>
              <TabPanel>
                <MyLearning courses={featuredCoures} display="grid" title="Wishlist"/>
              </TabPanel>
              <TabPanel>
                <MyLearning courses={featuredCoures} display="grid" title="Achive"/>
              </TabPanel>
            </Box>
          </Tabs>
        </Card>
      </Wrapper>
      <Newsletter />
    </Container>
  )
}

export default MyCourses