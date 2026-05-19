"use client"
import styled from "styled-components"
import { useRouter } from "next/navigation"
import { Badge } from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications"
import NavAvatar from "@/components/nav/Avatar"
import LoginBtn from "@/components/nav/LoginBtn"
import { ipad } from "@/responsive"

const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`
const CartsContainer = styled.div`
    display: flex;
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
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.palette.action.hover};
        color: ${(props) => props.theme.palette.primary.main};
    }
    ${ipad({ display: "none" })};
`

interface NavRightProps {
    isAuthenticated: boolean
    isVerified: boolean
    cartCount: number
    wishlistCount: number
    userName: string | null | undefined
    onSignOut: () => void
    onSignInOpen: () => void
}

export default function NavRight({
    isAuthenticated,
    isVerified,
    cartCount,
    wishlistCount,
    userName,
    onSignOut,
    onSignInOpen,
}: NavRightProps) {
    const router = useRouter()

    if (isAuthenticated && isVerified) {
        return (
            <Right>
                <CartsContainer>
                    <Badge
                        onClick={() => router.push("/cart")}
                        badgeContent={cartCount}
                        color="error"
                    >
                        <AddShoppingCartIcon
                            fontSize="medium"
                            color="info"
                            sx={{ m: 1, cursor: "pointer" }}
                        />
                    </Badge>
                    <Badge badgeContent={wishlistCount} color="error">
                        <FavoriteBorderIcon
                            fontSize="medium"
                            color="info"
                            sx={{ m: 1, cursor: "pointer" }}
                        />
                    </Badge>
                    <Badge badgeContent={0} color="error">
                        <CircleNotificationsIcon
                            fontSize="medium"
                            color="info"
                            sx={{ m: 1, cursor: "pointer" }}
                        />
                    </Badge>
                </CartsContainer>
                <NavAvatar user={userName} onSignOut={onSignOut} />
            </Right>
        )
    }

    return (
        <Right>
            <NavBtn onClick={() => router.push("/courses")}>Browse Courses</NavBtn>
            <LoginBtn $login={false} onClick={onSignInOpen} />
        </Right>
    )
}
