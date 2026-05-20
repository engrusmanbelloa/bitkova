"use client"
import styled from "styled-components"
import { useRouter } from "next/navigation"
import { ipad } from "@/responsive"

const Center = styled.ul`
    flex: 2.2;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    height: 40px;
    padding: 10px 0;
    ${ipad({ display: "none" })}
`
const MenuItem = styled.li`
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
    padding: 5px 20px;
    border-radius: 5px;
    cursor: pointer;
    color: ${(props) => props.theme.palette.common.black};

    &:hover {
        background-color: ${(props) => props.theme.palette.action.hover};
        color: ${(props) => props.theme.palette.primary.main};
    }
    &::first-letter {
        text-transform: uppercase;
    }
    ${ipad({ fontSize: 12, padding: "5px 10px" })}
`

const NAV_LINKS = ["Insights", "Partnership", "Our Hub", "My Learning"]

export default function NavCenter() {
    const router = useRouter()
    return (
        <Center>
            {NAV_LINKS.map((item) => (
                <MenuItem
                    key={item}
                    onClick={() => router.push(`/${item.toLowerCase().replace(" ", "-")}`)}
                >
                    {item}
                </MenuItem>
            ))}
        </Center>
    )
}
