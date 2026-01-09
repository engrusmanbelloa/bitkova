// components/admin/adminTabs.tsx
import DashboardOverview from "./DashboardOverview"
import ProfileSection from "./ProfileSection"
import ProfileForm from "./Settings"
import UploadCourse from "./UploadCourse"
import ClassesTabs from "./cohorts/ClassesTabs"
import EnrollStudent from "./EnrollStudent"
import RoleManager from "@/components/auth/RoleManager"
import NoDataAvailable from "./NoData"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt"
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import WidgetsIcon from "@mui/icons-material/Widgets"
import HistoryIcon from "@mui/icons-material/History"
import SettingsIcon from "@mui/icons-material/Settings"

export const ADMIN_TABS = [
    {
        key: "panel",
        icon: <AdminPanelSettingsIcon />,
        label: "Panel",
        component: () => <DashboardOverview />,
    },
    {
        key: "performance",
        icon: <SignalCellularAltIcon />,
        label: "Performance",
        component: (user: any) => <ProfileSection user={user} />,
    },
    {
        key: "course",
        icon: <DriveFolderUploadIcon />,
        label: "Upload Course",
        component: () => <UploadCourse />,
    },
    {
        key: "classes",
        icon: <WidgetsIcon />,
        label: "Classes",
        component: () => <ClassesTabs />,
    },
    {
        key: "student",
        icon: <PersonAddAltIcon />,
        label: "Add Student",
        component: () => <EnrollStudent />,
    },
    {
        key: "instructor",
        icon: <PersonAddAltIcon />,
        label: "Add Instructor",
        component: () => <RoleManager />,
    },
    {
        key: "history",
        icon: <HistoryIcon />,
        label: "Payment History",
        component: () => <NoDataAvailable comment="Coming Soon" />,
    },
    {
        key: "settings",
        icon: <SettingsIcon />,
        label: "Settings",
        component: () => <ProfileForm />,
    },
] as const

export type AdminTabKey = (typeof ADMIN_TABS)[number]["key"]
