"use client"
import styled from "styled-components"
import CircularProgress from "@mui/material/CircularProgress"
import { mobile, ipad } from "@/responsive"

const SetUpdate = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    margin: 10px auto;
    color: #fff;
    width: 10%;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid;
    box-shadow: 5px 5px ${(props) => props.theme.mobile.offWhite};
    text-align: center;
    background: ${(props) => props.theme.palette.primary.main};
    ${ipad({ width: "80%" })}
    ${mobile({})}
`

export default function IsLoading() {
    return (
        <SetUpdate>
            Loading
            <CircularProgress size={18} sx={{ ml: 2, color: "seashell" }} />
        </SetUpdate>
    )
}
