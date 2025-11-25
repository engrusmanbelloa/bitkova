import { useQuery } from "@tanstack/react-query"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase/firebaseConfig"
import { useUserStore } from "@/lib/store/useUserStore"

interface CertificateStatus {
    certificateExists: boolean
    completedVideos: string[]
    certificateId?: string
    issuedAt: Date
}

const fetchCertificateStatus = async ({
    userId,
    courseId,
}: {
    userId: string
    courseId: string
}): Promise<CertificateStatus> => {
    // Fetch certificate existence
    const certQuery = query(
        collection(db, "users", userId, "certificates"),
        where("courseId", "==", courseId),
    )
    const certSnap = await getDocs(certQuery)

    const certificateExists = !certSnap.empty
    const certificateId = certSnap.docs[0]?.id // Get the first result's ID, if it exists
    const issuedAt = certSnap.docs[0]?.data()?.issuedAt // Get issuedAt if available

    //  return { certificateExists, completedVideos }
    const courseRef = doc(db, "users", userId, "enrolledCourses", courseId)
    const courseSnap = await getDoc(courseRef)
    const completedVideos: string[] = courseSnap.exists()
        ? courseSnap.data()?.completedVideos || []
        : []

    return { certificateExists, completedVideos, certificateId, issuedAt }
}

export const useFetchCertificateStatus = (userId: string | undefined, courseId: string) => {
    return useQuery({
        queryKey: ["certificateStatus", userId, courseId],
        queryFn: () => fetchCertificateStatus({ userId: userId!, courseId }),
        enabled: !!userId,
    })
}
