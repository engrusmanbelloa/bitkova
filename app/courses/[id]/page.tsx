import React from "react"
import { redirect } from "next/navigation"
import { featuredCourses } from "@/data"
import CourseHeader from "@/components/course/CourseHeader"
import { mobile, ipad } from "@/responsive"

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

    return <CourseHeader course={course} />
}
