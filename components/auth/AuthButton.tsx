import React, { useEffect } from "react"
import styled from "styled-components"
import CircularProgress from "@mui/material/CircularProgress"
import { mobile, ipad } from "@/responsive"

const Button = styled.button`
    width: 97%;
    height: 35px;
    margin: 7px auto 0 6px;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.common.white};
    border: none;
    border-radius: 30px;
    padding: 10px 20px;
    cursor: pointer;
    ${ipad({ marginLeft: 0, width: "99%" })};
    ${mobile({ width: 260 })};
`
interface AuthButtonProps {
    title: string
    isLoading: boolean
    authStatus: string
    authenticating: string | null
    authenticated: string | null
    authenticationError: string | null
}
export default function AuthButton({
    title,
    isLoading = false,
    authStatus = "initial",
    authenticating = null,
    authenticated = null,
    authenticationError = null,
}: AuthButtonProps) {
    useEffect(() => {
        setTimeout(() => {}, 10000)
    }, [authStatus])
    return (
        <Button type="submit" disabled={isLoading}>
            {isLoading ? (
                <>
                    {authenticating} <CircularProgress size={12} sx={{ color: "#fff", ml: 2 }} />
                </>
            ) : authStatus === "success" ? (
                authenticated
            ) : authStatus === "error" ? (
                authenticationError
            ) : (
                title
            )}
        </Button>
    )
}
