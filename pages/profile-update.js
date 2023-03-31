import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import EditIcon from '@mui/icons-material/Edit'
import styled from "styled-components"
import { getProviders, useSession, signIn, signOut, getCsrfToken, getSession } from "next-auth/react"
import {mobile, ipad} from "../responsive"
import Loading from '../components/Loading'

const Container = styled.div`
  border-top: 1px solid #CDDEFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  
`;

const Wrapper = styled.div`
  width: 35%;
  height: 55vh;
  margin: 30px auto;
  text-align: center;
  background: rgba(28, 56, 121, 1);
  border-radius: 10%;
  ${ipad({ width: "100%", height: "100%", margin:"10px", borderRadius: "30px"})}  
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  color: #fff;
  margin: 20px auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  width: 90%;
  margin: 10px auto;
  padding: 10px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 10px;
`;

const Upload = styled.input`
  opacity: 0;
  position: relative;
  bottom: 0px;
  right: 10%;
  width: 15%;
  height: 50%;
  cursor: pointer;
`;

const UploadDiv = styled.div`
  width: 100%;
  height: 20%;
  text-align: center;
  padding: 0;
  color: #fff;
`;

const Button = styled.button`
  width: 25%;
  margin: 10px auto;
  border: none;
  padding: 10px 20px;
  background: #fff;
  font-size: 20px;
  color: #1C3879;
  cursor: pointer;
  border-radius: 10px;
  text-align: center;
  ${mobile({ width: "40%", height: 40})}
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding: 0;
  position: absolute;
  ${ipad({width: "100px", height: "100px",})}
`;

const PicUploadIcon = styled.span`
  padding: 0;
  margin: 0;
  position: relative;
  top: 60px;
  left: 40px;
`;

const ProfileUpdate = () => {
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [bio, setBio] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [createObjectURL, setCreateObjectURL] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const { data: session, status } = useSession()

    useEffect(() => {
      // Preload the form with user info
      if (session) {
        setCreateObjectURL(session.user.image)
        setFullname(session.user.name)
        setUsername(session.user.username)
        setPhone(session.user.phone)
        setBio(session.user.bio)
      }
    }, [session])

    let formData = new FormData()
    const handleChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        setSelectedFile(file)
        const url = URL.createObjectURL(file)
        setCreateObjectURL(url)
    }
    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      formData.append('image', selectedFile)
      formData.append('id', session.user.id)
      formData.append("fullname", fullname)
      formData.append("username", username)
      formData.append("phone", phone)
      formData.append("bio", bio)
      try {
        const response = await fetch("/api/profile/userUpdate", {
          method: "PUT",
          body: formData
        }).then(response => {
          if (response.ok ){
            setSuccess(true)
            setTimeout(() => {
              signOut()
              router.push("/login")
            }, 3000)
          } else {
            setSuccess(false)
          }
        })
      } catch (error) {
        console.error(error)
        setError(error)
      }
        setLoading(false)
      }
     // make sure the user is logged in
      if (!session && status !== "loading") {
        return <div>Not signed in</div>
      }
  return (
  <>
    <Container>
      <Wrapper>
      <Title>Profile update</Title>
      <UploadDiv>
        {error && <div>{error.message}</div>}
        {loading && <div>uploading</div>}
        {success && <div>Profile updated successfully</div>}
        <Img src={createObjectURL} />
        <PicUploadIcon><EditIcon sx={{color: "#3b5998", m: 1,
         cursor: "pointer", position: "relative", fontSize: 30, bgcolor: "#fff", borderRadius: 50}}
         /></PicUploadIcon>
        <Upload accept="image/png, image/jpeg, image/jpg" type="file" required onChange={handleChange} />
      </UploadDiv>
        <Form method="post" onSubmit={handleSubmit}>
          <Input type="text" placeholder="Fullname" required value={fullname} onChange={(e) => setFullname(e.target.value)}/>
          <Input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
          <Input placeholder="Phone" required value={phone} onChange={(e) => setPhone(e.target.value)}/>
          <Input type="text" placeholder="tell us about you in 1 sentence" required value={bio} onChange={(e) => setBio(e.target.value)}/>
          <Button type="submit"  disabled={loading}>Update</Button>
      </Form>
      </Wrapper>
    </Container>
  </>
)}


export default ProfileUpdate
