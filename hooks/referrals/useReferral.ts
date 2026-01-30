// hooks/referrals/useReferral.ts

import { useReferralCode } from "./useReferralCode"
import { useReferralStats } from "./useReferralStats"

export const useReferral = () => {
    const codeQuery = useReferralCode()
    const statsQuery = useReferralStats()

    return {
        loading: codeQuery.isLoading || statsQuery.isLoading,
        code: codeQuery.data?.referralCode ?? null,
        stats: statsQuery.data ?? {
            referralCount: 0,
            weeklyCount: 0,
        },
    }
}
