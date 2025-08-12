// hooks/courses/useCourseCompletion.ts
import { useState, useEffect } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { useUserStore } from "@/lib/store/useUserStore"
import { createCertificate } from "@/lib/firebase/uploads/createCertificate"
import { EnrolledCourse } from "@/userType"

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
    const [completedVideos, setCompletedVideos] = useState<string[]>([])
    const [certificateReady, setCertificateReady] = useState(false)

    useEffect(() => {
        const fetchCourseStatus = async () => {
            if (!firebaseUser?.uid || !courseId) return

            // Check if certificate already exists
            const userCertRef = doc(
                db,
                "users",
                firebaseUser.uid,
                "certificates",
                `${firebaseUser.uid}_${courseId}`,
            )
            const userCertSnap = await getDoc(userCertRef)
            if (userCertSnap.exists()) {
                setCertificateReady(true)
            }

            // Fetch completed videos from enrolledCourses
            const courseRef = doc(db, "users", firebaseUser.uid, "enrolledCourses", courseId)
            const snap = await getDoc(courseRef)
            if (snap.exists()) {
                const data = snap.data()
                if (data.completedVideos && Array.isArray(data.completedVideos)) {
                    setCompletedVideos(data.completedVideos)
                }
            }
        }

        if (course) {
            fetchCourseStatus()
        }
    }, [course, firebaseUser, courseId])

    const handleCompletedVideos = async () => {
        if (!selectedTitle || completedVideos.includes(selectedTitle)) return

        const userId = firebaseUser?.uid
        if (!userId) return

        const updatedList = [...completedVideos, selectedTitle]
        setCompletedVideos(updatedList)

        // Sync videos watched to Firestore
        const courseRef = doc(db, "users", userId, "enrolledCourses", courseId)
        await updateDoc(courseRef, {
            completedLessons: updatedList.length,
            completedVideos: updatedList,
        })

        // Update Zustand store
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

        // If completed all videos
        if (updatedList.length === videoList.length) {
            try {
                await createCertificate(userId, courseId)
                useUserStore.getState().addToCompletedCourses({
                    userId,
                    courseId,
                    completedAt: new Date(),
                })
                setCertificateReady(true)
            } catch (error) {
                console.error("Failed to issue certificate:", error)
            }
        }
    }

    return { completedVideos, certificateReady, handleCompletedVideos }
}
