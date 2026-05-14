// hooks/classes/useClassCertificate.ts
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { createCertificate } from "@/lib/firebase/uploads/createCertificate"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"

interface UseClassCertificateParams {
    userId?: string
    enrollmentId: string
    classType: "physical_class" | "telegram_class"
    completed: boolean
    existingCertificateId?: string | null
}

const fetchClassCertificate = async (userId: string, enrollmentId: string) => {
    // Source of truth: the enrollment document's certificateId field
    const enrollmentSnap = await getDoc(doc(db!, "enrollments", enrollmentId))
    if (!enrollmentSnap.exists()) return null

    const certId = enrollmentSnap.data()?.certificateId
    if (!certId) return null

    // Verify the cert doc actually exists
    const certSnap = await getDoc(doc(db!, "users", userId, "certificates", certId))
    return certSnap.exists() ? certId : null
}

export function useClassCertificate({
    userId,
    enrollmentId,
    classType,
    completed,
    existingCertificateId,
}: UseClassCertificateParams) {
    const queryClient = useQueryClient()

    // Verify the certificate actually exists in Firestore
    const { data: verifiedCertificateId, isLoading: isVerifying } = useQuery({
        queryKey: ["classCertificate", userId, enrollmentId],
        queryFn: () => fetchClassCertificate(userId!, enrollmentId),
        enabled: !!userId && !!existingCertificateId, // only check if enrollment claims one exists
        staleTime: 5 * 60 * 1000,
    })

    const {
        mutate,
        data: newCertificateId,
        isPending,
    } = useMutation({
        mutationFn: () => createCertificate({ type: classType, userId: userId!, enrollmentId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classCertificate", userId, enrollmentId] })
        },
        onError: (err) => console.error("Failed to create class certificate:", err),
    })

    useEffect(() => {
        // Only create if: period reached, user ready, no verified cert exists, not already creating
        if (!completed || !userId || verifiedCertificateId || isVerifying || isPending) return
        mutate()
    }, [completed, userId, verifiedCertificateId, isVerifying, isPending])

    return {
        certificateId: verifiedCertificateId ?? newCertificateId ?? null,
        isCreating: isPending || isVerifying,
    }
}
