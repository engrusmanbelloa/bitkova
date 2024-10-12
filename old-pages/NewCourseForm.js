import { useState, useEffect } from "react"
import styled from "styled-components"
import { mobile, ipad } from "../responsive"
import { useRouter } from "next/router"
import {
    getProviders,
    useSession,
    signIn,
    signOut,
    getCsrfToken,
    getSession,
} from "next-auth/react"

const Container = styled.div`
    border-top: 1px solid #cddeff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`

const Wrapper = styled.div`
    width: 50%;
    height: 100%;
    margin: 30px auto;
    text-align: center;
    background: rgba(28, 56, 121, 1);
    border-radius: 4%;
    ${ipad({ width: "100%", height: "100%", margin: "10px", borderRadius: "30px" })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 400;
    color: #fff;
    margin: 5px 0 auto;
    ${mobile({ marginLeft: 10, fontSize: 20 })}
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    color: #fff;
    text-align: left;
    margin: 0px 10px 0 40px;
    ${ipad({ marginLeft: 30 })}
    ${mobile({ marginLeft: 10, width: 200 })}
`

const TextArea = styled.textarea`
    flex: 1;
    width: 90%;
    margin: 10px auto;
    padding: 10px;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    border-radius: 10px;
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 200;
    outline: none;
    height: 50px;
    ${mobile({ margin: "10px 10px" })}
`
const Option = styled.option`
    font-size: 20px;
    font-weight: 300;

    &:checked {
        background: rgba(28, 56, 121, 1);
        color: white;
    }

    &:hover {
        background: rgba(28, 56, 121, 1);
        color: white;
    }
`

const Input = styled.input`
    width: 90%;
    margin: 10px auto;
    padding: 10px;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    border-radius: 10px;
`

const VidDiv = styled.div`
    ${"" /* width: 90%; */}
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    margin: 5px auto;
    padding: 0;
    color: #fff;
    ${mobile({})}
`

const VidLabel = styled.label`
    color: #fff;
    text-align: left;
    margin: 0px 10px 0 40px;
    font-size: 20px;
    ${ipad({ marginLeft: 30 })}
`

const VidInput = styled.input`
    width: 50%;
    margin: 5px 20px;
    padding: 10px;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    border-radius: 10px;
    ${mobile({ width: "85%", margin: "5px auto" })}
`

const ImgDiv = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: start;
    height: 100%;
    padding: 5px;
    margin: 5px auto;
    color: #fff;
`

const CreateButton = styled.button`
    width: 50%;
    margin: 10px auto;
    border: none;
    padding: 10px 20px;
    background: #fff;
    font-size: 20px;
    color: #1c3879;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${mobile({ width: "80%", height: 35 })}
`

const Button = styled.button`
    width: 25%;
    height: 30px;
    margin: 5px auto;
    border: none;
    padding: 10px 20px;
    background: #fff;
    font-size: 16px;
    color: #1c3879;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${mobile({ width: "50%", height: 30 })}
`

const UploadDiv = styled.div`
    width: 100%;
    height: 20%;
    text-align: center;
    padding: 0;
    color: #fff;
    ${ipad({ height: "100px" })}
    ${mobile({ height: "65px" })}
`

const SetUpdate = styled.div`
    font-size: 18px;
    margin: 10px auto;
    font-weight: 400;
    color: #fff;
    width: 10%;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid;
    box-shadow: 5px 5px #cddeff;
    text-align: center;
    background: rgba(28, 56, 121, 1);
    ${ipad({ width: "50%" })}
    ${"" /* ${mobile({height: "65px",})} */}
`

const NewCourseForm = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [about, setAbout] = useState("")
    const [duration, setDuration] = useState("")
    const [price, setPrice] = useState("")
    const [whatYouWillLearn, setWhatYouWillLearn] = useState([])
    const [content, setContent] = useState([])
    const [tags, setTags] = useState()
    const [reviews, setReviews] = useState({})
    const [image, setImage] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [creating, setCreating] = useState(false)
    const [success, setSuccess] = useState(false)
    const [lessons, setLessons] = useState([])
    const [update, setUpdate] = useState(false)
    const router = useRouter()
    const { data: session, status } = useSession()

    // lessons handler
    const handleAddLesson = () => {
        setLessons([...lessons, { title: "", videos: [{ title: "", link: "" }], pdfs: [] }])
    }

    const updateTitle = (e, lessonIndex) => {
        const updatedLessons = [...lessons]
        updatedLessons[lessonIndex].title = e.target.value
        setLessons(updatedLessons)
    }

    // const handleVideoUpload = (e, lessonIndex) => {
    //   const selectedFiles = e.target.files
    //   const lesson = lessons[lessonIndex]
    //   const updatedLesson = {
    //     ...lesson,
    //     videos: [...selectedFiles],
    //   }
    //   const updatedLessons = [    ...lessons.slice(0, lessonIndex),    updatedLesson,    ...lessons.slice(lessonIndex + 1),  ]
    //   setLessons(updatedLessons)
    // }

    const updateVideoTitle = (event, lessonIndex, videoIndex) => {
        const newLessons = [...lessons]
        newLessons[lessonIndex].videos[videoIndex].title = event.target.value
        setLessons(newLessons)
    }

    const updateVideoLink = (event, lessonIndex, videoIndex) => {
        const newLessons = [...lessons]
        newLessons[lessonIndex].videos[videoIndex].link = event.target.value
        setLessons(newLessons)
    }

    const handleAddVideo = (lessonIndex) => {
        const newLessons = [...lessons]
        newLessons[lessonIndex].videos.push({ title: "", link: "" })
        setLessons(newLessons)
    }

    const handlePDFUpload = (e, lessonIndex) => {
        const selectedFiles = e.target.files
        const lesson = lessons[lessonIndex]
        const updatedLesson = {
            ...lesson,
            pdfs: [...lesson.pdfs, ...selectedFiles],
        }
        const updatedLessons = [
            ...lessons.slice(0, lessonIndex),
            updatedLesson,
            ...lessons.slice(lessonIndex + 1),
        ]
        setLessons(updatedLessons)
    }

    const lessonData = lessons.map((lesson) => {
        const { title, videos, pdfs } = lesson
        return {
            title,
            videos,
            pdfs,
        }
    })

    // review handler
    const handleRating = (e) => {
        setReviews((prevReviews) => ({ ...prevReviews, rating: e.target.value }))
    }

    const handleComment = (e) => {
        setReviews((prevReviews) => ({ ...prevReviews, comment: e.target.value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setCreating(true)
        try {
            const formData = new FormData()
            formData.append("courseTitle", title)
            formData.append("description", description)
            formData.append("about", about)
            formData.append("duration", duration)
            formData.append("price", price)
            formData.append("whatYouWillLearn", whatYouWillLearn)
            formData.append("content", content)
            formData.append("tags", tags)
            formData.append("image", image)
            formData.append("reviews", JSON.stringify(reviews))

            // Append the lesson information fields
            formData.append("lessons", JSON.stringify(lessonData))

            // Append the video files for each lesson
            for (let i = 0; i < lessonData.length; i++) {
                const { title, videos, pdfs } = lessonData[i]
                for (let j = 0; j < videos.length; j++) {
                    formData.append(`lesson-${i}-video-title-${j}`, videos[j].title)
                    formData.append(`lesson-${i}-video-link-${j}`, videos[j].link)
                }
            }

            // Append the PDF files for each lesson
            for (let i = 0; i < lessonData.length; i++) {
                const { title, videos, pdfs } = lessonData[i]
                for (let j = 0; j < pdfs.length; j++) {
                    formData.append(`lesson-${i}-pdf-${j}`, pdfs[j])
                }
            }
            console.log([...formData.entries()])

            try {
                await fetch("/api/courses/addCourses", {
                    "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                    method: "POST",
                    body: formData,
                }).then((res) => {
                    if (res.ok) {
                        setSuccess(true)
                        setTimeout(() => {
                            router.push("/dashboard")
                        }, 3000)
                        console.log("Response data is ", res.json())
                    } else {
                        setSuccess(false)
                    }
                })
            } catch (error) {
                console.error(error)
                setError(error)
            }
            setCreating(false)
            // console.log(response.data)
            // Handle successful response
        } catch (error) {
            console.error(error)
            setError(error)
        }
    }
    useEffect(() => {
        setLoading(true)
        if (!session) {
            if (status === "loading") {
                return
            }
            setLoading(false)
            router.push("/login")
        } else if (session.user.phone === undefined || session.user.phone === null) {
            setUpdate(true)
            setTimeout(() => {
                router.push("/profile-update")
            }, 3000)
        } else {
            setLoading(false) // Session is loaded
        }
    }, [session, status])

    if (loading) {
        return <SetUpdate>Loading....</SetUpdate>
    }
    if (update) {
        return <SetUpdate>Please complete your profile setup</SetUpdate>
    }

    return (
        <Container>
            {session ? (
                <Wrapper>
                    <Title>Course registration form</Title>
                    <UploadDiv>
                        {error && <div>{error.message}</div>}
                        {loading && <div>uploading</div>}
                        {success && <div>Course registration successful</div>}
                    </UploadDiv>
                    {session.user.isAdmin || session.user.isTutor ? (
                        <Form onSubmit={handleSubmit} enctype="multipart/form-data">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                type="text"
                                placeholder="Not more than 5 words"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />

                            <Label htmlFor="title">Description</Label>
                            <Input
                                type="text"
                                placeholder="Not more than 10 words"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />

                            <Label htmlFor="description">About</Label>
                            <TextArea
                                value={about}
                                placeholder="Not above 45 words not below 40"
                                onChange={(e) => setAbout(e.target.value)}
                                required
                            />

                            <Label htmlFor="duration">Duration</Label>
                            <Input
                                type="number"
                                placeholder="Duration (in minutes)"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />

                            <Label htmlFor="price">Price</Label>
                            <Input
                                type="number"
                                value={price}
                                placeholder="Enter 0 if its free"
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />

                            <Label htmlFor="whatYouWillLearn">What You Will Learn</Label>
                            <TextArea
                                type="text"
                                placeholder="List benefits separated by !"
                                value={whatYouWillLearn}
                                onChange={(e) => setWhatYouWillLearn(e.target.value)}
                            />

                            <Label htmlFor="content">Course Content</Label>
                            <TextArea
                                placeholder="List topics separated by !"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            {/* // img upload */}
                            <ImgDiv>
                                <Label htmlFor="image"> Course Image</Label>
                                <VidInput
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </ImgDiv>

                            {/* Add lessons */}
                            <Title>Lessons</Title>
                            <VidDiv>
                                {lessons.map((lesson, lessonIndex) => (
                                    <div key={lessonIndex}>
                                        <VidLabel htmlFor={`lesson-title-${lessonIndex}`}>
                                            Lesson Title
                                        </VidLabel>
                                        <VidInput
                                            type="text"
                                            value={lesson.title}
                                            onChange={(e) => updateTitle(e, lessonIndex)}
                                        />
                                        <br />

                                        {lesson.videos.map((video, videoIndex) => (
                                            <div key={videoIndex}>
                                                <VidLabel
                                                    htmlFor={`lesson-video-title-${lessonIndex}-${videoIndex}`}
                                                >
                                                    Video Title
                                                </VidLabel>
                                                <VidInput
                                                    type="text"
                                                    value={video.title}
                                                    onChange={(e) =>
                                                        updateVideoTitle(e, lessonIndex, videoIndex)
                                                    }
                                                />
                                                <br />

                                                <VidLabel
                                                    htmlFor={`lesson-video-link-${lessonIndex}-${videoIndex}`}
                                                >
                                                    Video Link
                                                </VidLabel>
                                                <VidInput
                                                    type="text"
                                                    value={video.link}
                                                    onChange={(e) =>
                                                        updateVideoLink(e, lessonIndex, videoIndex)
                                                    }
                                                />
                                                <br />
                                            </div>
                                        ))}

                                        <Button
                                            type="button"
                                            onClick={() => handleAddVideo(lessonIndex)}
                                        >
                                            Add Video
                                        </Button>

                                        <VidLabel htmlFor={`lesson-pdfs-${lessonIndex}`}>
                                            PDF Files
                                        </VidLabel>
                                        <VidInput
                                            type="file"
                                            accept="application/pdf"
                                            multiple
                                            onChange={(e) => handlePDFUpload(e, lessonIndex)}
                                        />
                                        <br />
                                    </div>
                                ))}
                            </VidDiv>
                            <Button type="button" onClick={handleAddLesson}>
                                {" "}
                                Add Lesson
                            </Button>

                            <VidLabel htmlFor="tags">Tags</VidLabel>
                            <VidInput type="text" onChange={(e) => setTags(e.target.value)} />
                            <br />

                            <Title>Reviews</Title>
                            <VidDiv>
                                <div style={{ display: "flex", margin: 10 }}>
                                    <Select value={reviews.rating} onChange={handleRating}>
                                        <Option defaultValue={""}> Rating </Option>
                                        <Option value={1}>1</Option>
                                        <Option value={2}>2</Option>
                                        <Option value={3}>3</Option>
                                        <Option value={4}>4</Option>
                                        <Option value={5}>5</Option>
                                    </Select>
                                    <TextArea placeholder="Comment" onChange={handleComment} />
                                </div>
                            </VidDiv>
                            <CreateButton type="submit">
                                {creating ? "Creating..." : "Create Course"}
                            </CreateButton>
                        </Form>
                    ) : (
                        <UploadDiv>You are not authorized</UploadDiv>
                    )}
                </Wrapper>
            ) : (
                <UploadDiv>You are not authorized</UploadDiv>
            )}
        </Container>
    )
}

export default NewCourseForm
