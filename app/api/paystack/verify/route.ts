import { NextRequest, NextResponse } from "next/server"
export async function POST(req: NextRequest) {
    const { reference } = await req.json()

    console.log("Verifying ref:", reference)
    //  console.log("Using secret:", process.env.PAYSTACK_SECRET_KEY?.slice(0, 10))

    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
    })

    const payload = await res.json()

    //  console.log("Paystack verify response:", payload)

    if (!payload.status) {
        return NextResponse.json({ error: payload.message }, { status: 400 })
    }

    if (payload.data.status !== "success") {
        return NextResponse.json({ error: "Transaction not successful" }, { status: 400 })
    }

    return NextResponse.json({ ok: true })
}

// const existing = await getDocs(
//   query(
//     collection(db, "users", userId, "enrollments"),
//     where("itemId", "==", itemId),
//     where("type", "==", classType)
//   )
// )

// if (!existing.empty) {
//   console.log("User already enrolled, skipping write")
//   return
// }
