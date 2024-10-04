'use client'
import Intro from "@/components/intro"
import Slider from "@/components/Slider"
import CoursesList from "@/components/CoursesList"
import News from "@/components/News"
import Events from "@/components/Events"
import Testimonals from "@/components/Testimonals"
import Newsletter from "@/components/Newsletter"
import Head from "next/head"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"
import IsLoading from "@/components/IsLoading"
import HomeHero from "@/components/HomeHero"

const Container = styled.div`
  width: ${props => props.theme.dsktopWidth};
  margin: 0 auto;
  padding: ${props => props.theme.pagePadding};
  ${ipad({ width: "665px", padding: "5px 0" })}
  ${mobile({ width: "360px", padding: 0})}
`;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

export default function Home() {
  const [courses, setCourses] = useState([])
  const [count, setCount] = useState(0)
  const [skip, setSkip] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    async function fetchCourses() {
      const response = await fetch("/api/courses/getCourses")
      const data = await response.json()
      setCourses(data)
      setCount(data.count)
      setIsLoading(false)
      console.log("courses found: ", courses)
    }
    fetchCourses()
  }, [])
  const limit = 4

  if (isLoading) {
    return <IsLoading />
  }

  return (
    <>
      <Container>
        <HomeHero />
        <Button onClick={() => setCount(count + 1)}>
        Click me {count} times
        </Button>   
      </Container>
    </>
  )
}
