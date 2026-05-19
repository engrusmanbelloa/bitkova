"use client"
import { useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/navigation"
import { Badge } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import InputBase from "@mui/material/InputBase"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications"
import DropdownMenu from "@/components/nav/Dropdown"
import { ipad, mobile } from "@/responsive"

const Container = styled.div`
    display: none;
    flex: 7;
    //  background-color: ${(props) => props.theme.mobile.orange};
    ${ipad({ display: "flex" })}
    ${mobile({ display: "flex" })}
`
const Toggle = styled.div`
    display: none;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    text-align: end;
    padding: 0px;
    margin: auto auto auto 5px;
    height: 30px;
    border-radius: 5px;
    z-index: 99;
    ${ipad({ display: "flex" })}
    ${mobile({ flex: 3 })}
`
const MobileSearch = styled.div`
    display: none;
    margin: auto;
    flex: 1.5;
    outline: solid 0.5px ${(props) => props.theme.mobile.offWhite};
    height: 30px;
    border-radius: 20px;
    padding: 5px;
    box-sizing: border-box;
    ${ipad({ display: "flex", justifyContent: "center", alignItems: "center" })}
    ${mobile({ flex: 2 })}
`
/* Auth buttons shown on mobile when not logged in */
const MobileAuthRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`
const MobileSignInBtn = styled.button`
    height: 32px;
    padding: 0 14px;
    font-size: 12px;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: #fff;
    cursor: pointer;
    ${ipad({ padding: "0 8px" })}
`
const MobileSignUpBtn = styled.button`
    height: 32px;
    padding: 0 14px;
    font-size: 12px;
    font-weight: 600;
    border: 1.5px solid ${(props) => props.theme.palette.primary.main};
    border-radius: 6px;
    background: transparent;
    color: ${(props) => props.theme.palette.primary.main};
    cursor: pointer;
    ${ipad({ padding: "0 8px" })}
`

interface NavMobileProps {
    isAuthenticated: boolean
    isVerified: boolean
    cartCount: number
    wishlistCount: number
    userName: string | null | undefined
    userEmail: string | null | undefined
    onSignInOpen: () => void
    onSignUpOpen: () => void
}

export default function NavMobile({
    isAuthenticated,
    isVerified,
    cartCount,
    wishlistCount,
    userName,
    userEmail,
    onSignInOpen,
    onSignUpOpen,
}: NavMobileProps) {
    const router = useRouter()
    const [toggleMenu, setToggleMenu] = useState(false)

    const isLoggedIn = isAuthenticated && isVerified

    return (
        <Container>
            {/* Mobile search bar - always visible on ipad */}
            <MobileSearch>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search courses"
                    inputProps={{ "aria-label": "search bitkova" }}
                />
                <IconButton type="button" sx={{ m: 0, pr: "0" }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </MobileSearch>

            <Toggle>
                {isLoggedIn ? (
                    /* ── Authenticated mobile icons ── */
                    <>
                        <Badge
                            onClick={() => router.push("/cart")}
                            badgeContent={cartCount}
                            color="error"
                        >
                            <AddShoppingCartIcon
                                fontSize="small"
                                color="info"
                                sx={{ m: 1, cursor: "pointer" }}
                            />
                        </Badge>
                        <Badge badgeContent={wishlistCount} color="error">
                            <FavoriteBorderIcon
                                fontSize="small"
                                color="info"
                                sx={{ m: 1, cursor: "pointer" }}
                            />
                        </Badge>
                        <Badge badgeContent={0} color="error">
                            <CircleNotificationsIcon
                                fontSize="small"
                                color="info"
                                sx={{ m: 1, cursor: "pointer" }}
                            />
                        </Badge>
                        {!toggleMenu ? (
                            <MenuIcon
                                sx={{ p: 0, m: 0, fontSize: 25, cursor: "pointer" }}
                                onClick={() => setToggleMenu(true)}
                            />
                        ) : (
                            <CloseIcon
                                sx={{ p: 0, m: 0, fontSize: 25, cursor: "pointer" }}
                                onClick={() => setToggleMenu(false)}
                            />
                        )}
                        {toggleMenu && (
                            <DropdownMenu
                                user={userName || userEmail}
                                handleSingUpOpen={onSignInOpen}
                                closeMenu={() => setToggleMenu(false)}
                            />
                        )}
                    </>
                ) : (
                    /* ── Unauthenticated: sign in + sign up only ── */
                    <MobileAuthRow>
                        <MobileSignInBtn onClick={onSignInOpen}>Sign In</MobileSignInBtn>
                        <MobileSignUpBtn onClick={onSignUpOpen}>Sign Up</MobileSignUpBtn>
                    </MobileAuthRow>
                )}
            </Toggle>
        </Container>
    )
}
