import React from "react"
import styled from "styled-components"
import Image from "next/image"
import { redirect } from "next/navigation"
import { featuredCourses } from "@/data"
import CourseHeader from "@/components/course/CourseHeader"
import CourseTabs from "@/components/course/CourseTabs"
import { mobile, ipad } from "@/responsive"

// const CourseContainer = styled.div`
//     width: ${(props) => props.theme.widths.dsktopWidth};
// `

// fetch the course from the database
// async function fetchCourse(id: string) {
//     const res = await fetch("/data/featuredCourses")
//     if (!res.ok) return undefined
//     return res.json()
// }

export default async function Course({ params }: { params: Promise<{ id: string }> }) {
    const courses = featuredCourses
    const limit = 8
    const id = (await params).id
    if (!id) {
        redirect("/")
    } else {
        console.log(id)
    }

    const course = featuredCourses.find((course) => course._id.toString() === id)
    if (!course) {
        redirect("/")
    }
    const price = course.price > 0 ? "N" + course.price.toLocaleString("en-US") : "Free"

    // get the course for the user using the id
    // const course = await fetchCourse(id)
    // lessons, hours, minutes, students, rating

    return (
        <div>
            <CourseHeader
                rating={course.rating}
                title={course.title}
                category={course.category}
                price={price}
                imageUrl={course.image}
                facilitator={course.facilitator}
                facilitatorImage={course.facilitatorImage}
                lessons={course.onDemandVideos}
                hours={course.duration.hours}
                minutes={course.duration.minutes}
                students={course.students}
                skillLevel={course.skillLevel}
            />
            <CourseTabs
                courseDesc={course.courseDesc}
                whatYoullLearn={course.whatYoullLearn}
                modules={course.modules}
                review={course.review}
            />
        </div>
    )
}
