import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material"

export default function CourseCardSkeleton() {
    return (
        <Card sx={{ width: 300, borderRadius: 2 }}>
            <Skeleton variant="rectangular" height={140} animation="wave" />

            <CardContent>
                <Stack spacing={1}>
                    <Skeleton variant="text" width="60%" height={28} animation="wave" />
                    <Skeleton variant="text" width="100%" height={20} animation="wave" />
                    <Skeleton variant="text" width="80%" height={20} animation="wave" />

                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Skeleton variant="text" width="40%" height={20} animation="wave" />
                        <Skeleton variant="text" width="30%" height={20} animation="wave" />
                    </Box>

                    <Box display="flex" gap={1} mt={2}>
                        <Skeleton variant="rectangular" width="50%" height={36} animation="wave" />
                        <Skeleton variant="rectangular" width="50%" height={36} animation="wave" />
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}
