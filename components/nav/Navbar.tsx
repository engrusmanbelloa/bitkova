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
import { mobile, ipad } from "@/responsive"

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
    // const { data: session } = useSession()
    const [toggleMenu, setToggleMenu] = useState(false)
    const [session, setSession] = useState(false)
    const [singin, setSignin] = useState(false)
    const main = "true"
    const login = true

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

    const handleClickOpen = () => {
        setSignin(true)
    }

    const handleClose = () => {
        setSignin(false)
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

    const { cart } = useStore()

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
                        {session ? (
                            <NavBtn>Browse Courses</NavBtn>
                        ) : (
                            <>
                                <NavBtn>Browse Courses</NavBtn>
                                <LoginBtn $login={login} onClick={handleClickOpen} />
                            </>
                        )}
                        {/* Modal for login  */}
                        {singin && (
                            <SignIn
                                open={singin}
                                handleClose={handleClose}
                                Transition={Transition}
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
