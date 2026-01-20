import React, { useState, ComponentType, useRef } from "react"
import styled from "styled-components"
import Dialog from "@mui/material/Dialog"
import GoogleIcon from "@mui/icons-material/Google"
import AppleIcon from "@mui/icons-material/Apple"
import { mobile, ipad } from "@/responsive"
import AuthButton from "@/components/auth/AuthButton"
import {
    signInWithEmailAndPassword,
    browserSessionPersistence,
    browserLocalPersistence,
    setPersistence,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth"
import { auth } from "@/lib/firebase/client"
import { toast } from "sonner"

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
    margin: auto;
`
const Title = styled.h2`
    margin-bottom: 30px;
`
const InputContainer = styled.div`
    margin: 0 auto 10px;
    text-align: center;
    ${ipad({ width: 290 })};
    ${mobile({ width: 260 })};
`
const Input = styled.input`
    width: 91%;
    padding: 10px;
    margin: 10px auto 0;
    border: 1px solid ${(props) => props.theme.mobile.offWhite};
    border-radius: 30px;
    &:focus {
        outline: none;
    }
`
const RememberMeSection = styled.section`
    display: flex;
    justify-content: space-between;
`
const RememberMe = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const RememberMeCheckbox = styled.input`
    margin-right: 5px;
`
const RememberMeLabel = styled.label`
    margin-left: 5px;
    ${mobile({ fontSize: 15 })}
`
const ForgotPassword = styled.a`
    color: ${(props) => props.theme.palette.primary.main};
    text-decoration: none;
    margin-left: 10px;
    ${mobile({ fontSize: 15 })}
`
const OrLoginWith = styled.p`
    text-align: center;
    margin: 15px auto 7px;
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
const SignUpLink = styled.a`
    color: ${(props) => props.theme.palette.primary.main};
    text-decoration: none;
`
interface SignInProps {
    handleClose: () => void
    open: boolean
    Transition: ComponentType<any>
    handleSingUpOpen: () => void
    handleForgotPasswordOpen: () => void
}

export default function SignIn({
    handleClose,
    open,
    Transition,
    handleSingUpOpen,
    handleForgotPasswordOpen,
}: SignInProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [signInStatus, setSignInStatus] = useState("initial")
    const [rememberMe, setRememberMe] = useState(false)

    // Sign in user with email and password then google
    const handleSignIn = async (event: any) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence
            await setPersistence(auth, persistence)
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            const idToken = await user.getIdToken()
            // await fetch("/api/auth/session", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ idToken }),
            //     credentials: "include",
            // })
            setSignInStatus("success")
            setTimeout(() => {
                handleClose()
            }, 1000)
            // alert(user.email + " Account created successfully")
            // console.log("user state persistence is: " + persistence)
        } catch (error: any) {
            // console.log("Signing in error:", errorMessage, " ", errorCode)
            toast.error("Sign In failed/invalid credential ")
            setSignInStatus("error")
            setTimeout(() => {
                setSignInStatus("initial")
            }, 1000)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignInWithGoogle = async () => {
        setIsLoading(true)
        try {
            const provider = new GoogleAuthProvider()
            const userCredential = await signInWithPopup(auth, provider)
            const user = userCredential.user

            // Check if user already exists
            const response = await fetch("api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user.email,
                    uid: user.uid,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                // Sign them out since they shouldn't be signed in
                toast.error("Login failed, make sure you signed up first")
                await auth.signOut()
                // user.delete() // Delete the user created by Google Sign-In
                throw new Error(errorData.message || "Login failed")
            }

            setSignInStatus("success")
            await user.reload()
            setTimeout(() => handleClose(), 1000)
        } catch (error: any) {
            console.log("Google Sign-In error:", error.message)

            if (error.code === "auth/account-exists-with-different-credential") {
                setSignInStatus("Sign In error - Try another method")
            } else {
                setSignInStatus("Sign In failed")
            }

            setTimeout(() => setSignInStatus("initial"), 2000)
        } finally {
            setIsLoading(false)
        }
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
                <Title>Welcome back, sign in</Title>
                <SocialButton onClick={handleSignInWithGoogle}>
                    <GoogleIcon sx={{ color: "red" }} />
                    <p style={{ marginLeft: 5 }}>Google</p>
                </SocialButton>
                <SocialButton>
                    <AppleIcon />
                    <p style={{ marginLeft: 5 }}>Apple</p>
                </SocialButton>
                <form onSubmit={handleSignIn}>
                    <OrLoginWith>Or login with Email</OrLoginWith>
                    <InputContainer>
                        <Input
                            placeholder="Enter your email"
                            name="email"
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="Enter password"
                            name="password"
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputContainer>
                    <RememberMeSection>
                        <RememberMe>
                            <RememberMeCheckbox
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <RememberMeLabel>Remember me</RememberMeLabel>
                        </RememberMe>
                        <ForgotPassword onClick={handleForgotPasswordOpen} href="#">
                            Forgot Password?
                        </ForgotPassword>
                    </RememberMeSection>
                    <AuthButton
                        title="Sign in"
                        isLoading={isLoading}
                        authenticating="Signing in..."
                        authenticated="Sign in Successful!"
                        authenticationError="Sign in Failed"
                        authStatus={signInStatus}
                    />
                </form>
                <Footer>
                    <p>
                        Don't have an account?{" "}
                        <SignUpLink onClick={handleSingUpOpen} href="#">
                            Sign Up now
                        </SignUpLink>
                    </p>
                    <TrustedBy>Trusted by 10,000+ Learners</TrustedBy>
                </Footer>
            </RightSide>
        </Container>
    )
}
