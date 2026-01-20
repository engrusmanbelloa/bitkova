// components/dashboard/SideBar.tsx
"use client"
import styled from "styled-components"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import Link from "next/link"
import { ExitToApp, ChangeCircle } from "@mui/icons-material"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase/client"
import { mobile } from "@/responsive"
import { DashboardTabKey, DASHBOARD_TABS } from "@/components/dashboard/dashboardTabs"

const drawerWidth = 260
const SidebarContainer = styled.div`
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`
const SidebarWrapper = styled.div`
    ${mobile(`
    display: none;
  `)}
`
const MobileMenuButton = styled(IconButton)`
    display: none;
    ${mobile(
        (props: any) => `
        display: block;
        position: fixed;
        background: ${props.theme.palette.primary.main};
        width: 40px;
        height: 40px;
        align-items: center;
        top: 55px;
        left: 16px;
        color:${props.theme.palette.common.white};
        z-index: 1300;
    `,
    )};
`
const MenuList = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    ${mobile(`
    margin-top: 0px;
  `)}
`
const Hr = styled.hr`
    width: 100%;
    border-top: 0.5px solid ${(props) => props.theme.mobile.offWhite};
    margin: 10px 0 5px;
    padding: 0;
`
const NavItem = styled.a<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    padding: 10px;
    color: ${(props) =>
        props.$active ? props.theme.palette.common.white : props.theme.palette.common.black};
    background: ${(props) => (props.$active ? props.theme.palette.primary.main : "transparent")};
    text-decoration: none;
    text-transform: capitalize;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        background: ${(props) => props.theme.palette.action.hover};
        color: ${(props) => props.theme.palette.common.black};
    }

    svg {
        margin-right: 10px;
        color: ${(props) =>
            props.$active ? props.theme.palette.common.white : props.theme.palette.primary.main};
    }
`
const StyledIconButton = styled(IconButton)`
    display: block;
    position: relative;
    width: 40px;
    height: 40px;
    align-items: center;
    top: 5px;
    left: 200px;
    background: ${(props) => props.theme.mobile.lightAsh};
    color: red;
    z-index: 1300;
`

export default function Sidebar({
    isAuthorized,
    activeItem,
    onSelect,
    drawerOpen,
    setDrawerOpen,
}: any) {
    const renderMenu = () => (
        <MenuList>
            {DASHBOARD_TABS.map((item) => (
                <NavItem
                    key={item.key}
                    $active={activeItem === item.key}
                    onClick={() => onSelect(item.key)}
                >
                    {item.icon} {item.label}
                </NavItem>
            ))}

            <Hr />

            {/* <BottomActions> */}
            {isAuthorized && (
                <NavItem as={Link} href="/console" onClick={() => setDrawerOpen(false)}>
                    <ChangeCircle />
                    Admin Panel
                </NavItem>
            )}

            <NavItem
                onClick={async () => {
                    await signOut(auth)
                    setDrawerOpen(false)
                }}
            >
                <ExitToApp />
                Logout
            </NavItem>
            {/* </BottomActions> */}
        </MenuList>
    )

    return (
        <SidebarContainer>
            {/* Mobile toggle */}
            {/* <MobileMenuButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
            </MobileMenuButton> */}
            <MobileMenuButton
                onClick={(e) => {
                    e.currentTarget.blur()
                    setDrawerOpen(true)
                }}
            >
                <MenuIcon />
            </MobileMenuButton>

            {/* Desktop */}
            <SidebarWrapper>{renderMenu()}</SidebarWrapper>

            {/* Mobile Drawer */}
            <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ sx: { width: drawerWidth } }}
            >
                <StyledIconButton onClick={() => setDrawerOpen(false)}>
                    <CloseIcon />
                </StyledIconButton>
                {renderMenu()}
            </Drawer>
        </SidebarContainer>
    )
}
