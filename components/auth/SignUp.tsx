import React, { useState, useRef } from "react"
import styled from "styled-components"
import Dialog from "@mui/material/Dialog"
import GoogleIcon from "@mui/icons-material/Google"
import AppleIcon from "@mui/icons-material/Apple"
import { mobile, ipad } from "@/responsive"
import IsLoading from "@/components/IsLoading"

const Container = styled(Dialog)`
    padding: ${(props) => props.theme.paddings.pagePadding};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.mobile.mobileNavBg};
`
const LeftSide = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const RightSide = styled.div`
    flex: 1;
    padding: 20px;
`
const Title = styled.h2`
    margin-bottom: 0px;
`
const InputContainer = styled.div`
    margin: 0 auto 10px;
    width: 440px;
    padding: 0;
    text-align: center;
    ${ipad({ width: 290 })};
    ${mobile({ width: 260 })};
`
const Start = styled.p`
    margin: 5px 0 25px;
`
const Input = styled.input`
    width: 92%;
    padding: 10px;
    margin: 10px auto 0;
    border: 1px solid ${(props) => props.theme.mobile.offWhite};
    border-radius: 30px;
    &:focus {
        outline: none;
    }
`
const OrLoginWith = styled.p`
    text-align: center;
    margin: 15px auto 7px;
`
const OrLoginWithRule = styled.hr`
    width: 100%;
    border: none;
    border-top: 1px solid ${(props) => props.theme.mobile.offWhite};
    margin-top: 10px;
`
const Button = styled.button`
    width: 97%;
    height: 35px;
    margin: 7px auto 0 6px;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.common.white};
    border: none;
    border-radius: 30px;
    padding: 10px 20px;
    cursor: pointer;
    ${ipad({ marginLeft: 0, width: "99%" })};
    ${mobile({ width: 260 })};
`
const SocialButton = styled.button`
    width: 99%;
    height: 35px;
    background-color: ${(props) => props.theme.palette.common.white};
    border: 1px solid ${(props) => props.theme.mobile.offWhite};
    outline: none;
    border-radius: 30px;
    padding: 10px 20px;
    margin: 7px auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ImagesContainer = styled.section`
    height: 300px;
    padding: auto;
    background-color: #faf;
`
const Images = styled.img`
    width: 300px;
    margin: auto;
`
const Footer = styled.div`
    text-align: center;
`
const TrustedBy = styled.p`
    margin-bottom: 10px;
    font-size: 12px;
`
const PasswordChar = styled.p`
    margin: -10px 0px 0px 5px;
    font-size: 10px;
    line-height: 1.5;
    color: red;
    ${ipad({ width: 280, marginTop: 2, fontSize: 13 })}
    ${mobile({ width: 250, fontSize: 11 })}
`
const SignUpLink = styled.a`
    color: ${(props) => props.theme.palette.primary.main};
    text-decoration: none;
`

export default function SignUp({ handleClose, open, Transition, handleSignInOpen }) {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [passwordMismatchError, setPasswordMismatchError] = useState("")
    const [hasErrors, setHasErrors] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const passwordCharError = "Passwords at least 8 char include uppercase, lowercase, numbers"
    const passwordMismatch = "Passwords do not match"
    const emailErrorMsg = "Invalid email address"
    const hasFieldErrors = emailError || passwordError || passwordMismatchError

    if (emailError || passwordError || passwordMismatchError) {
    }

    const handleEmailChange = (event) => {
        const newEmail = event.target.value
        setEmail(newEmail)

        // Email validation using a regular expression
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        if (!emailRegex.test(newEmail)) {
            setEmailError(emailErrorMsg)
        } else {
            setEmailError("")
        }
    }

    const handlePasswordChange = (event: any) => {
        const newPassword = event.target.value
        setPassword(newPassword)
        // handle password validation and complexity
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        if (!newPassword || !passwordRegex.test(newPassword)) {
            setPasswordError(passwordCharError)
        } else {
            setPasswordError("")
        }
    }

    const handleConfirmPasswordChange = (event: any) => {
        setConfirmPassword(event.target.value)
        if (password !== confirmPassword) {
            setPasswordMismatchError(passwordMismatch)
        } else {
            setPasswordMismatchError("")
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        setIsLoading(true)

        // ... (Your sign-in logic here)

        setIsLoading(false)
    }

    return (
        <Container
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <RightSide>
                <Title>Create a free account</Title>
                <Start>Start your learning experience today</Start>
                <form onSubmit={handleSubmit}>
                    <SocialButton>
                        <GoogleIcon sx={{ color: "red" }} />
                        <p style={{ marginLeft: 5 }}>Google</p>
                    </SocialButton>
                    <SocialButton>
                        <AppleIcon />
                        <p style={{ marginLeft: 5 }}>Apple</p>
                    </SocialButton>
                    <OrLoginWith>Or Signup with Email</OrLoginWith>
                    <InputContainer>
                        <Input
                            placeholder="Enter your email"
                            name="email"
                            required
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <Input
                            placeholder="Enter password"
                            name="password"
                            required
                            type="password"
                            value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            onChange={handlePasswordChange}
                        />
                        <Input
                            placeholder="Confirm password"
                            name="ConfirmPassword"
                            required
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </InputContainer>
                    <PasswordChar>
                        {passwordError
                            ? passwordError
                            : passwordMismatchError
                              ? passwordMismatchError
                              : emailError && emailError}
                    </PasswordChar>
                    {/* || passwordError || passwordMismatchError || emailError */}
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                Signing up <IsLoading />
                            </>
                        ) : (
                            "Sign up"
                        )}
                    </Button>
                </form>
                <Footer>
                    <p>
                        Already have an account?{" "}
                        <SignUpLink onClick={handleSignInOpen} href="#">
                            Sign In
                        </SignUpLink>
                    </p>
                    <TrustedBy>Trusted by 10,000+ Learners</TrustedBy>
                </Footer>
            </RightSide>
            {/* <DialogActions>
                <CloseIcon onClick={handleClose}>Disagree</CloseIcon>
            </DialogActions> */}
        </Container>
    )
}
