import React, { useState, useRef, ChangeEvent } from "react"
import styled from "styled-components"
import Image from "next/image"
import { mobile, ipad } from "@/responsive"

const Container = styled.div`
    padding: 10px;
    max-width: 800px;
    margin: auto;
`
// ${(props) => props.theme.mobile.offWhite}

const UploadContainer = styled.div`
    position: relative;
    width: 100%;
    height: 250px;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 5px;

    img {
        object-fit: cover;
    }
`
const UploadButton = styled.label`
    position: absolute;
    right: 10px;
    bottom: 20px;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
`
const ProfilePhoto = styled.div`
    position: absolute;
    bottom: 5px;
    left: 5px;
    border: 3px solid ${(props) => props.theme.mobile.offWhite};
    border-radius: 50%;
    width: 80px;
    height: 80px;
    overflow: hidden;
`
const Fields = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 2%;
    margin-top: 50px;

    textarea {
        grid-column: span 2;
        height: 100px;
    }
`
const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 94%;
    ${mobile(
        (props: any) => `
                    width: 87%;
                `,
    )}
`
const TextArea = styled.textarea`
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 94%%;
`
const SaveButton = styled.button`
    margin-top: 2rem;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`

interface ProfileFormProps {
    onSave: (data: FormData) => Promise<void>
}
export default function ProfileForm({ onSave }: ProfileFormProps) {
    const [cover, setCover] = useState<string>("/cover.png")
    const [profile, setProfile] = useState<string>("/avater.png")
    const inputRef = useRef<HTMLInputElement>(null)

    const formRef = useRef<HTMLFormElement>(null)
    const [saving, setSaving] = useState(false)

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        skill: "",
        bio: "",
    })

    const handleImageClick = () => {
        inputRef.current?.click()
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>, type: "cover" | "profile") => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            if (type === "cover") {
                setCover(reader.result as string)
            } else {
                setProfile(reader.result as string)
            }
        }
        reader.readAsDataURL(file)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        console.log("Saving profile:", form)
        // TODO: Upload images and update user profile document in Firestore
    }

    return (
        <Container>
            <UploadContainer>
                <Image src={cover} alt="Cover" layout="fill" />
                <UploadButton htmlFor="coverUpload">Upload Cover Photo</UploadButton>
                <input
                    id="coverUpload"
                    type="file"
                    name="cover"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleImageChange(e, "cover")}
                />
                <ProfilePhoto>
                    <Image
                        src={profile}
                        alt="Profile"
                        width={80}
                        height={80}
                        onClick={handleImageClick}
                    />
                    <input
                        id="profileUpload"
                        type="file"
                        name="profile"
                        accept="image/*"
                        ref={inputRef}
                        hidden
                        onChange={(e) => handleImageChange(e, "profile")}
                    />
                </ProfilePhoto>
            </UploadContainer>

            <Fields>
                <Input
                    placeholder="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                />
                <Input
                    placeholder="Last Name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                />
                <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    readOnly
                    value={form.email}
                    onChange={handleChange}
                />
                <Input
                    placeholder="Phone Number"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                />
                <Input
                    placeholder="Skill/Occupation"
                    name="skill"
                    value={form.skill}
                    onChange={handleChange}
                />
                <TextArea
                    placeholder="Introduce yourself..."
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                />
            </Fields>

            <SaveButton disabled={saving} onClick={handleSave}>
                {saving ? "Saving..." : "Save Profile"}
            </SaveButton>
        </Container>
    )
}
