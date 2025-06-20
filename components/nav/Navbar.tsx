"use client"
import React, { useState, useRef, ReactElement, useEffect } from "react"
import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/navigation"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import Slide from "@mui/material/Slide"
import OutlinedInput from "@mui/material/OutlinedInput"
import IconButton from "@mui/material/IconButton"
import { TransitionProps } from "@mui/material/transitions"
import SearchIcon from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications"
import Logo from "@/components/Logo"
import LoginBtn from "@/components/nav/LoginBtn"
import SignIn from "@/components/auth/SignIn"
import SignUp from "@/components/auth/SignUp"
import DropdownMenu from "@/components/nav/Dropdown"
import NotifyModal from "@/components/auth/NotifyModal"
import ResetPsswd from "@/components/auth/ResetPsswd"
import NavAvatar from "@/components/nav/Avatar"
import { mobile, ipad } from "@/responsive"
import { initializeApp } from "firebase/app"
import { getAuth, signOut, sendEmailVerification, onAuthStateChanged } from "firebase/auth"

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
    animation: pulse;
    animation-duration: 2s;
    ${ipad(
        (props: any) => `
        width: ${props.theme.widths.ipadWidth};
        height: 30px;
        padding: 5px 0;
    `,
    )}
    ${mobile(
        (props: any) => `
        width: ${props.theme.widths.mobileWidth};
        height: 40px;
        background: ${props.theme.mobile.mobileNavBg};
        box-shadow: 0px 4px 4px 0px #00000033;
    `,
    )}
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
    justify-content: space-between;
    margin: 0;
    padding: 0;
    height: 60px;
    ${ipad({ flex: 0.3 })}
    ${mobile({ flex: 0.2 })}
`
const LogoContainer = styled.li`
    margin: 0;
    padding: 0;
`
const SearchContainer = styled.div`
    display: flex;
    flex: 0.8;
    outline: solid 0.5px;
    border-radius: 20px;
    height: 35px;
    ${ipad({ display: "none" })};
`
// middle section of the nav bar
const Center = styled.ul`
    flex: 1.6;
    display: flex;
    justify-content: start;
    align-items: center;
    list-style-type: none;
    width: 657px;
    height: 40px;
    padding: 10px;
    gap: 10px;
    ${ipad({ display: "none" })}
`
const Menu = styled.li`
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
    padding: 5px 25px;
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
    ${mobile({ alignItems: "center" })}
`
const MobileNavMiddle = styled.div`
    display: none;
    margin: auto;
    outline: solid 0.5px;
    height: 25px;
    border-radius: 20px;
    ${ipad({ display: "flex" })}
    ${mobile({ width: 140 })}
`
const CartsContainer = styled.div`
    dislpay: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    ${ipad({ display: "none" })};
`
const NavBtn = styled.button`
    width: 150px;
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
    ${ipad({ display: "none" })};
`
const Toggle = styled.div`
    display: none;
    flex: 0.5;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    text-align: end;
    padding: 0px;
    margin: auto 0;
    height: 30px;
    border-radius: 5px;
    z-index: 99;
    ${ipad({ display: "flex" })}
    ${mobile({})}
`

export default function Navbar() {
    const router = useRouter()
    const [toggleMenu, setToggleMenu] = useState(false)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [signin, setSignin] = useState(false)
    const [singUp, setSignUp] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [sentVerification, setSentVerification] = useState(false)
    const [verificationChecked, setVerificationChecked] = useState(false)
    const [notifyModalOpen, setNotifyModalOpen] = useState(false)
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)

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
                })
                .catch((error) => {
                    alert(error.message)
                })
        }
    }

    const handleSignInClose = () => {
        setTimeout(() => {
            setSignin(false)
        }, 1000)
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
        setTimeout(() => {
            setSignUp(false)
        }, 2000)
    }

    // menu items array
    const menuList = [
        {
            id: 1,
            href: "#",
            title: "Blog",
        },
        {
            id: 2,
            href: "#",
            title: "Be a partner",
        },
        {
            id: 3,
            href: "#",
            title: "Our Hub",
        },
        {
            id: 4,
            href: "#",
            title: "My Learning",
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

    // Handle user email verification
    const handleSendVerification = async () => {
        try {
            if (auth.currentUser && !auth.currentUser.emailVerified) {
                if (!sentVerification) {
                    await sendEmailVerification(auth.currentUser)
                    setSentVerification(true)
                    alert("Verification email sent. Please check your inbox.")
                } else {
                    alert("Verification email already sent, check your inbox")
                }
            }
        } catch (error: any) {
            console.log("Error resending verification email:", error.message)
            alert("Failed to resend verification email. Please try again later.")
        }
    }

    // Check if the user confirmed their email
    const handleCheckVerification = async () => {
        try {
            if (auth.currentUser) {
                await auth.currentUser.reload()
                if (auth.currentUser.emailVerified) {
                    setVerificationChecked(true)
                    setSentVerification(false)
                    setUserLoggedIn(true)
                    setNotifyModalOpen(false)
                    alert("Email verification successful")
                    // console.log(auth.currentUser.emailVerified)
                } else {
                    alert("Email not verified. Please verify your email.")
                    // console.log(auth.currentUser.emailVerified)
                }
            }
        } catch (error: any) {
            // console.error("Error checking email verification:", error.message)
            alert("Failed to check verification status. Please try again later.")
        }
    }

    // close the notification modal
    const notifyModalClose = async () => {
        setNotifyModalOpen(false)
    }
    // forgot password functions open, close the modal
    const handleForgotPasswordOpen = () => {
        setForgotPasswordOpen(true)
        setSignUp(false)
        setSignin(false)
    }

    const handleForgotPasswordClose = () => {
        setForgotPasswordOpen(false)
    }

    // sign out functions
    useEffect(() => {
        setIsLoading(true)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                if (user.emailVerified) {
                    setUserLoggedIn(true)
                    // console.log(
                    //     "user verification is : " +
                    //         user.emailVerified +
                    //         ", User logged in :" +
                    //         userLoggedIn,
                    // )
                } else {
                    setUserLoggedIn(false)
                    setNotifyModalOpen(true)
                }
                setSignin(false)
                setSignUp(false)
                const uid = user.uid
                login = true
                // console.log("user id is : " + uid)
            } else {
                setUserLoggedIn(false)
            }
        })
        if (auth.currentUser && auth.currentUser.emailVerified) {
            setUserLoggedIn(true)
        }

        return () => {
            setIsLoading(false)
            unsubscribe()
        }
    }, [userLoggedIn, signin])

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
                        <SearchContainer>
                            <InputBase
                                sx={{ ml: 1, flex: 2 }}
                                placeholder="Search courses"
                                inputProps={{ "aria-label": "search bitkova" }}
                            />
                            <IconButton type="button" sx={{ m: 0, pr: "10px" }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </SearchContainer>
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
                        {auth.currentUser && auth.currentUser.emailVerified ? (
                            <>
                                <CartsContainer>
                                    <IconButton
                                        type="button"
                                        sx={{
                                            m: 0,
                                            pr: "10px",
                                            color: "#356DF1",
                                            hover: {
                                                backgroundColor: "#776",
                                            },
                                        }}
                                        aria-label="search"
                                    >
                                        <AddShoppingCartIcon
                                            sx={{
                                                fontSize: 30,
                                                m: 1,
                                                hover: {
                                                    background: "red",
                                                },
                                            }}
                                        />
                                        <FavoriteBorderIcon sx={{ fontSize: 30, m: 1 }} />
                                        <CircleNotificationsIcon sx={{ fontSize: 30, m: 1 }} />
                                    </IconButton>
                                </CartsContainer>
                                <NavAvatar user={auth.currentUser.displayName} />
                            </>
                        ) : (
                            <>
                                {/* Mobile middle search bar */}
                                <MobileNavMiddle>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search courses"
                                        inputProps={{ "aria-label": "search bitkova" }}
                                    />
                                    <IconButton
                                        type="button"
                                        sx={{ m: 0, pr: "0" }}
                                        aria-label="search"
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </MobileNavMiddle>
                                <NavBtn onClick={() => router.push("/courses")}>
                                    Browse Courses
                                </NavBtn>
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
                        {signin && (
                            <SignIn
                                open={signin}
                                handleClose={handleSignInClose}
                                Transition={Transition}
                                handleSingUpOpen={handleSignUpOpen}
                                handleForgotPasswordOpen={handleForgotPasswordOpen}
                            />
                        )}
                        {notifyModalOpen && (
                            <NotifyModal
                                open={notifyModalOpen}
                                handleNotifyModalClose={notifyModalClose}
                                handleSendVerification={handleSendVerification}
                                handleCheckVerification={handleCheckVerification}
                                Transition={Transition}
                                verificationChecked={verificationChecked}
                                sentVerification={sentVerification}
                            />
                        )}
                        {forgotPasswordOpen && (
                            <ResetPsswd
                                open={forgotPasswordOpen}
                                handleClose={handleForgotPasswordClose}
                                Transition={Transition}
                            />
                        )}
                        {/* Mobile nav toggler  */}
                        <Toggle>
                            <IconButton
                                type="button"
                                sx={{ m: 0, pr: "10px", color: "#356DF1" }}
                                aria-label="search"
                            >
                                <AddShoppingCartIcon sx={{ fontSize: 20, m: 0.5 }} />
                                <FavoriteBorderIcon sx={{ fontSize: 20, m: 0.5 }} />
                                <CircleNotificationsIcon sx={{ fontSize: 20, m: 0.5 }} />
                            </IconButton>
                            {!toggleMenu ? (
                                <MenuIcon
                                    sx={{ p: 0, m: 0, fontSize: 25 }}
                                    onClick={() => {
                                        setToggleMenu(true)
                                        // console.log("Toggle state changed to " + toggleMenu)
                                    }}
                                />
                            ) : (
                                <CloseIcon
                                    sx={{ p: 0, m: 0, fontSize: 25 }}
                                    onClick={() => {
                                        setToggleMenu(false)
                                    }}
                                />
                            )}
                            {toggleMenu && auth.currentUser && auth.currentUser.emailVerified ? (
                                <DropdownMenu
                                    handleSingUpOpen={handleSignInOpen}
                                    user={auth.currentUser.displayName}
                                    closeMenu={() => setToggleMenu(false)}
                                />
                            ) : (
                                toggleMenu && (
                                    <DropdownMenu
                                        user={false}
                                        handleSingUpOpen={handleSignInOpen}
                                        closeMenu={() => setToggleMenu(false)}
                                    />
                                )
                            )}
                        </Toggle>
                    </Right>
                </Wrapper>
            </Container>
        </>
    )
}
