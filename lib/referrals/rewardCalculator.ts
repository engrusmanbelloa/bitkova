// lib/referrals/rewardCalculator.ts
export const XP_RATE = 10 // ₦10 = 1 XP
export const REFERRER_PERCENT = 0.1
export const REFEREE_PERCENT = 0.05

export function calculateReferralXP(price: number) {
    const referrerXP = Math.floor((price * REFERRER_PERCENT) / XP_RATE)
    const refereeXP = Math.floor((price * REFEREE_PERCENT) / XP_RATE)

    return { referrerXP, refereeXP }
}
