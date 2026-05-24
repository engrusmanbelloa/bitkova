// components/admin/adminTabs.tsx
import DashboardOverview from "./DashboardOverview"
import ProfileSection from "./ProfileSection"
import ProfileForm from "./Settings"
import UploadCourse from "./UploadCourse"
import ClassesTabs from "./cohorts/ClassesTabs"
import EnrollStudent from "./EnrollStudent"
import RoleManager from "@/components/auth/RoleManager"
import NoDataAvailable from "./NoData"
import Payouts from "@/components/admin/payments/Payouts"
import AdminQuoteCard from "@/components/admin/quotes/AdminQuotesPanel"
import {
    DriveFolderUpload,
    PersonAddAlt,
    Widgets,
    RequestQuote,
    SignalCellularAlt,
    AdminPanelSettings,
    History,
    Settings,
} from "@mui/icons-material"

export const ADMIN_TABS = [
    {
        key: "panel",
        icon: <AdminPanelSettings />,
        label: "Panel",
        component: () => <DashboardOverview />,
    },
    {
        key: "performance",
        icon: <SignalCellularAlt />,
        label: "Performance",
        component: (user: any) => <ProfileSection user={user} />,
    },
    {
        key: "quotes",
        icon: <RequestQuote />,
        label: "Quotes",
        component: () => <AdminQuoteCard />,
    },
    {
        key: "course",
        icon: <DriveFolderUpload />,
        label: "Manage Courses",
        component: () => <UploadCourse />,
    },
    {
        key: "classes",
        icon: <Widgets />,
        label: "Manage Classes",
        component: () => <ClassesTabs />,
    },
    {
        key: "students",
        icon: <PersonAddAlt />,
        label: "Manage Students",
        component: () => <EnrollStudent />,
    },
    {
        key: "instructor",
        icon: <PersonAddAlt />,
        label: "Manage Instructor",
        component: () => <RoleManager />,
    },
    {
        key: "history",
        icon: <History />,
        label: "Manage Payments",
        component: () => <Payouts />,
    },
    {
        key: "settings",
        icon: <Settings />,
        label: "Settings",
        component: () => <ProfileForm />,
    },
] as const

export type AdminTabKey = (typeof ADMIN_TABS)[number]["key"]
