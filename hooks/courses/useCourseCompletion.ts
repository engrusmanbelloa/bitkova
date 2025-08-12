import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { useUserStore } from "@/lib/store/useUserStore"
import { createCertificate } from "@/lib/firebase/uploads/createCertificate"
import { useQueryClient } from "@tanstack/react-query"
import { useFetchCertificateStatus } from "./useFetchCertificate" // Import the new hook
import { EnrolledCourse } from "@/userType"

interface UseCourseCompletionProps {
    courseId: string
    firebaseUser: any
    course: any
    videoList: { title: string; url: string }[]
    selectedTitle: string
}

// export const useCourseCompletion = ({
//     courseId,
//     firebaseUser,
//     course,
//     videoList,
//     selectedTitle,
// }: UseCourseCompletionProps) => {
//     const queryClient = useQueryClient()

//     // Use the new React Query hook to get certificate status and completed videos
//     const { data: status, isLoading } = useFetchCertificateStatus(firebaseUser?.uid, courseId)

//     // We can now use the data directly from the hook
//     const completedVideos = status?.completedVideos || []
//     const certificateReady = status?.certificateExists || false

//     const handleCompletedVideos = async () => {
//         if (!selectedTitle || completedVideos.includes(selectedTitle) || !firebaseUser?.uid) {
//             return
//         }

//         const userId = firebaseUser.uid
//         const updatedList = [...completedVideos, selectedTitle]

//         // Optimistically update the UI while the Firestore update is in progress
//         queryClient.setQueryData(["certificateStatus", userId, courseId], {
//             certificateExists: certificateReady,
//             completedVideos: updatedList,
//         })

//         try {
//             // Update Firestore with the new completed videos
//             const courseRef = doc(db, "users", userId, "enrolledCourses", courseId)
//             await updateDoc(courseRef, {
//                 completedLessons: updatedList.length,
//                 completedVideos: updatedList,
//             })

//             // Update Zustand store
//             const isEnrolled = useUserStore.getState().isEnrolled(courseId)
//             if (!isEnrolled) {
//                 const enrolledCourse: EnrolledCourse = {
//                     userId,
//                     courseId,
//                     completedLessons: updatedList.length,
//                     progress: (updatedList.length / videoList.length) * 100,
//                     status: "in progress",
//                     enrolledAt: new Date(),
//                 }
//                 useUserStore.getState().addToEnrolledCourses(enrolledCourse)
//             }

//             // If all videos are completed, create the certificate
//             if (updatedList.length === videoList.length) {
//                 await createCertificate(userId, courseId)
//                 useUserStore.getState().addToCompletedCourses({
//                     userId,
//                     courseId,
//                     completedAt: new Date(),
//                 })

//                 // Invalidate the query to refetch the latest data from Firestore
//                 await queryClient.invalidateQueries({
//                     queryKey: ["certificateStatus", userId, courseId],
//                 })
//             }
//         } catch (error) {
//             console.error("Failed to update course completion or issue certificate:", error)
//             // Revert the optimistic update on error
//             queryClient.invalidateQueries({ queryKey: ["certificateStatus", userId, courseId] })
//         }
//     }

//     return { completedVideos, certificateReady, handleCompletedVideos, isLoading }
// }

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

    const completedVideos = status?.completedVideos || []
    const certificateReady = status?.certificateExists || false

    const handleCompletedVideos = async () => {
        if (!selectedTitle || completedVideos.includes(selectedTitle) || !firebaseUser?.uid) {
            return
        }

        const userId = firebaseUser.uid
        const updatedList = [...completedVideos, selectedTitle]

        // Optimistically update the UI
        queryClient.setQueryData(["certificateStatus", userId, courseId], {
            ...status,
            completedVideos: updatedList,
        })

        try {
            const courseRef = doc(db, "users", userId, "enrolledCourses", courseId)
            await updateDoc(courseRef, {
                completedLessons: updatedList.length,
                completedVideos: updatedList,
            })

            const isEnrolled = useUserStore.getState().isEnrolled(courseId)
            if (!isEnrolled) {
                const enrolledCourse: EnrolledCourse = {
                    userId,
                    courseId,
                    completedLessons: updatedList.length,
                    progress: (updatedList.length / videoList.length) * 100,
                    status: "in progress",
                    enrolledAt: new Date(),
                }
                useUserStore.getState().addToEnrolledCourses(enrolledCourse)
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
