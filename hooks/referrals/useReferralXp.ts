import { useQuery } from "@tanstack/react-query"

const fetchXp = async (userId: string) => {
    const res = await fetch(`/api/referrals/xp?userId=${userId}`)
    if (!res.ok) throw new Error("Failed to fetch XP")
    return res.json()
}

export const useReferralXp = (userId?: string) => {
    return useQuery({
        queryKey: ["referralXp", userId],
        queryFn: () => fetchXp(userId!),
        enabled: !!userId,
    })
}
