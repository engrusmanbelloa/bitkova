import Intro from "../components/intro"
import Slider from "../components/Slider"
import CoursesList from "../components/CoursesList"
import News from "../components/News"
import Events from "../components/Events"
import Testimonals from "../components/Testimonals"
import Newsletter from "../components/Newsletter"
import Head from "next/head"
import { useState, useEffect } from "react"

export default function Home() {
  const [courses, setCourses] = useState([])
  const [count, setCount] = useState(0)
  const [skip, setSkip] = useState(0)

  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch("/api/courses/getCourses")
      const data = await response.json()
      setCourses(data)
      setCount(data.count)
      console.log("courses found: ", courses)
    }
    fetchCourses()
  }, [])
  const limit = 4
  return (
    <>
      <Slider/>
      <Intro/>
      <CoursesList title="Featured courses" foot="See more" courses={courses} limit={limit}/>
      <News/>
      <Events/>
      <Testimonals/>
      <Newsletter/>
    </>
  )
}
