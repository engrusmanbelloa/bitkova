// components/dashboard/dashboardTabs.tsx
import DashboardOverview from "./DashboardOverview"
import ProfileSection from "./ProfileSection"
import ProfileForm from "./Settings"
import InProgressCourses from "@/components/course/InProgressCourses"
import NoDataAvailable from "./NoData"
import DashboardIcon from "@mui/icons-material/Dashboard"
import {
    AccountCircle,
    School,
    Star,
    Quiz,
    History,
    Help,
    Redeem,
    Settings,
} from "@mui/icons-material"
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"

export const DASHBOARD_TABS = [
    {
        key: "dashboard",
        icon: <DashboardIcon />,
        label: "Dashboard",
        component: (user: any) => <DashboardOverview userData={user} />,
    },
    {
        key: "profile",
        icon: <AccountCircle />,
        label: "My Profile",
        component: (user: any) => <ProfileSection user={user} />,
    },
    {
        key: "learning",
        icon: <School />,
        label: "My Learning",
        component: (user: any) => <InProgressCourses userData={user} />,
    },
    {
        key: "referral",
        icon: <Redeem />,
        label: "Referrals",
        component: (user: any) => <NoDataAvailable comment="Coming Soon" />,
    },
    {
        key: "certificate",
        icon: <WorkspacePremiumIcon />,
        label: "Certificates",
        component: () => <NoDataAvailable comment="Coming Soon" />,
    },
    {
        key: "wishlist",
        icon: <Star />,
        label: "Wishlist",
        component: () => <NoDataAvailable comment="Coming Soon" />,
    },
    {
        key: "quiz",
        icon: <Quiz />,
        label: "Quiz Attempts",
        component: () => <NoDataAvailable comment="Coming Soon" />,
    },
    {
        key: "history",
        icon: <History />,
        label: "Order History",
        component: () => <NoDataAvailable comment="Coming Soon" />,
    },
    {
        key: "qa",
        icon: <Help />,
        label: "Q & A",
        component: () => <NoDataAvailable comment="Coming Soon" />,
    },
    {
        key: "settings",
        icon: <Settings />,
        label: "Settings",
        component: () => <ProfileForm />,
    },
] as const

export type DashboardTabKey = (typeof DASHBOARD_TABS)[number]["key"]
