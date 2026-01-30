import { useQuery } from "@tanstack/react-query"
import { useAuthReady } from "@/hooks/useAuthReady"

interface ReferralStats {
    referralCount: number
    weeklyCount: number
}

const fetchReferralStats = async (userId: string): Promise<ReferralStats> => {
    const res = await fetch(`/api/referrals/stats?userId=${userId}`)

    if (!res.ok) {
        throw new Error("Failed to fetch referral stats")
    }

    return res.json()
}

export const useReferralStats = () => {
    const { user } = useAuthReady()

    return useQuery({
        queryKey: ["referralStats", user?.id],
        queryFn: () => fetchReferralStats(user!.id),
        enabled: !!user,
        staleTime: 1000 * 30, // 30s
    })
}
