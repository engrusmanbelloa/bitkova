import React from "react"
import { redirect } from "next/navigation"
import { featuredCourses } from "@/data"
import { useCourseById } from "@/hooks/courses/useFetchCourseById"
import CourseHeader from "@/components/course/CourseHeader"
import { CourseWithExtras } from "@/types"
import { mobile, ipad } from "@/responsive"

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    if (!id) redirect("/")

    const courseQuery = useCourseById(id)
    const course = courseQuery.data

    if (!course) redirect("/")

    return <CourseHeader course={course} />
}
