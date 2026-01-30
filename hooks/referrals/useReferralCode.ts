import { useQuery } from "@tanstack/react-query"
import { useAuthReady } from "@/hooks/useAuthReady"

const fetchReferralCode = async (user: any) => {
    const res = await fetch("/api/referrals/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: user.id,
            email: user.email,
        }),
    })

    if (!res.ok) {
        throw new Error("Failed to fetch referral code")
    }

    return res.json()
}

export const useReferralCode = () => {
    const { user } = useAuthReady()

    return useQuery({
        queryKey: ["referralCode", user?.id],
        queryFn: () => fetchReferralCode(user),
        enabled: !!user,
        staleTime: Infinity,
    })
}
