// app/api/setRole/route.ts
import { NextResponse } from "next/server"
import { adminApp, adminAuth, adminDb } from "@/lib/firebase/admin"
import { UserRole } from "@/types/userType"

// const auth = getAuth(adminApp)

// Maps app roles → Firebase custom claims
const ROLE_TO_CLAIM_MAP: Record<UserRole["role"], string> = {
    guest: "guest",
    student: "student",
    instructor: "instructor",
    admin: "admin",
    blog_admin: "blogAdmin",
    event_manager: "eventManager",
    business_dev: "businessDev",
}

// Roles tracked in Firestore for email/notification lookup
const TRACKED_ROLES: UserRole["role"][] = [
    "admin",
    "instructor",
    "event_manager",
    "business_dev",
    "blog_admin",
]

export async function POST(req: Request) {
    try {
        const { email, role } = (await req.json()) as {
            email?: string
            role?: UserRole["role"] | "none"
        }

        if (!email || !role) {
            return NextResponse.json({ error: "Missing email or role" }, { status: 400 })
        }

        // 🔐 AUTH
        const authHeader = req.headers.get("Authorization")
        if (!authHeader?.startsWith("Bearer ")) {
            console.log("401 Unauthorized")
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const decoded = await adminAuth.verifyIdToken(authHeader.replace("Bearer ", ""))

        // Custom claims are available directly on the decoded token
        const isAdmin = decoded.admin === true
        const isInstructor = decoded.instructor === true

        // console.log("Decoded claims: ", {
        //     admin: isAdmin,
        //     instructor: isInstructor,
        // })

        // 🔒 Only admins can manage roles
        if (decoded.admin !== true) {
            return NextResponse.json({ error: "Forbidden: Admin role required" }, { status: 403 })
        }

        // 🚨 Only super-admins can assign admin
        if (role === "admin" && decoded.superAdmin !== true) {
            return NextResponse.json(
                { error: "Only super admins can assign admin role" },
                { status: 403 },
            )
        }

        // 👤 TARGET USER
        const user = await adminAuth.getUserByEmail(email)
        const currentClaims = user.customClaims ?? {}

        // 🧹 Clear all managed role claims
        const cleanedClaims = { ...currentClaims }
        Object.values(ROLE_TO_CLAIM_MAP).forEach((claim) => {
            delete cleanedClaims[claim]
        })

        // ➕ Apply new role
        if (role !== "none") {
            cleanedClaims[ROLE_TO_CLAIM_MAP[role]] = true
        }

        await adminAuth.setCustomUserClaims(user.uid, cleanedClaims)

        // 📄 Update staffRoles collection for tracked roles (for email/notification targeting)
        const staffRef = adminDb.collection("staffRoles").doc(user.uid)

        if (role !== "none" && TRACKED_ROLES.includes(role as UserRole["role"])) {
            await staffRef.set(
                {
                    uid: user.uid,
                    email: user.email,
                    role,
                    claim: ROLE_TO_CLAIM_MAP[role as UserRole["role"]],
                    assignedAt: new Date(),
                },
                { merge: true },
            )
        } else {
            // Role removed or non-tracked role (guest/student) — remove from staff collection
            await staffRef.delete()
        }

        return NextResponse.json({
            ok: true,
            success: true,
            message:
                role === "none"
                    ? "All roles removed successfully"
                    : `${role.replace(/_/g, " ")} role assigned successfully`,
        })
    } catch (err: any) {
        console.error("Role assignment failed:", err)

        if (err?.code === "auth/user-not-found") {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ error: "Failed to update role" }, { status: 500 })
    }
}
