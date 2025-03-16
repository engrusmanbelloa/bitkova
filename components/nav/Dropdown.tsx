import { useState } from "react"
import styled from "styled-components"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
`

const DropdownButton = styled.button`
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
`

const DropdownContent = styled.ul<{ isVisible: boolean }>`
    position: absolute;
    top: 100%;
    left: 0;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    min-width: 150px;
    list-style: none;
    padding: 0;
    margin: 5px 0;
    display: ${({ isVisible }) => (isVisible ? "block" : "none")};
    z-index: 1000;
`

const DropdownItem = styled.li`
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #f0f0f0;
    }
`

export default function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <DropdownContainer>
            <DropdownButton onClick={() => setIsOpen(!isOpen)}>
                Menu {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </DropdownButton>
            <DropdownContent isVisible={isOpen}>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem>Logout</DropdownItem>
            </DropdownContent>
        </DropdownContainer>
    )
}
