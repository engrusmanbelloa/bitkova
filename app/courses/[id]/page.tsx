import React from "react"
import { redirect } from "next/navigation"
import { featuredCourses } from "@/data"
import { fetchCourseById } from "@/lib/firebase/queries/courses"
// import { Course } from "@/types"
import CourseHeader from "@/components/course/CourseHeader"
import { useCourse } from "@/hooks/courses/useFetchCourseById"
import { CourseWithExtras } from "@/types"
import { mobile, ipad } from "@/responsive"

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
    // export default async function CoursePage({ params }: { params: { id: string } }) {
    // const id = params.id
    const { id } = await params

    if (!id) redirect("/")

    const course: CourseWithExtras | null = await fetchCourseById(id)

    if (!course) redirect("/")

    return <CourseHeader course={course} />
}
