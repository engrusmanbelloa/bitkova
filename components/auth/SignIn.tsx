import React, { useState, useRef } from "react"
import styled from "styled-components"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import CloseIcon from "@mui/icons-material/Close"
import GoogleIcon from "@mui/icons-material/Google"
import AppleIcon from "@mui/icons-material/Apple"

const Container = styled(Dialog)`
    height: 700px;
    width: ${(props) => props.theme.widths.dsktopWidth};
    margin: auto;
    padding: ${(props) => props.theme.paddings.pagePadding};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    background-color: #403;
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
    margin-bottom: 20px;
    width: 345px;
`
const InputContainer = styled.div`
    margin: 0 auto 20px;
    width: 440px;
`
const InputLabel = styled.label`
    display: block;
    margin-bottom: 5px;
`
const Input = styled.input`
    width: 95%;
    padding: 10px;
    margin-top: 0px;
    border: 1px solid #ccc;
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
`
const ForgotPassword = styled.a`
    color: #007bff;
    text-decoration: none;
    margin-left: 10px;
`
const OrLoginWith = styled.p`
    text-align: center;
    margin: 20px 0;
`
const Button = styled.button`
    width: 99%;
    height: 40px;
    margin: 5px auto;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 30px;
    padding: 10px 20px;
    cursor: pointer;
`
const SocialButton = styled.button`
    width: 99%;
    height: 40px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 30px;
    padding: 10px 20px;
    margin: 5px auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
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
            sx={{}}
        >
            <LeftSide>Left</LeftSide>
            <RightSide>
                <Title>Welcome back, sign in</Title>
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <InputLabel>Enter your email</InputLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>Create a password</InputLabel>
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
                    <OrLoginWith>Or login with</OrLoginWith>
                    <SocialButton>
                        <GoogleIcon sx={{ color: "red" }} />
                        <p style={{ marginLeft: 5 }}>Google</p>
                    </SocialButton>
                    <SocialButton>
                        <AppleIcon />
                        <p style={{ marginLeft: 5 }}>Apple</p>
                    </SocialButton>
                </form>
            </RightSide>
            {/* <DialogActions>
                <CloseIcon onClick={handleClose}>Disagree</CloseIcon>
            </DialogActions> */}
        </Container>
    )
}
