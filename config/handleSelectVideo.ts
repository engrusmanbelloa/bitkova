import React, { useState } from "react"
// const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
// const [selectedTitle, setSelectedTitle] = useState<string | null>(null)

import { VideoSelectionProps } from "@/types"

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
