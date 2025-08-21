import { Box, Skeleton, Stack } from "@mui/material"

export default function NavSkeleton() {
    return (
        <Box
            sx={{
                width: "100%",
                padding: "0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
            }}
        >
            {/* Left side: Logo and Search Bar */}
            <Stack direction="row" spacing={2} alignItems="center">
                {/* Logo */}
                <Skeleton variant="text" width={80} height={32} animation="wave" />

                {/* Search Bar */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        padding: "8px 12px",
                        borderRadius: "24px",
                        border: "1px solid #ccc",
                        width: { xs: "120px", md: "250px" },
                    }}
                >
                    <Skeleton variant="text" width="80%" animation="wave" />
                    <Skeleton variant="circular" width={24} height={24} animation="wave" />
                </Box>
            </Stack>

            {/* Center: Navigation Links */}
            <Stack
                direction="row"
                spacing={4}
                sx={{
                    display: { xs: "none", md: "flex" },
                }}
            >
                <Skeleton variant="text" width={60} height={24} animation="wave" />
                <Skeleton variant="text" width={80} height={24} animation="wave" />
                <Skeleton variant="text" width={70} height={24} animation="wave" />
                <Skeleton variant="text" width={90} height={24} animation="wave" />
            </Stack>

            {/* Right side: Icons and Profile */}
            <Stack direction="row" spacing={2} alignItems="center">
                <Skeleton variant="circular" width={28} height={28} animation="wave" />
                <Skeleton variant="circular" width={28} height={28} animation="wave" />
                <Skeleton variant="circular" width={28} height={28} animation="wave" />
                {/* Profile icon with initials */}
                <Skeleton
                    variant="rectangular"
                    width={40}
                    height={40}
                    animation="wave"
                    sx={{ borderRadius: "50%" }}
                />
            </Stack>
        </Box>
    )
}
