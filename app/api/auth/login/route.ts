// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getAuth } from "firebase-admin/auth"
import { getUserByEmail } from "@/lib/firebase/queries/getUserByEmail"

// Custom error types
class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "ValidationError"
    }
}

class DatabaseError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "DatabaseError"
    }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const authHeader = req.headers.get("authorization")
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    try {
        // Parse and validate request body
        const token = authHeader.replace("Bearer ", "")
        const decoded = await getAuth().verifyIdToken(token)
        // const uid = decoded.uid
        const email = decoded.email

        // Ensure email is present and a string before querying the database
        if (!email || typeof email !== "string") {
            return NextResponse.json(
                {
                    success: false,
                    error: "INVALID_TOKEN",
                    message: "Token does not contain a valid email.",
                },
                { status: 400 },
            )
        }

        // Check if user exists in database
        const userExists = await getUserByEmail(email)
        // console.log("User exists:", userExists)

        if (!userExists) {
            return NextResponse.json(
                {
                    success: false,
                    error: "USER_NOT_FOUND",
                    message: "No account found. Please sign up first.",
                },
                { status: 403 },
            )
        }

        return NextResponse.json({
            success: true,
            message: "User verified successfully",
        })
    } catch (error) {
        return handleError(error)
    }
}

// Centralized error handling
function handleError(error: unknown): NextResponse {
    console.error("Auth verification error:", {
        name: error instanceof Error ? error.name : "Unknown",
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
    })

    // Handle different error types
    if (error instanceof z.ZodError) {
        return NextResponse.json(
            {
                success: false,
                error: "VALIDATION_ERROR",
                message: "Invalid request data",
                details: error.errors.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            },
            { status: 400 },
        )
    }

    if (error instanceof ValidationError) {
        return NextResponse.json(
            {
                success: false,
                error: "VALIDATION_ERROR",
                message: error.message,
            },
            { status: 400 },
        )
    }

    if (error instanceof DatabaseError) {
        return NextResponse.json(
            {
                success: false,
                error: "DATABASE_ERROR",
                message: "Unable to verify account. Please try again.",
            },
            { status: 500 },
        )
    }

    // Generic server error
    return NextResponse.json(
        {
            success: false,
            error: "INTERNAL_ERROR",
            message: "An unexpected error occurred. Please try again.",
        },
        { status: 500 },
    )
}
