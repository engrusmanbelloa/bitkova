import React, { useState, ComponentType, useRef } from "react"
import styled from "styled-components"
import Dialog from "@mui/material/Dialog"
import GoogleIcon from "@mui/icons-material/Google"
import AppleIcon from "@mui/icons-material/Apple"
import { mobile, ipad } from "@/responsive"
import AuthButton from "@/components/auth/AuthButton"
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth"
import { initializeApp } from "firebase/app"

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
const Button = styled.button`
    width: 97%;
    height: 35px;
    margin: 5px auto 0 7px;
    text-align: center;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.common.white};
    border: none;
    border-radius: 30px;
    cursor: pointer;
    ${ipad({ marginLeft: 3, width: "99%" })};
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
const SignUpLink = styled.a`
    color: ${(props) => props.theme.palette.primary.main};
    text-decoration: none;
`

export default function SignIn({
    handleClose,
    open,
    Transition,
    handleSingUpOpen,
}: {
    handleClose: () => void
    open: boolean
    Transition: ComponentType<any>
    handleSingUpOpen: () => void
}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [signInStatus, setSignInStatus] = useState("initial")

    const firebaseConfig = {
        apiKey: "AIzaSyCzfxvifvLm9l__D2PVoC-mI97KOds8U7M",
        authDomain: "bitkova-digital-hub.firebaseapp.com",
        projectId: "bitkova-digital-hub",
        storageBucket: "bitkova-digital-hub.firebasestorage.app",
        messagingSenderId: "541818898111",
        appId: "1:541818898111:web:2d0d7dfdf9e80e86d9680a",
        measurementId: "G-STF7K5WZFX",
    }
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    // Sign up user
    const handleSignIn = async (event: any) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            setTimeout(() => {
                setSignInStatus("success")
            }, 10000)
            // alert(user.email + " Account created successfully")
            console.log(user)
        } catch (error: any) {
            const errorCode = error.code
            const errorMessage = error.message
            console.error("Error creating account:", errorMessage, " ", errorCode)
            setSignInStatus("error")
            console.log(errorMessage)
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
                <form onSubmit={handleSignIn}>
                    <SocialButton>
                        <GoogleIcon sx={{ color: "red" }} />
                        <p style={{ marginLeft: 5 }}>Google</p>
                    </SocialButton>
                    <SocialButton>
                        <AppleIcon />
                        <p style={{ marginLeft: 5 }}>Apple</p>
                    </SocialButton>
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
                            <RememberMeCheckbox type="checkbox" />
                            <RememberMeLabel>Remember me</RememberMeLabel>
                        </RememberMe>
                        <ForgotPassword href="#">Forgot Password?</ForgotPassword>
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
            {/* <DialogActions>
                <CloseIcon onClick={handleClose}>Disagree</CloseIcon>
            </DialogActions> */}
        </Container>
    )
}
