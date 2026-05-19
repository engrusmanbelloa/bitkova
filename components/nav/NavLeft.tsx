"use client"
import styled from "styled-components"
import Link from "next/link"
import IconButton from "@mui/material/IconButton"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import Logo from "@/components/nav/Logo"
import { ipad } from "@/responsive"

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
export default function NavLeft() {
    return (
        <Left>
            <LogoContainer>
                <Link href="/#">
                    <Logo $main="true" />
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
    )
}
