import React, { useState, ComponentType } from "react"
import Dialog from "@mui/material/Dialog"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"
import AuthButton from "@/components/auth/AuthButton"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase/client"

const Container = styled(Dialog)`
    padding: ${(props) => props.theme.paddings.pagePadding};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.mobile.mobileNavBg};
`
const InputContainer = styled.div`
    margin: 20px;
    text-align: center;
    border-radius: 30px;
    ${ipad({ width: 290 })};
    ${mobile({ width: 260 })};
`
const Input = styled.input`
    width: 91%;
    padding: 10px;
    margin: 0px auto 0;
    border: 1px solid ${(props) => props.theme.mobile.offWhite};
    border-radius: 30px;
    &:focus {
        outline: none;
    }
`

export default function ResetPsswd({
    handleClose,
    open,
    Transition,
}: {
    handleClose: () => void
    open: boolean
    Transition: ComponentType<any>
}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [resetStatus, setResetStatus] = useState("initial")

    // reset password functions
    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email)
            setResetStatus("success")
            setTimeout(() => {
                handleClose()
            }, 3000)
            alert("Password reset email sent. Please check your inbox.")
        } catch (error: any) {
            setResetStatus("error")
            setTimeout(() => {
                setResetStatus("initial")
            }, 1000)
            console.log("Error sending password reset email:", error.message)
            alert("Failed to send password reset email. Please try again later.")
        }
    }
    return (
        <>
            <Container
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={handleResetPassword}>
                    <InputContainer>
                        <Input
                            placeholder="Enter your email"
                            name="email"
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* <Input
                placeholder="Enter password"
                name="password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /> */}
                        <AuthButton
                            title="Reset your password"
                            isLoading={isLoading}
                            authenticating="Reseting your password"
                            authenticated="Password Reset Successful!"
                            authenticationError="Reset Failed"
                            authStatus={resetStatus}
                        />
                    </InputContainer>
                </form>
            </Container>
        </>
    )
}
