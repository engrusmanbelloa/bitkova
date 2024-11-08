import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import styled from "styled-components"
import {
    getProviders,
    useSession,
    signIn,
    signOut,
    getCsrfToken,
    getSession,
} from "next-auth/react"
import GoogleIcon from "@mui/icons-material/Google"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import { mobile, ipad } from "../responsive"
import IsLoading from "../components/IsLoading"

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
    border-radius: 21%;
    ${ipad({ width: "100%", height: "100%", margin: "10px", borderRadius: "30px" })}
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
    ${mobile({ width: "75%" })}
`

const Social = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 400;
    ${mobile({ fontSize: 16 })}
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
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
    font-size: 24px;
    ${mobile({ fontSize: 16, margin: "2px 0" })}
`

const Login = ({ providers, csrfToken }) => {
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    if (status === "loading") {
        return <IsLoading />
    }

    return (
        <Container>
            {status === "unauthenticated" ? (
                <Wrapper>
                    <Box>
                        <Title>SIGN IN</Title>
                        <Form method="post" action="/api/auth/callback/credentials">
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <Input
                                placeholder="email or username"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setLoading(true)
                                    // signIn("credentials", {email: email, password: password, callbackUrl: "http://localhost:3000"}
                                    // signIn("credentials", {email: email, password: password, callbackUrl: "https://bitkova.com/api/auth/callback/google"}
                                    signIn(
                                        "credentials",
                                        { email: email, password: password },
                                        // callbackUrl: "https://bitkova.vercel.app/api/auth/callback/google"
                                    )
                                }}
                                disabled={loading}
                            >
                                LOGIN
                            </Button>
                            <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                            <Link>CREATE A NEW ACCOUNT</Link>
                        </Form>
                        <Title>Sign in with</Title>
                        <Social>
                            <GoogleIcon
                                sx={{ color: "#db3236", m: 1, cursor: "pointer", fontSize: 35 }}
                                onClick={() =>
                                    signIn("google", { callbackUrl: "http://localhost:3000" })
                                }
                                // onClick={() => signIn("google", { callbackUrl: "https://bitkova.com/api/auth/callback/google"})}}
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
            ) : (
                <div>You are signed in already</div>
            )}
        </Container>
    )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: {
            providers,
            csrfToken: await getCsrfToken(context),
        },
    }
}

export default Login
