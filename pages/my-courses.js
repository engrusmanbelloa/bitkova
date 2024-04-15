import * as React from 'react'
import styled from "styled-components"
import { useRouter } from 'next/router'
import Card from '@mui/material/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Newsletter from "../components/Newsletter"
import MyLearning from "../components/MyLearning"
import {mobile, ipad} from "../responsive"
import { useState, useEffect } from "react"
import { getProviders, useSession, signIn, signOut, getCsrfToken, getSession } from "next-auth/react"

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


const MyCourses = (props) => {
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  // course progress bar state change
  const [percent, setPercent] = useState(0)
  const increase = () => {
    const value = Math.min(percent + 10, 100)
    setPercent(value)
  }

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
          // console.log("The logged user detail: ", data)
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
    console.log("Fech session useEffect started")
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
    {session ? 
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
                <MyLearning courses={courses} display="grid" title="My Learning"/>
              </TabPanel>
              <TabPanel>
                <MyLearning courses={courses} display="grid" title="Wishlist"/>
              </TabPanel>
              <TabPanel>
                <MyLearning courses={courses} display="grid" title="Achive"/>
              </TabPanel>
            </Box>
          </Tabs>
        </Card>
      </Wrapper>
      : <SetUpdate>something is wrong</SetUpdate>}
      <Newsletter />
    </Container>
  )
}

export default MyCourses