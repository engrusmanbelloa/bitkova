"use client"
import React, { useState, useRef, ReactElement, useEffect } from "react"
import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/navigation"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@mui/material/Button"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import useStore from "@/config/store"
import Logo from "@/components/Logo"
import LoginBtn from "@/components/nav/LoginBtn"
import SignIn from "@/components/auth/SignIn"
import SignUp from "@/components/auth/SignUp"
import { mobile, ipad } from "@/responsive"
import { initializeApp } from "firebase/app"
import { onAuthStateChanged } from "firebase/auth"
import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth"

// background-color: ${(props) => props.theme.palette.common.white};

// containers section
const Container = styled.section`
    height: 50px;
    width: ${(props) => props.theme.widths.dsktopWidth};
    margin: 0 auto;
    padding: ${(props) => props.theme.paddings.pagePadding};
    position: sticky;
    top: 0;
    box-shadow: 0px 4px 4px 0px #00000033;
    border-radius: 5px;
    z-index: 1;
    background-color: ${(props) => props.theme.palette.common.white};
    ${ipad({ width: "665px", height: "30px", padding: "5px 0" })}
    ${mobile({
        width: "100%",
        height: "40px",
        background: "#EAF3FB",
        padding: "5px 15px",
        boxShadow: "0px 4px 4px 0px #00000033",
    })}
`
const Wrapper = styled.nav`
    padding: 0;
    margin: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
// left section of the nav bar
const Left = styled.ul`
    flex: 1;
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    height: 60px;
    ${ipad({ flex: 0.6 })}
`
const LogoContainer = styled.li`
    margin: 0;
    padding: 0;
`
// middle section of the nav bar
const Center = styled.ul`
    flex: 2.5;
    display: flex;
    justify-content: start;
    align-items: center;
    list-style-type: none;
    width: 657px;
    height: 40px;
    padding: 10px;
    gap: 10px;
    ${mobile({ display: "none" })}
`
const Menu = styled.li`
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
    padding: 10px 25px;
    border-radius: 5px;
    color: ${(props) => props.theme.palette.common.black};
    &:hover {
        animation: pulse;
        animation-duration: 1s;
        background-color: ${(props) => props.theme.palette.action.hover};
        color: ${(props) => props.theme.palette.primary.main};
    }
    &::first-letter {
        text-transform: uppercase;
    }
    &:focus {
        background-color: ${(props) => props.theme.palette.primary.main};
    }
    color: ${(props) => props.theme.palette.common.black};
    ${ipad({ fontSize: 12, lineHeigh: 14, padding: "5px 10px" })}
    ${mobile({ height: 16, width: "90%" })}
`
// right section of the nav bar
const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    ${mobile({ justifyContent: "center", alignItems: "center" })}
`
const NavBtn = styled.button`
    width: 198px;
    height: 40px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.mobile.offWhite};
    &:hover {
        animation: pulse;
        animation-duration: 1s;
        background-color: ${(props) => props.theme.palette.action.hover};
        color: ${(props) => props.theme.palette.primary.main};
    }
    ${ipad({ width: 110, height: 35, fontSize: "12px", borderRadius: 5 })};
    ${mobile({ display: "none" })};
`
const Toggle = styled.div`
    display: none;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: column;
    text-align: end;
    padding: 0px;
    position: absolute;
    right: 15px;
    top: 10px;
    margin: auto 0;
    border-radius: 5px;
    z-index: 99;
    ${mobile({ display: "block" })}
`

export default function Navbar() {
    const router = useRouter()
    const [toggleMenu, setToggleMenu] = useState(false)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [singin, setSignin] = useState(false)
    const [singUp, setSignUp] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const main = "true"
    let login

    // SingIN Modal transition, open and close functions
    const Transition = ({
        children,
        ...props
    }: TransitionProps & {
        children: ReactElement<any, any>
    }) => {
        const ref = useRef(null)

        return (
            <Slide direction="up" ref={ref} {...props}>
                {children}
            </Slide>
        )
    }

    const handleSignInOpen = () => {
        if (!userLoggedIn) {
            setSignUp(false)
            setSignin(true)
        } else {
            signOut(auth)
                .then(() => {
                    login = false
                    setUserLoggedIn(false)
                    alert("user logged out")
                })
                .catch((error) => {
                    alert(error.message)
                })
        }
    }

    const handleSignInClose = () => {
        setSignin(false)
    }
    // SingUp Modal transition, open and close functions
    const handleSignUpOpen = () => {
        if (!userLoggedIn) {
            setSignin(false)
            setSignUp(true)
        } else {
            alert("You're already logged in")
        }
    }

    const handleSignUpClose = () => {
        setSignUp(false)
    }

    // menu items array
    const menuList = [
        {
            id: 1,
            href: "#",
            title: "Testimonials",
        },
        {
            id: 2,
            href: "#",
            title: "Be a partner",
        },
        {
            id: 3,
            href: "#",
            title: "Offline Class",
        },
        {
            id: 4,
            href: "#",
            title: "Our Hub",
        },
    ]
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

    useEffect(() => {
        setIsLoading(true)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                setUserLoggedIn(true)
                setSignin(false)
                setSignUp(false)
                const uid = user.uid
                login = true
                console.log("user id is : " + uid)
            } else {
                setUserLoggedIn(false)
            }
            setIsLoading(false)
        })
        return () => {
            setIsLoading(false)
            unsubscribe()
        }
    }, [userLoggedIn])

    return (
        <>
            <Container>
                <Wrapper>
                    {/* nav left items container  */}
                    <Left>
                        <LogoContainer>
                            <Link href="/#">
                                <Logo $main={main} />
                            </Link>
                        </LogoContainer>
                    </Left>
                    {/* nav center items container  */}
                    <Center>
                        {menuList.map((item) => (
                            <Link key={item.id} href={item.href}>
                                <Menu>{item.title}</Menu>
                            </Link>
                        ))}
                    </Center>
                    {/* nav right items container  */}
                    <Right>
                        {isLoading ? (
                            <>Loading...</>
                        ) : userLoggedIn ? (
                            <>
                                <NavBtn>Browse Courses</NavBtn>
                                <LoginBtn $login={userLoggedIn} onClick={handleSignInOpen} />
                            </>
                        ) : (
                            <>
                                <NavBtn>Browse Courses</NavBtn>
                                <LoginBtn $login={userLoggedIn} onClick={handleSignInOpen} />
                            </>
                        )}
                        {/* Modal for signup  */}
                        {singUp && (
                            <SignUp
                                open={singUp}
                                handleClose={handleSignUpClose}
                                Transition={Transition}
                                handleSignInOpen={handleSignInOpen}
                            />
                        )}
                        {/* Modal for login  */}
                        {singin && (
                            <SignIn
                                open={singin}
                                handleClose={handleSignInClose}
                                Transition={Transition}
                                handleSingUpOpen={handleSignUpOpen}
                            />
                        )}
                        {/* Mobile nav toggler  */}
                        <Toggle>
                            {!toggleMenu ? (
                                <MenuIcon
                                    sx={{ p: 0, m: 0, fontSize: 30 }}
                                    onClick={() => {
                                        setToggleMenu(true)
                                        // console.log("Toggle state changed to " + toggleMenu)
                                    }}
                                />
                            ) : (
                                <CloseIcon
                                    sx={{ p: 0, m: 0, fontSize: 30 }}
                                    onClick={() => {
                                        setToggleMenu(false)
                                    }}
                                />
                            )}
                            {/* {toggleMenu && (
            
          )} */}
                        </Toggle>
                    </Right>
                </Wrapper>
            </Container>
        </>
    )
}
