"use client"
import styled from "styled-components"
import Link from "next/link"
import IconButton from "@mui/material/IconButton"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import SearchBar from "@/components/search/SearchBar"
import Logo from "@/components/nav/Logo"
import { ipad, mobile } from "@/responsive"

const Left = styled.ul`
    flex: 1.6;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    height: 60px;
    ${ipad({ flex: 5, height: "40px" })}
    ${mobile({ flex: 6.5 })}
`
const LogoContainer = styled.li`
    margin: 0;
    padding: 0;
`
export default function NavLeft() {
    return (
        <Left>
            <LogoContainer>
                <Link href="/#">
                    <Logo $main="true" />
                </Link>
            </LogoContainer>

            <SearchBar />
        </Left>
    )
}
