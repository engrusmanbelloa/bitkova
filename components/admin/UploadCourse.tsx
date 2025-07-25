import React, { useState } from "react"
import styled from "styled-components"
import { v4 as uuidv4 } from "uuid"
import { Course, Module, Lesson } from "@/types"
import { toast } from "react-toastify"
import { uploadNewCourse } from "@/hooks/courses/uploadCourseWithDetails"
import CourseUploadForm from "@/components/admin/CourseUploadForm"
import { data_package } from "@/data"
const Container = styled.div`
    max-width: 800px;
    margin: auto;
`
const FormWrapper = styled.div`
    max-width: 800px;
    margin: auto;
    padding: 10px;
`
const TextArea = styled.textarea`
    width: 100%;
    padding: 0.5rem;
    margin: 5px 0;
`
const Divider = styled.hr`
    margin: 10px 0;
`
const Input = styled.input`
    width: 100%;
    margin-top: 5px;
    margin-bottom: 7px;
    padding: 5px;
`
const Button = styled.button`
    padding: 0.5rem 1rem;
    margin: 0.5rem 0.25rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
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
const TabsWrapper = styled.div`
    display: flex;
    gap: 24px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
`

// export default function UploadCourse() {
//     // useEffect(() => {
//     //     const uploadDummyCourse = async () => {
//     //         try {
//     //             await uploadNewCourse(data_package)
//     //             console.log("Dummy course uploaded successfully!")
//     //         } catch (error) {
//     //             console.error("Upload failed:", error)
//     //         }
//     //     }

//     //     uploadDummyCourse()
//     // }, [])
//     return (
//         <>
//             <div>Upload Course form will be avalaible soon</div>
//         </>
//     )
// }
// export default function UploadCourse() {
//     const [course, setCourse] = useState<Course>({
//         id: uuidv4(),
//         title: "",
//         category: "",
//         skillLevel: "",
//         facilitatorId: "",
//         rating: 0,
//         image: "",
//         shortDesc: "",
//         courseDesc: "",
//         students: 0,
//         price: 0,
//         onDemandVideos: 0,
//         downloadableFiles: 0,
//         whatYoullLearn: [],
//     })

//     const [modules, setModules] = useState<Module[]>([
//         {
//             id: uuidv4(),
//             title: "",
//             position: 1,
//         },
//     ])

//     const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target
//         setCourse((prev) => ({ ...prev, [name]: value }))
//     }

//     const handleModuleChange = (index: number, field: string, value: string) => {
//         const updated = [...modules]
//         updated[index] = { ...updated[index], [field]: value }
//         setModules(updated)
//     }

//     const addModule = () => {
//         setModules([...modules, { id: uuidv4(), title: "", position: modules.length + 1 }])
//     }

//     const removeModule = (index: number) => {
//         const updated = [...modules]
//         updated.splice(index, 1)
//         setModules(updated)
//     }

//     const handleSubmit = () => {
//         const fullPayload = {
//             ...course,
//             modules,
//         }
//         console.log("Upload Course:", fullPayload)
//         // Upload to Firestore logic goes here
//     }

//     return (
//         <FormContainer>
//             <h2>Course Details</h2>
//             <Input
//                 name="title"
//                 placeholder="Title"
//                 value={course.title}
//                 onChange={handleCourseChange}
//             />
//             <Input
//                 name="category"
//                 placeholder="Category"
//                 value={course.category}
//                 onChange={handleCourseChange}
//             />
//             <Input
//                 name="skillLevel"
//                 placeholder="Skill Level"
//                 value={course.skillLevel}
//                 onChange={handleCourseChange}
//             />
//             <Input
//                 name="facilitatorId"
//                 placeholder="Facilitator ID"
//                 value={course.facilitatorId}
//                 onChange={handleCourseChange}
//             />
//             <Textarea
//                 name="shortDesc"
//                 placeholder="Short Description"
//                 value={course.shortDesc}
//                 onChange={handleCourseChange}
//             />
//             <Textarea
//                 name="courseDesc"
//                 placeholder="Full Course Description"
//                 value={course.courseDesc}
//                 onChange={handleCourseChange}
//             />
//             <Input
//                 name="price"
//                 placeholder="Price"
//                 type="number"
//                 value={course.price}
//                 onChange={handleCourseChange}
//             />

//             <h3>Modules</h3>
//             {modules.map((mod, i) => (
//                 <div key={mod.id}>
//                     <Input
//                         placeholder={`Module ${i + 1} Title`}
//                         value={mod.title}
//                         onChange={(e) => handleModuleChange(i, "title", e.target.value)}
//                     />
//                     <Button type="button" onClick={() => removeModule(i)}>
//                         Remove Module
//                     </Button>
//                 </div>
//             ))}
//             <Button type="button" onClick={addModule}>
//                 Add Module
//             </Button>

//             <Button type="button" onClick={handleSubmit}>
//                 Upload Course
//             </Button>
//         </FormContainer>
//     )
// }

// export default function UploadCourse() {
//     const [course, setCourse] = useState<Partial<Course>>({})
//     const [newLearningItem, setNewLearningItem] = useState("")
//     const [modules, setModules] = useState<(Module & { lessons: Lesson[] })[]>([])
//     const [currentModule, setCurrentModule] = useState<Partial<Module>>({
//         title: "",
//         position: modules.length + 1,
//     })
//     const [currentLessons, setCurrentLessons] = useState<Partial<Lesson>[]>([])
//     const [newLesson, setNewLesson] = useState<Partial<Lesson>>({
//         title: "",
//         videoUrl: "",
//         content: "",
//         durationMinutes: 0,
//     })

//     const handleCourseChange = (field: keyof Course, value: any) => {
//         setCourse((prev) => ({ ...prev, [field]: value }))
//     }

//     const handleLessonChange = (field: keyof Lesson, value: any) => {
//         setNewLesson((prev) => ({ ...prev, [field]: value }))
//     }

//     const addLessonToCurrentModule = () => {
//         if (!newLesson.title) return
//         setCurrentLessons((prev) => [...prev, newLesson as Lesson])
//         setNewLesson({ title: "", videoUrl: "", content: "", durationMinutes: 0 })
//     }

//     const saveCurrentModule = () => {
//         if (!currentModule.title) return
//         setModules((prev) => [
//             ...prev,
//             {
//                 ...(currentModule as Module),
//                 id: uuidv4(),
//                 lessons: currentLessons as Lesson[],
//             },
//         ])
//         // Reset
//         setCurrentModule({ title: "", position: modules.length + 2 })
//         setCurrentLessons([])
//     }

//     const submitCourse = () => {
//         const fullCourse = {
//             ...course,
//             modules,
//         }
//         console.log("Submitting course:", fullCourse)
//         // You can post to Firestore here
//     }

//     return (
//         <FormWrapper>
//             <h2>Course Details</h2>
//             <Input
//                 placeholder="Title"
//                 onChange={(e) => handleCourseChange("title", e.target.value)}
//             />
//             <label htmlFor="category">Category</label>
//             <select
//                 id="category"
//                 name="category"
//                 value={course.category}
//                 onChange={(e) => handleCourseChange("category", e.target.value)}
//             >
//                 {/* <option value="">Select category</option> */}
//                 <option value="Cryptocurrency">Cryptocurrency</option>
//                 <option value="UIUX">UI/UX</option>
//                 <option value="Programming">Programming</option>
//                 <option value="Web Development">Web Development</option>
//                 <option value="Social Media Marketing">Social Media Marketing</option>
//                 <option value="Content Creation">Content Creation</option>
//             </select>
//             <label htmlFor="skillLevel">Skill Level</label>
//             <select
//                 id="skillLevel"
//                 name="skillLevel"
//                 value={course.skillLevel}
//                 onChange={(e) => handleCourseChange("skillLevel", e.target.value)}
//             >
//                 {/* <option value="">Select level</option> */}
//                 <option value="Beginner">Beginner</option>
//                 <option value="Intermediate">Intermediate</option>
//                 <option value="Advanced">Advanced</option>
//             </select>
//             <Input
//                 placeholder="Facilitator email"
//                 onChange={(e) => handleCourseChange("facilitatorEmail", e.target.value)}
//             />
//             <Input
//                 placeholder="Image URL"
//                 onChange={(e) => handleCourseChange("image", e.target.value)}
//             />
//             <TextArea
//                 placeholder="Short Description"
//                 onChange={(e) => handleCourseChange("shortDesc", e.target.value)}
//             />
//             <TextArea
//                 placeholder="Full Course Description"
//                 onChange={(e) => handleCourseChange("courseDesc", e.target.value)}
//             />
//             <Input
//                 placeholder="Price"
//                 type="number"
//                 onChange={(e) => handleCourseChange("price", parseFloat(e.target.value))}
//             />
//             <Input
//                 placeholder="On Demand Videos"
//                 type="number"
//                 onChange={(e) => handleCourseChange("onDemandVideos", parseInt(e.target.value))}
//             />

//             <Divider />
//             <h2>Add Module</h2>
//             <Input
//                 placeholder="Module Title"
//                 value={currentModule.title}
//                 onChange={(e) => setCurrentModule((prev) => ({ ...prev, title: e.target.value }))}
//             />

//             <h3>Lessons</h3>
//             {currentLessons.map((lesson, index) => (
//                 <div key={index}>
//                     <p>
//                         {lesson.title} ({lesson.durationMinutes} mins)
//                     </p>
//                 </div>
//             ))}

//             <Input
//                 placeholder="Lesson Title"
//                 value={newLesson.title}
//                 onChange={(e) => handleLessonChange("title", e.target.value)}
//             />
//             <Input
//                 placeholder="Video URL"
//                 value={newLesson.videoUrl}
//                 onChange={(e) => handleLessonChange("videoUrl", e.target.value)}
//             />
//             <Input
//                 placeholder="Duration (minutes)"
//                 type="number"
//                 value={newLesson.durationMinutes}
//                 onChange={(e) => handleLessonChange("durationMinutes", parseInt(e.target.value))}
//             />
//             <TextArea
//                 placeholder="Content"
//                 value={newLesson.content}
//                 onChange={(e) => handleLessonChange("content", e.target.value)}
//             />
//             <Button type="button" onClick={addLessonToCurrentModule}>
//                 Add Lesson
//             </Button>

//             <Button type="button" onClick={saveCurrentModule}>
//                 Save Module
//             </Button>

//             <Divider />
//             <Button onClick={submitCourse}>Submit Full Course</Button>
//         </FormWrapper>
//     )
// }
// export default function UploadCourse() {
//     const [course, setCourse] = useState<Partial<Course>>({
//         whatYoullLearn: [],
//     })
//     const [newLearningItem, setNewLearningItem] = useState("")
//     const [modules, setModules] = useState<(Module & { lessons: Lesson[] })[]>([])
//     const [currentModule, setCurrentModule] = useState<Partial<Module>>({
//         title: "",
//         position: modules.length + 1,
//     })
//     const [currentLessons, setCurrentLessons] = useState<Partial<Lesson>[]>([])
//     const [newLesson, setNewLesson] = useState<Partial<Lesson>>({
//         title: "",
//         videoUrl: "",
//         content: "",
//         durationMinutes: 0,
//     })

//     const handleCourseChange = (field: keyof Course, value: any) => {
//         setCourse((prev) => ({ ...prev, [field]: value }))
//     }

//     const handleLessonChange = (field: keyof Lesson, value: any) => {
//         setNewLesson((prev) => ({ ...prev, [field]: value }))
//     }

//     const addLessonToCurrentModule = () => {
//         if (!newLesson.title) return
//         setCurrentLessons((prev) => [...prev, newLesson as Lesson])
//         setNewLesson({ title: "", videoUrl: "", content: "", durationMinutes: 0 })
//     }

//     const saveCurrentModule = () => {
//         if (!currentModule.title) return
//         setModules((prev) => [
//             ...prev,
//             {
//                 ...(currentModule as Module),
//                 id: uuidv4(),
//                 lessons: currentLessons as Lesson[],
//             },
//         ])
//         setCurrentModule({ title: "", position: modules.length + 2 })
//         setCurrentLessons([])
//     }

//     const addLearningItem = () => {
//         if (!newLearningItem.trim()) return
//         setCourse((prev) => ({
//             ...prev,
//             whatYoullLearn: [...(prev.whatYoullLearn || []), newLearningItem.trim()],
//         }))
//         setNewLearningItem("")
//     }

//     const submitCourse = () => {
//         const fullCourse = {
//             ...course,
//             modules,
//         }
//         console.log("Submitting course:", fullCourse)
//         // You can post to Firestore here
//     }

//     return (
//         <FormWrapper>
//             <h3>Course Details</h3>
//             <Input
//                 placeholder="Title"
//                 onChange={(e) => handleCourseChange("title", e.target.value)}
//             />

//             <label htmlFor="category">Category</label>
//             <select
//                 id="category"
//                 name="category"
//                 value={course.category}
//                 onChange={(e) => handleCourseChange("category", e.target.value)}
//             >
//                 <option value="Cryptocurrency">Cryptocurrency</option>
//                 <option value="UIUX">UI/UX</option>
//                 <option value="Programming">Blockchain Development</option>
//                 <option value="Web Development">Web Development</option>
//                 <option value="Social Media Marketing">Social Media Marketing</option>
//                 <option value="Content Creation">Content Creation</option>
//             </select>

//             <label htmlFor="skillLevel">Skill Level</label>
//             <select
//                 id="skillLevel"
//                 name="skillLevel"
//                 value={course.skillLevel}
//                 onChange={(e) => handleCourseChange("skillLevel", e.target.value)}
//             >
//                 <option value="Beginner">Beginner</option>
//                 <option value="Intermediate">Intermediate</option>
//                 <option value="Advanced">Advanced</option>
//             </select>

//             <Input
//                 placeholder="Facilitator email"
//                 onChange={(e) => handleCourseChange("facilitatorEmail", e.target.value)}
//             />
//             <Input
//                 placeholder="Image URL"
//                 onChange={(e) => handleCourseChange("image", e.target.value)}
//             />
//             <TextArea
//                 placeholder="Short Description"
//                 onChange={(e) => handleCourseChange("shortDesc", e.target.value)}
//             />
//             <TextArea
//                 placeholder="Full Course Description"
//                 onChange={(e) => handleCourseChange("courseDesc", e.target.value)}
//             />
//             <Input
//                 placeholder="Price"
//                 type="number"
//                 min="0"
//                 onChange={(e) => handleCourseChange("price", parseFloat(e.target.value))}
//             />
//             <Input
//                 placeholder="On Demand Videos"
//                 type="number"
//                 min="1"
//                 onChange={(e) => handleCourseChange("onDemandVideos", parseInt(e.target.value))}
//             />

//             <h3>What You'll Learn</h3>
//             <ul>{course.whatYoullLearn?.map((item, index) => <li key={index}>{item}</li>)}</ul>
//             <Input
//                 placeholder="Add a learning outcome"
//                 value={newLearningItem}
//                 onChange={(e) => setNewLearningItem(e.target.value)}
//             />
//             <Button type="button" onClick={addLearningItem}>
//                 Add
//             </Button>

//             <Divider />
//             <h2>Add Module</h2>
//             <Input
//                 placeholder="Module Title"
//                 value={currentModule.title}
//                 onChange={(e) => setCurrentModule((prev) => ({ ...prev, title: e.target.value }))}
//             />

//             <h3>Lessons</h3>
//             {currentLessons.map((lesson, index) => (
//                 <div key={index}>
//                     <p>
//                         {lesson.title} ({lesson.durationMinutes} mins)
//                     </p>
//                 </div>
//             ))}

//             <Input
//                 placeholder="Lesson Title"
//                 value={newLesson.title}
//                 onChange={(e) => handleLessonChange("title", e.target.value)}
//             />
//             <Input
//                 placeholder="Video URL"
//                 value={newLesson.videoUrl}
//                 onChange={(e) => handleLessonChange("videoUrl", e.target.value)}
//             />
//             <Input
//                 placeholder="Duration (minutes)"
//                 type="number"
//                 min="1"
//                 value={
//                     newLesson.durationMinutes !== undefined && !isNaN(newLesson.durationMinutes)
//                         ? newLesson.durationMinutes.toString()
//                         : ""
//                 }
//                 onChange={(e) => handleLessonChange("durationMinutes", parseInt(e.target.value))}
//             />
//             <TextArea
//                 placeholder="Content"
//                 value={newLesson.content}
//                 onChange={(e) => handleLessonChange("content", e.target.value)}
//             />
//             <Button type="button" onClick={addLessonToCurrentModule}>
//                 Add Lesson
//             </Button>
//             <Button type="button" onClick={saveCurrentModule}>
//                 Save Module
//             </Button>

//             <Divider />
//             <Button onClick={submitCourse}>Submit Full Course</Button>
//         </FormWrapper>
//     )
// }

export default function UploadCourse() {
    const [activeTab, setActiveTab] = useState<"upload" | "update">("upload")
    const [uploadError, setUploadError] = useState("")
    const [course, setCourse] = useState<Partial<Course>>({ whatYoullLearn: [] })
    const [newLearningItem, setNewLearningItem] = useState("")
    const [modules, setModules] = useState<(Module & { lessons: Lesson[] })[]>([])
    const [currentModule, setCurrentModule] = useState<Partial<Module>>({
        title: "",
        position: modules.length + 1,
    })
    const [currentLessons, setCurrentLessons] = useState<Partial<Lesson>[]>([])
    const [newLesson, setNewLesson] = useState<Partial<Lesson>>({
        title: "",
        videoUrl: "",
        content: "",
        durationMinutes: 0,
    })

    const [editingModuleIndex, setEditingModuleIndex] = useState<number | null>(null)
    const [editingLessonIndex, setEditingLessonIndex] = useState<number | null>(null)

    const handleCourseChange = (field: keyof Course, value: any) => {
        setCourse((prev) => ({ ...prev, [field]: value }))
    }

    const handleLessonChange = (field: keyof Lesson, value: any) => {
        setNewLesson((prev) => ({ ...prev, [field]: value }))
    }

    const addLessonToCurrentModule = () => {
        if (!newLesson.title) return

        if (editingLessonIndex !== null) {
            const updated = [...currentLessons]
            updated[editingLessonIndex] = newLesson as Lesson
            setCurrentLessons(updated)
            setEditingLessonIndex(null)
        } else {
            setCurrentLessons((prev) => [...prev, newLesson as Lesson])
        }

        setNewLesson({ title: "", videoUrl: "", content: "", durationMinutes: 0 })
    }

    const editLesson = (index: number) => {
        setNewLesson(currentLessons[index])
        setEditingLessonIndex(index)
    }

    const deleteLesson = (index: number) => {
        setCurrentLessons((prev) => prev.filter((_, i) => i !== index))
    }

    const saveCurrentModule = () => {
        if (!currentModule.title) return

        const moduleToSave = {
            ...(currentModule as Module),
            id: currentModule.id || uuidv4(),
            lessons: currentLessons as Lesson[],
        }

        setModules((prev) => {
            if (editingModuleIndex !== null) {
                const updated = [...prev]
                updated[editingModuleIndex] = moduleToSave
                return updated
            } else {
                return [...prev, moduleToSave]
            }
        })

        setCurrentModule({ title: "", position: modules.length + 2 })
        setCurrentLessons([])
        setEditingModuleIndex(null)
    }

    const editModule = (index: number) => {
        const mod = modules[index]
        setEditingModuleIndex(index)
        setCurrentModule({ title: mod.title, position: mod.position, id: mod.id })
        setCurrentLessons(mod.lessons)
    }

    const cancelEdit = () => {
        setCurrentModule({ title: "", position: modules.length + 1 })
        setCurrentLessons([])
        setEditingModuleIndex(null)
        setEditingLessonIndex(null)
    }

    const addLearningItem = () => {
        if (!newLearningItem.trim()) return
        setCourse((prev) => ({
            ...prev,
            whatYoullLearn: [...(prev.whatYoullLearn || []), newLearningItem.trim()],
        }))
        setNewLearningItem("")
    }

    // const submitCourse = () => {
    //     const fullCourse = { ...course, modules }
    //     console.log("Submitting course:", fullCourse)
    //     // Post to Firestore here
    // }
    // const submitCourse = async () => {
    //     const fullCourse = { ...course, modules }
    //     // Validate required fields

    //     try {
    //         const courseId = uuidv4()
    //         const finalizedCourse = {
    //             ...fullCourse,
    //             id: courseId,
    //         }

    //         const finalizedModules = modules.map((mod, modIndex) => ({
    //             ...mod,
    //             id: uuidv4(),
    //             position: modIndex,
    //             lessons: mod.lessons.map((lesson, lessonIndex) => ({
    //                 ...lesson,
    //                 id: lesson.id || uuidv4(),
    //                 position: lessonIndex,
    //             })),
    //         }))

    //         await uploadNewCourse({
    //             course: finalizedCourse,
    //             modules: finalizedModules,
    //             reviews: [], // add review logic later
    //         })

    //         toast.success("Course uploaded successfully!")
    //     } catch (err) {
    //         console.error(err)
    //         toast.error("Failed to upload course.")
    //     }
    // }
    const submitCourse = async () => {
        if (
            !course.title ||
            !course.category ||
            !course.skillLevel ||
            !course.facilitatorEmail ||
            !course.image ||
            !course.shortDesc ||
            !course.courseDesc ||
            course.price === undefined ||
            course.onDemandVideos === undefined ||
            !Array.isArray(course.whatYoullLearn)
        ) {
            toast.error("Please fill in all required course fields.")
            return
        }

        try {
            const courseId = uuidv4()

            const finalizedCourse: Course = {
                id: courseId,
                title: course.title,
                category: course.category,
                skillLevel: course.skillLevel,
                facilitatorEmail: course.facilitatorEmail,
                rating: 0,
                image: course.image,
                shortDesc: course.shortDesc,
                courseDesc: course.courseDesc,
                students: 0,
                price: course.price,
                onDemandVideos: course.onDemandVideos,
                downloadableFiles: course.downloadableFiles || 0,
                whatYoullLearn: course.whatYoullLearn,
            }

            const finalizedModules = modules.map((mod, modIndex) => ({
                ...mod,
                id: mod.id || uuidv4(),
                position: modIndex,
                lessons: mod.lessons.map((lesson, lessonIndex) => ({
                    ...lesson,
                    id: lesson.id || uuidv4(),
                    position: lessonIndex,
                })),
            }))

            await uploadNewCourse({
                course: finalizedCourse,
                modules: finalizedModules,
                reviews: [],
            })

            toast.success("Course uploaded successfully!")
        } catch (err) {
            console.error(err)
            toast.error("Failed to upload course.")
        }
    }
    return (
        <Container>
            <TabsWrapper>
                <Tab $isActive={activeTab === "upload"} onClick={() => setActiveTab("upload")}>
                    Upload
                </Tab>
                <Tab $isActive={activeTab === "update"} onClick={() => setActiveTab("update")}>
                    Update
                </Tab>
            </TabsWrapper>
            {activeTab === "upload" && <CourseUploadForm />}
        </Container>
    )
}
