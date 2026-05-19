// components/nav/Navbar.tsx
"use client"
import { useEffect, useRef, ReactElement } from "react"
import styled from "styled-components"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase/client"
import { Slide } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { useAuthReady } from "@/hooks/useAuthReady"
import { useUserStore } from "@/lib/store/useUserStore"
import { syncUserStore } from "@/lib/store/syncUserStore"
import { useNavAuth } from "@/components/nav/useNavAuth"
import NavLeft from "@/components/nav/NavLeft"
import NavCenter from "@/components/nav/NavCenter"
import NavRight from "@/components/nav/NavRight"
import NavMobile from "@/components/nav/NavMobile"
import NavSkeleton from "@/components/nav/NavSkeleton"
import NotifyModal from "@/components/auth/NotifyModal"
import AuthModalManager from "@/components/auth/AuthModalManager"
import { ipad, mobile } from "@/responsive"

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
export default function Navbar() {
    const { user, firebaseUser, authReady, error, isLoadingUserDoc } = useAuthReady()
    const cartCount = useUserStore((s) => s.cart.length)
    const wishlistCount = useUserStore((s) => s.wishlist.length)

    const {
        isVerified,
        activeModal,
        setActiveModal,
        handleSignOut,
        handleSendVerification,
        checkVerification,
    } = useNavAuth(firebaseUser)

    const isAuthenticated = !!firebaseUser

    // Slide transition for modals
    const Transition = ({
        children,
        ...props
    }: TransitionProps & { children: ReactElement<any, any> }) => {
        const ref = useRef(null)
        return (
            <Slide direction="up" ref={ref} {...props}>
                {children}
            </Slide>
        )
    }

    // Sync store when user is ready
    useEffect(() => {
        if (!user?.id) return
        const unsubscribe = syncUserStore(user.id)
        return () => unsubscribe()
    }, [user?.id])

    if (!authReady || isLoadingUserDoc) {
        return (
            <Container>
                <NavSkeleton />
            </Container>
        )
    }

    if (error) {
        return <Container>Error fetching data.</Container>
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <NavLeft />
                    <NavCenter />
                    <NavRight
                        isAuthenticated={isAuthenticated}
                        isVerified={isVerified}
                        cartCount={cartCount}
                        wishlistCount={wishlistCount}
                        userName={user?.name || firebaseUser?.email}
                        onSignOut={handleSignOut}
                        onSignInOpen={() => setActiveModal("signin")}
                    />
                    <NavMobile
                        isAuthenticated={isAuthenticated}
                        isVerified={isVerified}
                        cartCount={cartCount}
                        wishlistCount={wishlistCount}
                        userName={user?.name}
                        userEmail={firebaseUser?.email}
                        onSignInOpen={() => setActiveModal("signin")}
                        onSignUpOpen={() => setActiveModal("signup")}
                    />
                </Wrapper>
            </Container>

            {/* Auth modals — only when no user */}
            {!firebaseUser && (
                <AuthModalManager
                    activeModal={activeModal as any}
                    setActiveModal={setActiveModal as any}
                    Transition={Transition}
                />
            )}

            {/* Email verification modal */}
            {isAuthenticated && !isVerified && (
                <NotifyModal
                    open={true}
                    handleNotifyModalClose={() => signOut(auth)}
                    handleCheckVerification={checkVerification}
                    handleSendVerification={handleSendVerification}
                    Transition={Transition}
                />
            )}
        </>
    )
}
