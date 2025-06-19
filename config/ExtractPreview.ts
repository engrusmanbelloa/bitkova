// export default function extractPreviewVideo(modules: any[]) {
//     // export const extractPreviewVideo = (modules: any[]): string => {
//     if (modules?.length > 0 && modules[0]?.links?.length > 0) {
//         const firstLinkObj = modules[0].links[0]
//         const firstLinkKey = Object.keys(firstLinkObj)[0]
//         return firstLinkObj[firstLinkKey]
//     }
//     return ""
// }
export default function extractPreviewVideo(modules: any[]): string {
    if (modules?.length > 0 && modules[0]?.links) {
        const firstLinkEntries = Object.entries(modules[0].links)
        if (firstLinkEntries.length > 0) {
            return firstLinkEntries[0][1] as string // return the first URL
        }
    }
    return ""
}
