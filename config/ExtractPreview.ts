export default function extractPreviewVideo(modules: any[]): string {
    if (modules?.length > 0 && modules[0]?.links) {
        const firstLinkEntries = Object.entries(modules[0].links)
        if (firstLinkEntries.length > 0) {
            return firstLinkEntries[0][1] as string // return the first URL
        }
    }
    return ""
}
