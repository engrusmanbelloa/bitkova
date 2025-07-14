import { useEffect, useState } from "react"
import {
    getUserArchivedCourses,
    getUserCompletedCourses,
    getUserEnrollments,
} from "@/lib/firebase/queries/userCourses"
import { DocumentData } from "firebase/firestore"
import {
    EnrolledCourse,
    WishListItem,
    ArchivedCourse,
    Certificate,
    Cart,
    CompletedCourse,
} from "@/userType"

export function useUserArchivedCourses(userId: string) {
    const [archiveCourses, setarchiveCourses] = useState<DocumentData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return
        const fetch = async () => {
            const result = await getUserArchivedCourses(userId)
            setarchiveCourses(result)
            setLoading(false)
        }
        fetch()
    }, [userId])

    return { archiveCourses, loading }
}

export function useUserCompletedCourses(userId: string) {
    const [completedCourses, setcompletedCourses] = useState<DocumentData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return
        const fetch = async () => {
            const result = await getUserCompletedCourses(userId)
            setcompletedCourses(result)
            setLoading(false)
        }
        fetch()
    }, [userId])

    return { completedCourses, loading }
}
export function useUserEnrolledCourses(userId: string) {
    const [enrolledCourses, setenrolledCourses] = useState<DocumentData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return
        const fetch = async () => {
            const result = await getUserEnrollments(userId)
            setenrolledCourses(result)
            setLoading(false)
        }
        fetch()
    }, [userId])

    return { enrolledCourses, loading }
}
