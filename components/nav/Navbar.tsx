// components/nav/Navbar.tsx
"use client"
import React, { useState, useRef, ReactElement, useEffect } from "react"
import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut, sendEmailVerification, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase/firebaseConfig"
import { toast } from "sonner"
// Hooks & Store
import createUserIfNotExists from "@/lib/firebase/uploads/createOrUpdateUserDoc"
import { useAuthReady } from "@/hooks/useAuthReady"
import { useUserStore } from "@/lib/store/useUserStore"
import { syncUserStore } from "@/lib/store/syncUserStore"
import { useQueryClient } from "@tanstack/react-query"
// Mui Components
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
// Components
import Logo from "@/components/nav/Logo"
import LoginBtn from "@/components/nav/LoginBtn"
import DropdownMenu from "@/components/nav/Dropdown"
import NotifyModal from "@/components/auth/NotifyModal"
import NavAvatar from "@/components/nav/Avatar"
import NavSkeleton from "./NavSkeleton"
import { mobile, ipad } from "@/responsive"
import AuthModalManager from "@/components/auth/AuthModalManager"

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
    outline: solid 0.5px ${(props) => props.theme.mobile.offWhite};
    border-radius: 20px;
    height: 35px;
    padding: 5px;
    box-sizing: border-box;
    ${ipad({ display: "none" })};
`
// middle section of the nav bar
const Center = styled.ul`
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
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
    cursor: pointer;
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
    outline: solid 0.5px ${(props) => props.theme.mobile.offWhite};
    height: 20px;
    border-radius: 20px;
    padding: 5px;
    box-sizing: border-box;
    ${ipad({ display: "flex", justifyContent: "center", alignItems: "center" })}
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
    const { user, firebaseUser, authReady, error, isLoadingUserDoc } = useAuthReady()

    // UI State
    const [toggleMenu, setToggleMenu] = useState(false)
    const [isManualVerified, setIsManualVerified] = useState(false)
    const [activeModal, setActiveModal] = useState<"signin" | "signup" | "notify" | "reset" | null>(
        null,
    )

    // Store State
    const cartCount = useUserStore((s) => s.cart.length)
    const wishlistCount = useUserStore((s) => s.wishlist.length)

    const main = "true"
    const isAuthenticated = !!firebaseUser
    const isVerified =
        (firebaseUser?.providerId === "password"
            ? firebaseUser.emailVerified
            : firebaseUser?.emailVerified) || isManualVerified

    // Sync logic
    useEffect(() => {
        let unsubscribe: (() => void) | undefined

        if (user?.id) {
            // This now captures the cleanup function from our refactored syncUserStore
            unsubscribe = syncUserStore(user.id)
            // console.log("Sync started for user:", user.id)
        }

        return () => {
            if (unsubscribe) {
                unsubscribe()
                console.log("Sync cleaned up")
            }
        }
    }, [user?.id])

    // Auth actions
    const handleSignOut = async () => {
        try {
            await signOut(auth)
            queryClient.clear()
            router.push("/")
            toast.success("Signed out successfully")
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    // Handle user email verification
    const handleSendVerification = async () => {
        if (!firebaseUser) {
            toast.error("User not authenticated")
            return
        }

        await firebaseUser.reload()

        if (firebaseUser.emailVerified) {
            await firebaseUser.reload()
            await firebaseUser.getIdToken(true)
            toast.success("Email already verified")
            return
        }

        await sendEmailVerification(firebaseUser)
        toast.success("Verification email sent. Check inbox or spam.")
    }
    const checkVerification = async () => {
        if (!firebaseUser) return
        try {
            await firebaseUser.reload()
            if (firebaseUser.emailVerified) {
                setIsManualVerified(true)
                await createUserIfNotExists(firebaseUser)
                toast.success("Account verified and synced!")
                setActiveModal(null)
            } else {
                toast.error("Please verify your email first.")
            }
        } catch (e) {
            toast.error("Verification check failed.")
        }
    }

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

    if (!authReady || isLoadingUserDoc) {
        return (
            <Container>
                <NavSkeleton />
            </Container>
        )
    }

    if (error) {
        return <Container>Error Fetching data.</Container>
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
                        <Center>
                            {["Insights", "Partnership", "Our Hub", "My Learning"].map((item) => (
                                <Menu
                                    key={item}
                                    onClick={() =>
                                        router.push(`/${item.toLowerCase().replace(" ", "-")}`)
                                    }
                                >
                                    {item}
                                </Menu>
                            ))}
                        </Center>
                    </Center>
                    {/* nav right items container  */}
                    <Right>
                        {/* Right side nav When user is logged in */}
                        {isAuthenticated && isVerified ? (
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

                                <NavAvatar
                                    user={user?.name || firebaseUser.email}
                                    onSignOut={handleSignOut}
                                />
                            </>
                        ) : (
                            // Right side nav When user is not logged in
                            <>
                                <NavBtn onClick={() => router.push("/courses")}>
                                    Browse Courses
                                </NavBtn>
                                <LoginBtn $login={false} onClick={() => setActiveModal("signin")} />
                            </>
                        )}
                        {/* Only show Auth Modals if no user is present */}
                        {!firebaseUser && (
                            <AuthModalManager
                                activeModal={activeModal as any}
                                setActiveModal={setActiveModal as any}
                                Transition={Transition}
                            />
                        )}
                        {/* Notification modal for email verification */}
                        {isAuthenticated && !isVerified && (
                            <NotifyModal
                                open={true}
                                handleNotifyModalClose={() => signOut(auth)}
                                handleCheckVerification={checkVerification}
                                handleSendVerification={handleSendVerification}
                                Transition={Transition}
                            />
                        )}

                        {/* Mobile middle search bar */}
                        <>
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
                        </>
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
                            {toggleMenu && (
                                <DropdownMenu
                                    user={
                                        isAuthenticated && isVerified
                                            ? user?.name || user?.email
                                            : false
                                    }
                                    handleSingUpOpen={() => setActiveModal("signin")}
                                    closeMenu={() => setToggleMenu(false)}
                                />
                            )}
                        </Toggle>
                    </Right>
                </Wrapper>
            </Container>
        </>
    )
}
