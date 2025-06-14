export default function extractPreviewVideo(modules: any[]) {
    // export const extractPreviewVideo = (modules: any[]): string => {
    if (modules?.length > 0 && modules[0]?.links?.length > 0) {
        const firstLinkObj = modules[0].links[0]
        const firstLinkKey = Object.keys(firstLinkObj)[0]
        return firstLinkObj[firstLinkKey]
    }
    return ""
}
