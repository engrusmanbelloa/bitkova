import styled from "styled-components"
import DashboardIcon from "@mui/icons-material/Dashboard"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import SchoolIcon from "@mui/icons-material/School"
import StarIcon from "@mui/icons-material/Star"
import QuizIcon from "@mui/icons-material/Quiz"
import HistoryIcon from "@mui/icons-material/History"
import HelpIcon from "@mui/icons-material/Help"
import SettingsIcon from "@mui/icons-material/Settings"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"

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
    const menuItems = [
        { id: "dashboard", icon: <DashboardIcon />, label: "Dashboard" },
        { id: "profile", icon: <AccountCircleIcon />, label: "My Profile" },
        { id: "courses", icon: <SchoolIcon />, label: "Enrolled Courses" },
        { id: "wishlist", icon: <StarIcon />, label: "Wishlist" },
        { id: "quiz", icon: <QuizIcon />, label: "My Quiz Attempts" },
        { id: "history", icon: <HistoryIcon />, label: "Order History" },
        { id: "qa", icon: <HelpIcon />, label: "Question & Answer" },
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
            <NavItem>
                <ExitToAppIcon /> Logout
            </NavItem>
        </SidebarContainer>
    )
}
