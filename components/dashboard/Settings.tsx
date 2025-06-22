import React, { useState } from "react"
import styled from "styled-components"
import Image from "next/image"
import ProfileForm from "@/components/dashboard/ProfileFormTab"

const Container = styled.div`
    max-width: 800px;
    margin: auto;
`
const TabsWrapper = styled.div`
    display: flex;
    gap: 24px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
`
const Tab = styled.button<{ $isActive: boolean }>`
    background: none;
    border: none;
    padding: 12px 0;
    font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
    color: ${({ $isActive, theme }) => ($isActive ? theme.palette.primary.main : "#555")};
    border-bottom: ${({ $isActive }) => ($isActive ? "2px solid #3b82f6" : "none")};
    cursor: pointer;
    font-size: 16px;
`
// ${(props) => props.theme.mobile.offWhite}

export default function Settings() {
    const [cover, setCover] = useState<string>("/cover.png")
    const [profile, setProfile] = useState<string>("/avater.png")
    const [activeTab, setActiveTab] = useState<"profile" | "password" | "social">("profile")

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        skill: "",
        bio: "",
    })

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "cover" | "profile",
    ) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (type === "cover") setCover(reader.result as string)
                else setProfile(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        console.log("Saving profile:", form)
        // TODO: Upload images and update user profile document in Firestore
    }

    return (
        <Container>
            <TabsWrapper>
                <Tab $isActive={activeTab === "profile"} onClick={() => setActiveTab("profile")}>
                    Profile
                </Tab>
                <Tab $isActive={activeTab === "password"} onClick={() => setActiveTab("password")}>
                    Password
                </Tab>
                <Tab $isActive={activeTab === "social"} onClick={() => setActiveTab("social")}>
                    Social Profile
                </Tab>
            </TabsWrapper>

            {activeTab === "profile" && <ProfileForm />}
            {activeTab === "password" && <>Comming Soon</>}
            {activeTab === "social" && <>Comming Soon</>}
        </Container>
    )
}
