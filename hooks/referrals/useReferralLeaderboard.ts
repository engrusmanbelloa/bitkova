// hooks/referrals/useReferralLeaderboard.ts
import { useQuery } from "@tanstack/react-query"

export interface LeaderboardItem {
    rank: number
    name: string
    score: number
}

const fetchLeaderboard = async (): Promise<LeaderboardItem[]> => {
    const res = await fetch("/api/referrals/leaderboard")

    if (!res.ok) {
        throw new Error("Failed to fetch leaderboard")
    }

    return res.json()
}

export const useReferralLeaderboard = () => {
    return useQuery({
        queryKey: ["referralLeaderboard"],
        queryFn: fetchLeaderboard,
        staleTime: 1000 * 60, // 1 minute
        refetchOnWindowFocus: false,
    })
}
