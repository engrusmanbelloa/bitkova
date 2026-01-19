import React, { useState, useRef, ChangeEvent, useEffect } from "react"
import styled from "styled-components"
import Image from "next/image"
import { getAuth } from "firebase/auth"
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { mobile, ipad } from "@/responsive"
import { Toaster, toast } from "sonner"
import useNetworkStatus from "@/components/auth/useNetworkStatus"

const Container = styled.div`
    padding: 10px;
    max-width: 800px;
    margin: auto;
`
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
    cursor: pointer;
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
export default function ProfileForm() {
    const isOnline = useNetworkStatus()
    const [cover, setCover] = useState<string>("/cover.png")
    const [profile, setProfile] = useState<string>("/avater.png")
    const inputRef = useRef<HTMLInputElement>(null)
    const [uid, setUid] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        skill: "",
        bio: "",
    })

    const auth = getAuth()
    const db = getFirestore()
    const storage = getStorage()

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
    const uploadImage = async (fileDataUrl: string, path: string) => {
        const response = await fetch(fileDataUrl)
        const blob = await response.blob()
        const imageRef = ref(storage, path)
        await uploadBytes(imageRef, blob)
        return getDownloadURL(imageRef)
    }
    const handleSave = async () => {
        if (!isOnline) {
            toast.error("You are offline. Please connect to the internet to save.")
            return
        }
        if (!uid) return

        setSaving(true)
        toast.loading("Saving profile...")
        try {
            const userRef = doc(db, "users", uid)
            const updates: any = {
                name: `${form.firstName} ${form.lastName}`,
                phoneNumber: form.phone,
                skill: form.skill,
                bio: form.bio,
            }

            if (cover.startsWith("data:")) {
                const url = await uploadImage(cover, `users/${uid}/cover.jpg`)
                updates.coverUrl = url
            }
            if (profile.startsWith("data:")) {
                const url = await uploadImage(profile, `users/${uid}/profile.jpg`)
                updates.profileUrl = url
            }

            await updateDoc(userRef, updates)
            console.log("Profile updated successfully")
            toast.dismiss()
            toast.success("Profile updated successfully!")
        } catch (error) {
            console.error("Error saving profile:", error)
            toast.dismiss()
            toast.error("Failed to save profile.")
        } finally {
            setSaving(false)
        }
    }
    useEffect(() => {
        const user = auth.currentUser
        if (user) {
            setUid(user.uid)
            const fetchUser = async () => {
                const docRef = doc(db, "users", user.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    const data = docSnap.data()
                    setForm({
                        firstName: data.name?.split(" ")[0] || "",
                        lastName: data.name?.split(" ")[1] || "",
                        email: data.email || "",
                        phone: data.phoneNumber || "",
                        skill: data.skill || "",
                        bio: data.bio || "",
                    })
                    if (data.coverUrl) setCover(data.coverUrl)
                    if (data.profileUrl) setProfile(data.profileUrl)
                }
            }
            fetchUser()
        }
    }, [])
    return (
        <Container>
            <UploadContainer>
                <Image src={cover} alt="Cover" fill={true} />
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
