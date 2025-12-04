import styled from "styled-components"
import Button, { ButtonProps } from "@mui/material/Button"
import { ipad, mobile } from "@/responsive"

const EnrollButton = styled(Button)<ButtonProps>`
    width: 100%;
    margin-top: 20px;
    background: ${({ theme }) => theme.palette.primary.main};
    color: white;
    text-transform: none;
    font-weight: 500;
    padding: 12px;
    font-size: 16px;

    ${ipad`
        height: 40px;
    `}

    ${mobile`
    `}

    &:hover {
        background: ${({ theme }) => theme.palette.primary.main};
        opacity: 0.9;
    }
`

export default EnrollButton
