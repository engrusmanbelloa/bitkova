import styled from "styled-components"
import GoogleIcon from "@mui/icons-material/Google"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import {
    getProviders,
    useSession,
    signIn,
    signOut,
    getCsrfToken,
    getSession,
} from "next-auth/react"
import React, { useState } from "react"
import { useRouter } from "next/router"
import { mobile, ipad } from "../responsive"

const Container = styled.div`
    border-top: 1px solid #cddeff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`

const Wrapper = styled.div`
    width: 35%;
    height: 70vh;
    margin: 30px auto;
    background:
        linear-gradient(rgba(28, 56, 121, 0.5), rgba(28, 56, 121, 0.5)),
        url("/intro.jpg") center;
    background-size: cover;
    border-radius: 20%;
    ${ipad({ width: "100%", height: "100%", margin: "10px", borderRadius: "75px" })}
`

const Box = styled.div`
    width: 80%;
    height: 80%;
    margin: 10px 0px;
    padding: 10px 20px 20px;
    position: relative;
    left: 7%;
    top: 5%;
    text-align: center;
    background-color: #cddeff;
    opacity: 0.8;
    color: #000;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
    line-spacing: 1.5;
    border-radius: 20px;
    ${mobile({ width: "75%", borderRadius: "30px" })}
`

const Title = styled.h1`
    font-size: 24px;
    margin: 10px;
    font-weight: 400;
`

const Input = styled.input`
    flex: 1;
    margin: 10px;
    padding: 10px;
    font-size: 16px;
    font-weight: 400;
`

const Button = styled.button`
    width: 100%;
    border: none;
    padding: 10px 20px;
    background: #1c3879;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    margin-bottom: 10px;
`

const Link = styled.a`
    margin: 5px 0px;
    text-decoration: underline;
    cursor: pointer;
`

const Social = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`

const Agreement = styled.span`
    font-size: 20px;
    margin: 10px 0px;
    font-weight: 40;
`

const ErrorSuccess = styled.div`
    font-size: 14px;
    margin: 5px auto;
    font-weight: 400;
    color: red;
`

const Register = () => {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const { data: session, status } = useSession()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        //Validation
        if (!fullname || !email || !username || !password || !confirmPassword) {
            setError("error! make each field is required")
            setTimeout(() => {
                setError("")
            }, 3000)
            setLoading(false)
            return
        }
        //Validate email
        if (!email || !email.includes("@") || !email.includes(".")) {
            setError("Invalid email")
            setTimeout(() => {
                setError("")
            }, 3000)
            setLoading(false)
            return
        }
        // check if the password is valid
        if (!passwordRegExp.test(password)) {
            setError("must be atleast 8 char combination of A-Z, a-z, 0-9")
            setTimeout(() => {
                setError("")
            }, 3000)
            setLoading(false)
            return
        }
        // confirm the password
        if (password !== confirmPassword) {
            setError("password and confirm password must match")
            setTimeout(() => {
                setError("")
            }, 3000)
            setLoading(false)
            return
        }
        //POST form values
        try {
            const res = await fetch("/api/profile/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: fullname,
                    username: username,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                }),
            })
            if (res.ok) {
                setSuccess(true)
                router.push("/login")
            } else if (res.status === 409) {
                setError("*user with same email or username already exists")
                setTimeout(() => {
                    setError("")
                }, 3000)
            }
        } catch (error) {
            console.error(error)
            setError(error)
        }
        setLoading(false)
    }

    if (session) {
        return <div>You have account already</div>
    }

    return (
        <Container>
            <Wrapper>
                <Box>
                    <Title>CREATE AN ACCOUNT</Title>
                    <Form method="post" onSubmit={handleSubmit}>
                        <Input
                            placeholder="Fullname"
                            name="name"
                            required
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                        {/* <Input placeholder="Last name" name="name" required value={lastName} onChange={e => setLastName(e.target.value)} /> */}
                        <Input
                            placeholder="username"
                            name="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            placeholder="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            placeholder="confirm password"
                            type="password"
                            name="confirmPassword"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <Agreement>
                            By creating an account, I consent to the processing of my personal data
                            in accordance with the <b>PRIVACY POLICY</b>
                        </Agreement>
                        {error && <ErrorSuccess>{error}</ErrorSuccess>}
                        {success && <ErrorSuccess>Account created successfully</ErrorSuccess>}
                        <Button>{loading ? "Creating your account..." : "CREATE"}</Button>
                    </Form>
                    <Title>Sign up with</Title>
                    <Social>
                        <GoogleIcon
                            sx={{ color: "#db3236", m: 1, cursor: "pointer", fontSize: 35 }}
                            onClick={() =>
                                signIn("google", { callbackUrl: "http://localhost:3000" })
                            }
                        />
                        <FacebookIcon
                            sx={{ color: "#3b5998", m: 1, cursor: "pointer", fontSize: 35 }}
                        />
                        <TwitterIcon
                            sx={{ color: "#00acee", m: 1, cursor: "pointer", fontSize: 35 }}
                        />
                        <LinkedInIcon
                            sx={{ color: "#0000EE", m: 1, cursor: "pointer", fontSize: 35 }}
                        />
                    </Social>
                </Box>
            </Wrapper>
        </Container>
    )
}

export default Register
