import Intro from "../components/intro"
import Slider from "../components/Slider"
import CoursesList from "../components/CoursesList"
import News from "../components/News"
import Events from "../components/Events"
import Testimonals from "../components/Testimonals"
import Newsletter from "../components/Newsletter"
import Head from "next/head"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { mobile, ipad } from "../responsive"
import IsLoading from "../components/IsLoading"

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
            <Slider />
            <Intro />
            <CoursesList title="Featured courses" foot="See more" courses={courses} limit={limit} />
            <News />
            <Events />
            <Testimonals />
            <Newsletter />
        </>
    )
}
