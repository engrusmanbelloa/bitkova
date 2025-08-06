import React from "react"
import { redirect } from "next/navigation"
import CourseHeader from "@/components/course/CourseHeader"

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    if (!id) redirect("/")

    return <CourseHeader courseId={id} />
}
