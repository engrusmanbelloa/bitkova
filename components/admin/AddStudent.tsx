"use client"
import { useState, useEffect } from "react"
import { auth } from "@/lib/firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import { toast } from "sonner"
import styled from "styled-components"
import CircularProgress from "@mui/material/CircularProgress"

const Container = styled.div`
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fdfdfd;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`

const Select = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const Button = styled.button`
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`

export default function EnrollStudent() {
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [targetEmail, setTargetEmail] = useState("")
    const [courseId, setCourseId] = useState("")
    const [loading, setLoading] = useState(true)
    const [isEnrolling, setIsEnrolling] = useState(true)
    const [assignCertificate, setAssignCertificate] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email ?? null)
            } else {
                setUserEmail(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    async function handleEnroll() {
        if (!targetEmail || !courseId || !userEmail) {
            toast.error("Please fill in all fields.")
            return
        }

        setLoading(true)
        try {
            const res = await fetch("/api/enrollStudent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    targetEmail,
                    courseId,
                    enroll: isEnrolling,
                    assignCertificate,
                    requesterEmail: userEmail,
                }),
            })

            const data = await res.json()
            console.log("Response Data:", data)

            if (!res.ok) {
                throw new Error(data.error || "Failed to process request.")
            }

            toast.success(data.message)
            setTargetEmail("")
            setCourseId("")
        } catch (error: any) {
            console.error("Error:", error)
            toast.error(error.message || "Failed to perform action.")
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <CircularProgress />
    if (!userEmail) return <p>Please log in to manage students.</p>

    return (
        <Container>
            <h3>Manage Student Enrollment</h3>
            <Form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleEnroll()
                }}
            >
                <Input
                    type="email"
                    placeholder="Student's Email"
                    value={targetEmail}
                    onChange={(e) => setTargetEmail(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Course ID"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    required
                />
                <CheckboxContainer>
                    <input
                        type="checkbox"
                        id="enrollCheckbox"
                        checked={isEnrolling}
                        onChange={(e) => setIsEnrolling(e.target.checked)}
                    />
                    <label htmlFor="enrollCheckbox">Enroll in Course</label>
                </CheckboxContainer>
                <CheckboxContainer>
                    <input
                        type="checkbox"
                        id="certCheckbox"
                        checked={assignCertificate}
                        onChange={(e) => setAssignCertificate(e.target.checked)}
                    />
                    <label htmlFor="certCheckbox">
                        Assign Certificate (Marks course as completed)
                    </label>
                </CheckboxContainer>
                <Button type="submit" disabled={loading || !targetEmail || !courseId}>
                    {loading ? "Processing..." : "Submit"}
                </Button>
            </Form>
        </Container>
    )
}
