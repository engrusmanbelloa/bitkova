import { VideoSelectionProps } from "@/types/course"

export default function handleSelectVideo({
    setSelectedVideo,
    setSelectedTitle,
    url,
    title,
}: VideoSelectionProps) {
    // const handleSelectVideo = (url: string, title: string) => {
    setSelectedVideo(url)
    setSelectedTitle(title)
    console.log("Selected:", title, url)
}
