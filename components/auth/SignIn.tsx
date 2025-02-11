import React, { useState, useRef } from "react"
import styled from "styled-components"
import Dialog from "@mui/material/Dialog"
import GoogleIcon from "@mui/icons-material/Google"
import AppleIcon from "@mui/icons-material/Apple"
import { mobile, ipad } from "@/responsive"

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
    width: 440px;
    ${ipad({ width: 310 })};
    ${mobile({ width: 260 })};
`
const InputLabel = styled.label`
    display: block;
    margin-bottom: 5px;
`
const Input = styled.input`
    width: 95%;
    padding: 10px;
    margin-top: 0px;
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
    margin: 10px 0;
`
const Button = styled.button`
    width: 99%;
    height: 40px;
    margin: 5px auto;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.common.white};
    border: none;
    border-radius: 30px;
    padding: 10px 20px;
    cursor: pointer;
`
const SocialButton = styled.button`
    width: 99%;
    height: 40px;
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
`
const SignUpLink = styled.a`
    color: ${(props) => props.theme.palette.primary.main};
    text-decoration: none;
`

export default function SignIn({ handleClose, open, Transition }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission logic here
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
                <form onSubmit={handleSubmit}>
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
                        <InputLabel>Enter your email</InputLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>Enter password</InputLabel>
                        <Input
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
                    <Button type="submit">Sign in</Button>
                </form>
                <Footer>
                    {/* <TrustedBy>Trusted by 10,000+ Learners</TrustedBy> */}
                    <p>
                        Don't have an account? <SignUpLink href="#">Sign Up now</SignUpLink>
                    </p>
                </Footer>
            </RightSide>
            {/* <DialogActions>
                <CloseIcon onClick={handleClose}>Disagree</CloseIcon>
            </DialogActions> */}
        </Container>
    )
}
