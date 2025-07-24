import styled from "styled-components"
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt"
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import HistoryIcon from "@mui/icons-material/History"
import SettingsIcon from "@mui/icons-material/Settings"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { mobile, ipad } from "@/responsive"

const SidebarContainer = styled.div`
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
`
const Hr = styled.hr`
    width: 100%;
    border-top: 0.5px solid ${(props) => props.theme.mobile.offWhite};
    margin: 10px 0 5px;
    padding: 0;
    ${mobile(
        (props: any) => `
                display: none;
            `,
    )}
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

export default function Sidebar({ activeItem, setActiveItem }: any) {
    const router = useRouter()
    const menuItems = [
        { id: "panel", icon: <AdminPanelSettingsIcon />, label: "Panel" },
        { id: "performance", icon: <SignalCellularAltIcon />, label: "Performance" },
        { id: "course", icon: <DriveFolderUploadIcon />, label: "Upload course" },
        { id: "student", icon: <PersonAddAltIcon />, label: "Add student" },
        { id: "instructor", icon: <PersonAddAltIcon />, label: "Add instructor" },
        { id: "history", icon: <HistoryIcon />, label: "Payment History" },
        { id: "settings", icon: <SettingsIcon />, label: "Settings" },
    ]

    return (
        <SidebarContainer>
            {menuItems.map((item) => (
                <NavItem
                    key={item.id}
                    $active={activeItem === item.id}
                    onClick={() => setActiveItem(item.id)}
                >
                    {item.icon} {item.label}
                </NavItem>
            ))}
            <Hr />
            <NavItem href="/dashboard">
                <ChangeCircleIcon /> Switch to user
            </NavItem>
            <NavItem>
                <ExitToAppIcon /> Logout
            </NavItem>
        </SidebarContainer>
    )
}
