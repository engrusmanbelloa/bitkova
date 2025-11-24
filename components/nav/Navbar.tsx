"use client"
import React, { useState, useRef, ReactElement, useEffect } from "react"
import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/navigation"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import Slide from "@mui/material/Slide"
import IconButton from "@mui/material/IconButton"
import { TransitionProps } from "@mui/material/transitions"
import SearchIcon from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications"
import { Badge } from "@mui/material"
import Logo from "@/components/nav/Logo"
import LoginBtn from "@/components/nav/LoginBtn"
import SignIn from "@/components/auth/SignIn"
import SignUp from "@/components/auth/SignUp"
import DropdownMenu from "@/components/nav/Dropdown"
import NotifyModal from "@/components/auth/NotifyModal"
import ResetPsswd from "@/components/auth/ResetPsswd"
import NavAvatar from "@/components/nav/Avatar"
import { mobile, ipad } from "@/responsive"
import { signOut, sendEmailVerification, onAuthStateChanged } from "firebase/auth"
import { auth, app } from "@/lib/firebase/firebaseConfig"
import createUserIfNotExists from "@/lib/firebase/uploads/createOrUpdateUserDoc"
import { toast } from "sonner"
import { useAuthReady } from "@/hooks/useAuthReady"
import { useUserStore } from "@/lib/store/useUserStore"
import { syncUserStore } from "@/lib/store/syncUserStore"
import { redirect } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import NavSkeleton from "./NavSkeleton"

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
    z-index: 99;
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
    const queryClient = useQueryClient()
    const [toggleMenu, setToggleMenu] = useState(false)
    const [signin, setSignin] = useState(false)
    const [singUp, setSignUp] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [sentVerification, setSentVerification] = useState(false)
    const [verificationChecked, setVerificationChecked] = useState(false)
    const [notifyModalOpen, setNotifyModalOpen] = useState(false)
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
    const { user, firebaseUser, authReady, error, isLoadingUserDoc } = useAuthReady()
    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    const cartCount = useUserStore((s) => s.cart.length)
    const wishlistCount = useUserStore((s) => s.wishlist.length)
    const main = "true"

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
            href: "/our-hub",
            title: "Our Hub",
        },
        {
            id: 4,
            href: "/my-learning",
            title: "My Learning",
        },
    ]

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
    const handleSignInOpen = async () => {
        if (!user) {
            setSignUp(false)
            setSignin(true)
        } else {
            signOut(auth)
                .then(() => {
                    setCurrentUser(null)
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        }
    }

    const handleSignInClose = async () => {
        if (firebaseUser) {
            await queryClient.invalidateQueries({ queryKey: ["userDoc", firebaseUser.uid] })
            toast.success("Welcome back " + (firebaseUser.displayName || firebaseUser.email))
        }
        setTimeout(() => {
            setSignin(false)
            setCurrentUser(auth.currentUser)
        }, 1000)
    }
    // SingUp Modal transition, open and close functions
    const handleSignUpOpen = async () => {
        if (!user) {
            setSignin(false)
            setSignUp(true)
        } else {
            setSignUp(false)
            toast.success("You are already logged in")
        }
    }

    const handleSignUpClose = async () => {
        if (firebaseUser) {
            await queryClient.invalidateQueries({ queryKey: ["userDoc", firebaseUser.uid] })
        }
        setTimeout(() => {
            setSignUp(false)
        }, 1000)
    }

    // Handle user email verification
    const handleSendVerification = async () => {
        if (!authReady) return // Wait until auth state is ready
        try {
            if (!firebaseUser) {
                toast.error("User not authenticated.")
                return
            }
            await firebaseUser.reload() // Always refresh to get up-to-date emailVerified status
            // console.log("the user is verified? ", auth.currentUser?.emailVerified)
            if (firebaseUser.emailVerified) {
                // Verified, proceed
                setVerificationChecked(true)
                setSentVerification(false)
                setNotifyModalOpen(false)
                toast.success("Email already verified")

                // create user document if verified but not created
                await createUserIfNotExists(firebaseUser)

                const idToken = await firebaseUser.getIdToken() // force refresh
                // Create session
                // await fetch("/api/auth/session", {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify({ idToken }),
                //     credentials: "include",
                // })
                toast.success("Email verification successful")
            } else {
                if (!sentVerification) {
                    await sendEmailVerification(firebaseUser)
                    setSentVerification(true)
                    toast.success("Verification email sent check your inbox/spam")
                } else {
                    toast.success("Verification email already sent to your inbox/spam")
                }
            }
        } catch (error: any) {
            console.log("Faild:", error.message)
            toast.error("Failed to resend verification email. Please try again later.", error)
        }
    }
    // Check if the user confirmed their email
    const handleCheckVerification = async () => {
        if (!authReady) return // Wait until Firebase auth is ready

        try {
            if (!firebaseUser) {
                toast.error("User not authenticated")
                return
            }

            await firebaseUser.reload()
            const isVerified = firebaseUser.emailVerified

            if (!isVerified) {
                toast.info("Email not verified. Please verify your email.")
                return
            }

            // Proceed after successful verification
            setVerificationChecked(true)
            setSentVerification(false)
            setNotifyModalOpen(false)

            // create user document after being verified
            await createUserIfNotExists(firebaseUser)

            const idToken = await firebaseUser.getIdToken() // force refresh
            // const res = await fetch("/api/auth/session", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ idToken }),
            //     credentials: "include",
            // })

            // if (!res.ok) {
            //     const { error } = await res.json()
            //     throw new Error(error || "Session creation failed")
            // }
            // Invalidate the query to force a re-fetch and re-render
            await queryClient.invalidateQueries({ queryKey: ["userDoc", firebaseUser.uid] })
            toast.success("Verification successful, You can now login")
            // window.location.reload()
        } catch (error: any) {
            console.error("Verification error:", error)
            setNotifyModalOpen(true)
            setSentVerification(false)
            toast.error("Failed to check verification status. Please try again later.")
        }
    }
    // close the notification modal
    const notifyModalClose = async () => {
        setNotifyModalOpen(false)
        // await signOut(auth)
        //     .then(() => {
        //         // login = false
        //         toast.success("You have been signed out")
        //     })
        //     .catch((error) => {
        //         toast.error(error.message)
        //     })
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

    useEffect(() => {
        setIsLoading(true)
        // console.log(`Auth is ready state: ${authReady}, checking user state...`)
        const unsubscribe = onAuthStateChanged(auth, async (useEffectUser) => {
            setCurrentUser(useEffectUser)
            // console.log("Auth state changed, user:", useEffectUser)
            if (useEffectUser !== null) {
                await useEffectUser.reload()
                if (!useEffectUser.emailVerified) {
                    // console.log(
                    //     "user verification is : " +
                    //         user.emailVerified +
                    //         ", User logged in :" +
                    //         userLoggedIn,
                    // )
                    // toast.info("User signed in but not verified.")
                    setNotifyModalOpen(true)
                } else {
                    // toast.info("User account verified.")
                    setNotifyModalOpen(false)
                }
                setSignin(false)
                setSignUp(false)
                // const uid = user.uid
                // login = true
                // console.log("user id is : " + uid)
            } else {
                // User is signed out.
                // toast.info("You are not logged in.")
            }
        })

        return () => {
            setIsLoading(false)
            unsubscribe()
        }
    }, [currentUser])

    useEffect(() => {
        if (user) {
            useUserStore.setState({
                cart: user.cart || [],
                wishlist: user.wishList || [],
                enrolledCourses: [],
            })
            syncUserStore(user.id)
                .then(() => {
                    console.log("User store synced successfully")
                })
                .catch((error) => {
                    console.error("Error syncing user store:", error)
                })
        }
    }, [user])

    if (!authReady || isLoadingUserDoc) {
        return (
            <Container>
                <NavSkeleton />
            </Container>
        )
    }

    if (error) {
        return <p>Error Fetching data.</p>
    }

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
                        {/* Right side nav When user is logged in */}
                        {authReady && user && firebaseUser && firebaseUser.emailVerified && (
                            <>
                                <CartsContainer>
                                    <Badge
                                        onClick={() => router.push("/cart")}
                                        badgeContent={cartCount}
                                        color="error"
                                    >
                                        <AddShoppingCartIcon
                                            fontSize="medium"
                                            color="info"
                                            sx={{
                                                m: 1,
                                                cursor: "pointer",
                                                ":hover": {
                                                    color: "#ABD0ED",
                                                },
                                            }}
                                        />
                                    </Badge>
                                    <Badge badgeContent={wishlistCount} color="error">
                                        <FavoriteBorderIcon
                                            fontSize="medium"
                                            color="info"
                                            sx={{
                                                m: 1,
                                                cursor: "pointer",
                                                ":hover": {
                                                    color: "#ABD0ED",
                                                },
                                            }}
                                        />
                                    </Badge>
                                    <Badge badgeContent={0} color="error">
                                        <CircleNotificationsIcon
                                            fontSize="medium"
                                            color="info"
                                            sx={{
                                                m: 1,
                                                cursor: "pointer",
                                                ":hover": {
                                                    color: "#ABD0ED",
                                                },
                                            }}
                                        />
                                    </Badge>
                                </CartsContainer>

                                <NavAvatar user={user.name || user.email} />
                            </>
                        )}
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
                            {/* Right side nav When user is not logged in */}
                            {!user && (
                                <>
                                    <NavBtn onClick={() => router.push("/courses")}>
                                        Browse Courses
                                    </NavBtn>
                                    <LoginBtn $login={false} onClick={handleSignInOpen} />
                                </>
                            )}
                        </>
                        {/* Modal for signup  */}
                        {singUp && (
                            <SignUp
                                handleClose={handleSignUpClose}
                                open={singUp}
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
                            {/* cart icon badge */}
                            <Badge
                                onClick={() => router.push("/cart")}
                                badgeContent={cartCount}
                                color="error"
                            >
                                <AddShoppingCartIcon
                                    fontSize="small"
                                    color="info"
                                    sx={{
                                        m: 1,
                                        cursor: "pointer",
                                        ":hover": {
                                            color: "#ABD0ED",
                                        },
                                    }}
                                />
                            </Badge>
                            {/* wishlist icon badge */}
                            <Badge badgeContent={wishlistCount} color="error">
                                <FavoriteBorderIcon
                                    fontSize="small"
                                    color="info"
                                    sx={{
                                        m: 1,
                                        cursor: "pointer",
                                        ":hover": {
                                            color: "#ABD0ED",
                                        },
                                    }}
                                />
                            </Badge>
                            {/* Notification icon badge */}
                            <Badge badgeContent={0} color="error">
                                <CircleNotificationsIcon
                                    fontSize="small"
                                    color="info"
                                    sx={{
                                        m: 1,
                                        cursor: "pointer",
                                        ":hover": {
                                            color: "#ABD0ED",
                                        },
                                    }}
                                />
                            </Badge>
                            {/* toggle menu icons open and close */}
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
                            {/* Drop down menu for mobile users when successfully logged in */}
                            {toggleMenu && user && firebaseUser && firebaseUser.emailVerified ? (
                                <DropdownMenu
                                    handleSingUpOpen={handleSignInOpen}
                                    closeMenu={() => setToggleMenu(false)}
                                    user={user.name || user.email}
                                />
                            ) : (
                                // {/* Drop down menu for mobile users when not logged in */}
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
