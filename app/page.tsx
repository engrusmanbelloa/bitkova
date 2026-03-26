// app/page.tsx
import HomeComponent from "@/components/home/Home"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Bitkova Digital Hub Ltd | Empowering the Next Generation of African Tech Talent",
    description:
        "Build the tech skills you need for your dream job. Affordable courses for beginners to advanced developers.",
    openGraph: {
        title: "Bitkova Digital Hub Ltd | Empowering the Next Generation of African Tech Talent",
        description:
            "Build the tech skills you need for your dream job. Affordable courses for beginners to advanced developers.",
        url: "https://bitkova.com",
        siteName: "Bitkova Digital Hub Ltd",
        images: [
            {
                url: "slider/2.jpg",
                width: 1200,
                height: 630,
                alt: "Bitkova Digital Hub Ltd",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Bitkova Digital Hub Ltd | Empowering the Next Generation of African Tech Talent",
        description: "Join the next cohort of engineers in Arewa.",
        images: ["slider/2.jpg"],
    },
}

export default async function Home() {
    return <HomeComponent />
}

// // app/page.tsx
// import HomeComponent from "@/components/home/Home"

// export default async function Home() {
//     return <HomeComponent />
// }
