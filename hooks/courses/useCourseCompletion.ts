// hooks/courses/useCourseCompletion.ts
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { useUserStore } from "@/lib/store/useUserStore"
import { createCertificate } from "@/lib/firebase/uploads/createCertificate"
import { useQueryClient } from "@tanstack/react-query"
import { useFetchCertificateStatus } from "./useFetchCertificate"
import { Enrollment } from "@/types/userType"

interface UseCourseCompletionProps {
    courseId: string
    firebaseUser: any
    course: any
    videoList: { title: string; url: string }[]
    selectedTitle: string
}

export const useCourseCompletion = ({
    courseId,
    firebaseUser,
    course,
    videoList,
    selectedTitle,
}: UseCourseCompletionProps) => {
    const queryClient = useQueryClient()

    const { data: status, isLoading } = useFetchCertificateStatus(firebaseUser?.uid, courseId)

    // const completedVideos = status?.completedVideos || []
    const certificateReady = status?.certificateExists || false
    const enrollment = useUserStore((s) =>
        s.enrollments.find((e) => e.itemId === courseId && e.itemType === "async_course"),
    )

    const completedVideos = enrollment?.completedVideos ?? status?.completedVideos ?? []

    const handleCompletedVideos = async () => {
        if (!selectedTitle || completedVideos.includes(selectedTitle) || !firebaseUser?.uid) {
            return
        }

        const userId = firebaseUser.uid
        const updatedList = [...completedVideos, selectedTitle]
        const enrollmentId = `${userId}-${courseId}`

        // Optimistically update the UI
        queryClient.setQueryData(["certificateStatus", userId, courseId], {
            ...status,
            completedVideos: updatedList,
        })

        try {
            const enrollmentRef = doc(db, "enrollments", enrollmentId)

            await updateDoc(enrollmentRef, {
                completedLessons: updatedList.length,
                completedVideos: updatedList,
                progress: (updatedList.length / videoList.length) * 100,
            })

            // const courseRef = doc(db, "users", userId, "enrolledCourses", enrollmentId)
            // await updateDoc(courseRef, {
            //     completedLessons: updatedList.length,
            //     completedVideos: updatedList,
            //     progress: (updatedList.length / videoList.length) * 100,
            // })

            const isEnrolled = useUserStore.getState().isEnrolled(courseId)
            if (!isEnrolled) {
                const enrolledCourse: Enrollment = {
                    id: enrollmentId,
                    userId,
                    itemType: "async_course",
                    itemId: courseId,
                    completedLessons: updatedList.length,
                    progress: (updatedList.length / videoList.length) * 100,
                    status: "in progress",
                    enrolledAt: new Date(),
                }
                useUserStore.getState().addEnrollment(enrolledCourse)
            }

            if (updatedList.length === videoList.length) {
                // Get the new certificate ID from the function
                const newCertId = await createCertificate(userId, courseId)
                useUserStore.getState().addToCompletedCourses({
                    userId,
                    courseId,
                    completedAt: new Date(),
                })

                // Invalidate the query to refetch the latest data, including the new ID
                await queryClient.invalidateQueries({
                    queryKey: ["certificateStatus", userId, courseId],
                })
            }
        } catch (error) {
            console.error("Failed to update course completion or issue certificate:", error)
            queryClient.invalidateQueries({ queryKey: ["certificateStatus", userId, courseId] })
        }
    }

    return {
        completedVideos,
        certificateReady,
        handleCompletedVideos,
        isLoading,
        certificateId: status?.certificateId,
        issuedAt: status?.issuedAt ?? new Date(), // Include issuedAt if available
    }
}
