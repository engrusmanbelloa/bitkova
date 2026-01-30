// components/auth/SignUp.tsx
import { useState, ComponentType, useRef, useEffect } from "react"
import styled from "styled-components"
import Dialog from "@mui/material/Dialog"
import GoogleIcon from "@mui/icons-material/Google"
import AppleIcon from "@mui/icons-material/Apple"
import AuthButton from "@/components/auth/AuthButton"
import { mobile, ipad } from "@/responsive"
import {
    getAdditionalUserInfo,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase/client"
import { toast } from "sonner"

const Container = styled(Dialog)`
    margin: auto;
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
interface SignUpProps {
    handleClose: () => void
    open: boolean
    Transition: ComponentType<any>
    handleSignInOpen: () => void
}

export default function SignUp({ open, Transition, handleSignInOpen, handleClose }: SignUpProps) {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [passwordMismatchError, setPasswordMismatchError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [signUpStatus, setSignUpStatus] = useState("initial")
    const [uplineCode, setUplineCode] = useState("")
    const [showRefInput, setShowRefInput] = useState(false)

    // Capture referral code from URL automatically
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const ref = params.get("ref")
        if (ref) {
            setUplineCode(ref)
            setShowRefInput(true)
        }
    }, [])

    // form fields validation and handling
    const passwordCharError = "Passwords at least 8 char include uppercase, lowercase, numbers"
    const passwordMismatch = "Passwords do not match"
    const emailErrorMsg = "Invalid email address"

    const handleEmailChange = (event: any) => {
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
    // Sign up user with email and password then google
    const handleSignUp = async (event: any) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            localStorage.setItem("pendingReferral", uplineCode)
            setSignUpStatus("success")
            toast.success("Account created successfully!")
            setTimeout(() => handleClose(), 2000)
        } catch (error: any) {
            setSignUpStatus("error")
            toast.error(error.message)
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

            // force refresh ID token
            const idToken = await user.getIdToken(true)
            // const idToken = await user.getIdToken(true)
            const info = getAdditionalUserInfo(userCredential)

            // check Firestore users collection
            const userRef = doc(db!, "users", user.uid)
            const userSnap = await getDoc(userRef)

            if (userSnap.exists()) {
                // user already exists in Firestore → ask them to login instead
                toast.error("Account already exists, please login.")
                setSignUpStatus("duplicate")
                // await auth.signOut() // optional: sign them out again
                return
            }

            // if not exists → create user doc
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`,
                },
                body: JSON.stringify({ uplineCode }),
            })

            if (!response.ok) {
                // If API fails (e.g. user already exists or DB error), sign them out
                await auth.signOut()
                toast.error("Account initialization failed.")
                return
            }
            setSignUpStatus("success")
            toast.success(`Welcome ${user.email}`)
            setTimeout(() => handleClose(), 1000)
        } catch (error: any) {
            toast.error("Google Sign-In Failed")
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
                <Title>Create a free account</Title>
                <Start>Start your learning experience today</Start>
                <SocialButton onClick={handleSignInWithGoogle}>
                    <GoogleIcon sx={{ color: "red" }} />
                    <p style={{ marginLeft: 5 }}>Google</p>
                </SocialButton>
                <SocialButton>
                    <AppleIcon />
                    <p style={{ marginLeft: 5 }}>Apple</p>
                </SocialButton>
                <form onSubmit={handleSignUp}>
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
                        {!showRefInput ? (
                            <p
                                style={{
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    color: "#356DF1",
                                    marginTop: "10px",
                                }}
                                onClick={() => setShowRefInput(true)}
                            >
                                Have a referral code?
                            </p>
                        ) : (
                            <Input
                                placeholder="Referral Code (Optional)"
                                value={uplineCode}
                                onChange={(e) => setUplineCode(e.target.value)}
                            />
                        )}
                    </InputContainer>
                    <PasswordChar>
                        {emailError ? emailError : passwordError ? passwordError : ""}
                    </PasswordChar>
                    {/* || passwordError || passwordMismatchError || emailError */}
                    <AuthButton
                        title="Sign Up"
                        isLoading={isLoading}
                        authenticating="Signing up..."
                        authenticated="Sign Up Successful!"
                        authenticationError="Sign Up Failed Retry"
                        authStatus={signUpStatus}
                    />
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
        </Container>
    )
}
