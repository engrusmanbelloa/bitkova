"use client"
import { useState, KeyboardEvent } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"
import { courseSchema, type CourseFormData, type ModuleFormData } from "@/lib/schemas/courseSchema"
import { uploadNewCourse } from "@/lib/firebase/uploads/uploadCourseWithDetails"

import { Course, Module, Lesson } from "@/types"

export default function CourseUploadForm() {
    const [uploading, setUploading] = useState(false)
    const [modules, setModules] = useState<ModuleFormData[]>([])
    const [currentModule, setCurrentModule] = useState<Partial<ModuleFormData>>({
        title: "",
        position: 0,
        lessons: [],
    })

    // Main course form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            whatYoullLearn: [],
            downloadableFiles: 0,
        },
    })

    // Learning outcomes array
    const {
        fields: learningFields,
        append: appendLearning,
        remove: removeLearning,
    } = useFieldArray({
        control: useForm().control,
        name: "whatYoullLearn",
    })

    const [newLearningItem, setNewLearningItem] = useState("")

    const addLearningItem = () => {
        if (!newLearningItem.trim()) {
            toast.error("Learning outcome cannot be empty")
            return
        }

        const currentLearning = watch("whatYoullLearn") || []
        setValue("whatYoullLearn", [...currentLearning, newLearningItem.trim()])
        setNewLearningItem("")
    }

    const removeLearningItem = (index: number) => {
        const currentLearning = watch("whatYoullLearn") || []
        setValue(
            "whatYoullLearn",
            currentLearning.filter((_, i) => i !== index),
        )
    }

    // Module and Lesson management
    const [currentLessons, setCurrentLessons] = useState<Partial<Lesson>[]>([])
    const [newLesson, setNewLesson] = useState<Partial<Lesson>>({
        title: "",
        videoUrl: "",
        content: "",
        durationMinutes: 0,
    })
    const [editingModuleIndex, setEditingModuleIndex] = useState<number | null>(null)
    const [editingLessonIndex, setEditingLessonIndex] = useState<number | null>(null)

    const addLessonToCurrentModule = () => {
        if (!newLesson.title?.trim()) {
            toast.error("Lesson title is required")
            return
        }
        if (!newLesson.videoUrl?.trim()) {
            toast.error("Video URL is required")
            return
        }

        try {
            new URL(newLesson.videoUrl)
        } catch {
            toast.error("Invalid video URL")
            return
        }

        if (editingLessonIndex !== null) {
            const updated = [...currentLessons]
            updated[editingLessonIndex] = { ...newLesson, id: newLesson.id || uuidv4() }
            setCurrentLessons(updated)
            setEditingLessonIndex(null)
            toast.success("Lesson updated")
        } else {
            setCurrentLessons((prev) => [...prev, { ...newLesson, id: uuidv4() }])
            toast.success("Lesson added")
        }

        setNewLesson({ title: "", videoUrl: "", content: "", durationMinutes: 0 })
    }

    const editLesson = (index: number) => {
        setNewLesson(currentLessons[index])
        setEditingLessonIndex(index)
    }

    const deleteLesson = (index: number) => {
        setCurrentLessons((prev) => prev.filter((_, i) => i !== index))
        toast.success("Lesson removed")
    }

    const saveCurrentModule = () => {
        if (!currentModule.title?.trim()) {
            toast.error("Module title is required")
            return
        }

        if (currentLessons.length === 0) {
            toast.error("Add at least one lesson to the module")
            return
        }

        const moduleToSave: ModuleFormData = {
            id: currentModule.id || uuidv4(),
            title: currentModule.title,
            position: editingModuleIndex !== null ? currentModule.position! : modules.length,
            lessons: currentLessons.map((lesson, idx) => ({
                ...lesson,
                id: lesson.id || uuidv4(),
                position: idx,
            })) as Lesson[],
        }

        if (editingModuleIndex !== null) {
            const updated = [...modules]
            updated[editingModuleIndex] = moduleToSave
            setModules(updated)
            toast.success("Module updated")
        } else {
            setModules((prev) => [...prev, moduleToSave])
            toast.success("Module added")
        }

        setCurrentModule({ title: "", position: modules.length + 1, lessons: [] })
        setCurrentLessons([])
        setEditingModuleIndex(null)
    }

    const editModule = (index: number) => {
        const mod = modules[index]
        setEditingModuleIndex(index)
        setCurrentModule({ title: mod.title, position: mod.position, id: mod.id })
        setCurrentLessons(mod.lessons)
    }

    const deleteModule = (index: number) => {
        setModules((prev) => prev.filter((_, i) => i !== index))
        toast.success("Module deleted")
    }

    const cancelEdit = () => {
        setCurrentModule({ title: "", position: modules.length, lessons: [] })
        setCurrentLessons([])
        setEditingModuleIndex(null)
        setEditingLessonIndex(null)
    }

    const onSubmit = async (data: CourseFormData) => {
        // Validate modules
        if (modules.length === 0) {
            toast.error("Add at least one module before submitting")
            return
        }

        setUploading(true)

        try {
            const courseId = uuidv4()

            const finalizedCourse: Course = {
                id: courseId,
                title: data.title,
                category: data.category,
                skillLevel: data.skillLevel,
                facilitatorEmail: data.facilitatorEmail,
                rating: 0,
                image: data.image,
                about: data.about,
                shortDesc: data.shortDesc,
                courseDesc: data.courseDesc,
                students: 0,
                price: data.price,
                onDemandVideos: data.onDemandVideos,
                downloadableFiles: data.downloadableFiles || 0,
                whatYoullLearn: data.whatYoullLearn,
            }

            const finalizedModules = modules.map((mod, modIndex) => ({
                ...mod,
                position: modIndex,
                lessons: mod.lessons.map((lesson, lessonIndex) => ({
                    ...lesson,
                    position: lessonIndex,
                })),
            }))

            await uploadNewCourse({
                course: finalizedCourse,
                modules: finalizedModules as (Module & { lessons: Lesson[] })[],
                reviews: [],
            })

            toast.success("✅ Course uploaded successfully!")

            // Reset everything
            reset()
            setModules([])
            setCurrentModule({ title: "", position: 0, lessons: [] })
            setCurrentLessons([])
            setNewLesson({ title: "", videoUrl: "", content: "", durationMinutes: 0 })
            setNewLearningItem("")
            setEditingModuleIndex(null)
            setEditingLessonIndex(null)
        } catch (error) {
            console.error("Upload error:", error)
            const errorMessage = error instanceof Error ? error.message : "Failed to upload course"
            toast.error(`❌ ${errorMessage}`)
        } finally {
            setUploading(false)
        }
    }

    const handleEnterKey = (callback: () => void) => (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            callback()
        }
    }

    // Word count helpers
    const titleWords = watch("title")?.trim().split(/\s+/).filter(Boolean).length || 0
    const shortDescWords = watch("shortDesc")?.trim().split(/\s+/).filter(Boolean).length || 0

    const categories = [
        "Crypto Trading",
        "Graphic Design",
        "UI/UX",
        "Basic Blockchain",
        "Programming for Beginners",
        "Advanced Web Development",
        "Digital Marketing",
        "Data Science",
        "Cybersecurity Fundamentals",
        "Project Management",
        "Artificial Intelligence",
        "Cloud Computing",
        "Mobile App Development",
        "Entrepreneurship",
        "Financial Analysis",
        "Photography Basics",
        "Video Editing",
        "Social Media Marketing",
        "Blockchain Development",
    ]

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "20px", maxWidth: "800px" }}>
            <h2>Course Details</h2>

            {/* Title */}
            <div style={{ marginBottom: "15px" }}>
                <input
                    {...register("title")}
                    placeholder="Course Title"
                    disabled={uploading}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderColor: errors.title ? "red" : "#ccc",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        marginTop: "4px",
                    }}
                >
                    <span style={{ color: errors.title ? "red" : "gray" }}>
                        {errors.title?.message || `${titleWords}/5 words`}
                    </span>
                </div>
            </div>

            {/* Category & Skill Level */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                <div style={{ flex: 1 }}>
                    <select
                        {...register("category")}
                        disabled={uploading}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderColor: errors.category ? "red" : "#ccc",
                        }}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.category.message}
                        </span>
                    )}
                </div>

                <div style={{ flex: 1 }}>
                    <select
                        {...register("skillLevel")}
                        disabled={uploading}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderColor: errors.skillLevel ? "red" : "#ccc",
                        }}
                    >
                        <option value="">Select Skill Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    {errors.skillLevel && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.skillLevel.message}
                        </span>
                    )}
                </div>
            </div>

            {/* Facilitator Email */}
            <div style={{ marginBottom: "15px" }}>
                <input
                    {...register("facilitatorEmail")}
                    type="email"
                    placeholder="Facilitator Email"
                    disabled={uploading}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderColor: errors.facilitatorEmail ? "red" : "#ccc",
                    }}
                />
                {errors.facilitatorEmail && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                        {errors.facilitatorEmail.message}
                    </span>
                )}
            </div>

            {/* Image URL */}
            <div style={{ marginBottom: "15px" }}>
                <input
                    {...register("image")}
                    type="url"
                    placeholder="Image URL"
                    disabled={uploading}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderColor: errors.image ? "red" : "#ccc",
                    }}
                />
                {errors.image && (
                    <span style={{ color: "red", fontSize: "12px" }}>{errors.image.message}</span>
                )}
            </div>

            {/* About */}
            <div style={{ marginBottom: "15px" }}>
                <textarea
                    {...register("about")}
                    placeholder="About (min 20 characters)"
                    disabled={uploading}
                    rows={4}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderColor: errors.about ? "red" : "#ccc",
                    }}
                />
                {errors.about && (
                    <span style={{ color: "red", fontSize: "12px" }}>{errors.about.message}</span>
                )}
            </div>

            {/* Short Description */}
            <div style={{ marginBottom: "15px" }}>
                <textarea
                    {...register("shortDesc")}
                    placeholder="Short Description"
                    disabled={uploading}
                    rows={3}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderColor: errors.shortDesc ? "red" : "#ccc",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        marginTop: "4px",
                    }}
                >
                    <span style={{ color: errors.shortDesc ? "red" : "gray" }}>
                        {errors.shortDesc?.message || `${shortDescWords}/17 words`}
                    </span>
                </div>
            </div>

            {/* Full Description */}
            <div style={{ marginBottom: "15px" }}>
                <textarea
                    {...register("courseDesc")}
                    placeholder="Full Course Description (min 50 characters)"
                    disabled={uploading}
                    rows={6}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderColor: errors.courseDesc ? "red" : "#ccc",
                    }}
                />
                {errors.courseDesc && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                        {errors.courseDesc.message}
                    </span>
                )}
            </div>

            {/* Price & Videos */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                <div style={{ flex: 1 }}>
                    <input
                        {...register("price", { valueAsNumber: true })}
                        type="number"
                        placeholder="Price"
                        disabled={uploading}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderColor: errors.price ? "red" : "#ccc",
                        }}
                    />
                    {errors.price && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.price.message}
                        </span>
                    )}
                </div>

                <div style={{ flex: 1 }}>
                    <input
                        {...register("onDemandVideos", { valueAsNumber: true })}
                        type="number"
                        placeholder="On Demand Videos"
                        disabled={uploading}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderColor: errors.onDemandVideos ? "red" : "#ccc",
                        }}
                    />
                    {errors.onDemandVideos && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.onDemandVideos.message}
                        </span>
                    )}
                </div>
            </div>

            {/* What You'll Learn */}
            <div style={{ marginBottom: "20px" }}>
                <h3>What You'll Learn</h3>
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    <input
                        type="text"
                        placeholder="Add a learning outcome"
                        value={newLearningItem}
                        onChange={(e) => setNewLearningItem(e.target.value)}
                        disabled={uploading}
                        style={{ flex: 1, padding: "8px" }}
                        onKeyDown={handleEnterKey(addLearningItem)}
                        // onKeyDown={(e) =>
                        //     e.key === "Enter" && (e.preventDefault(), addLearningItem())
                        // }
                    />
                    <button
                        type="button"
                        onClick={addLearningItem}
                        disabled={uploading}
                        style={{ padding: "8px 16px" }}
                    >
                        Add
                    </button>
                </div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {watch("whatYoullLearn")?.map((item, index) => (
                        <li
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "8px",
                                background: "#f5f5f5",
                                marginBottom: "4px",
                            }}
                        >
                            <span>✓ {item}</span>
                            <button
                                type="button"
                                onClick={() => removeLearningItem(index)}
                                style={{
                                    color: "red",
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                {errors.whatYoullLearn && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                        {errors.whatYoullLearn.message}
                    </span>
                )}
            </div>

            {/* Module Management Section */}
            <div
                style={{
                    marginTop: "30px",
                    padding: "20px",
                    background: "#f9f9f9",
                    borderRadius: "8px",
                }}
            >
                <h3>Add Module</h3>

                <input
                    type="text"
                    placeholder="Module Title"
                    value={currentModule.title || ""}
                    onChange={(e) => setCurrentModule({ ...currentModule, title: e.target.value })}
                    disabled={uploading}
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                {/* Lesson Management */}
                <div style={{ marginLeft: "20px", marginBottom: "15px" }}>
                    <h4>Lessons</h4>

                    <input
                        type="text"
                        placeholder="Lesson Title"
                        value={newLesson.title || ""}
                        onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                        disabled={uploading}
                        style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                    />

                    <input
                        type="url"
                        placeholder="Video URL"
                        value={newLesson.videoUrl || ""}
                        onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                        disabled={uploading}
                        style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                    />

                    <input
                        type="number"
                        placeholder="Duration (minutes)"
                        value={newLesson.durationMinutes || 0}
                        onChange={(e) =>
                            setNewLesson({
                                ...newLesson,
                                durationMinutes: parseInt(e.target.value),
                            })
                        }
                        disabled={uploading}
                        style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                    />

                    <button
                        type="button"
                        onClick={addLessonToCurrentModule}
                        disabled={uploading}
                        style={{ padding: "8px 16px", marginBottom: "10px" }}
                    >
                        {editingLessonIndex !== null ? "Update Lesson" : "Add Lesson"}
                    </button>

                    {/* Current Lessons List */}
                    {currentLessons.length > 0 && (
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {currentLessons.map((lesson, index) => (
                                <li
                                    key={index}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "8px",
                                        background: "#fff",
                                        marginBottom: "4px",
                                    }}
                                >
                                    <span>{lesson.title}</span>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => editLesson(index)}
                                            style={{ marginRight: "8px" }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteLesson(index)}
                                            style={{ color: "red" }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        type="button"
                        onClick={saveCurrentModule}
                        disabled={uploading}
                        style={{
                            padding: "10px 20px",
                            background: "#0072ff",
                            color: "white",
                            border: "none",
                        }}
                    >
                        {editingModuleIndex !== null ? "Update Module" : "Save Module"}
                    </button>
                    {editingModuleIndex !== null && (
                        <button type="button" onClick={cancelEdit} style={{ padding: "10px 20px" }}>
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* Saved Modules List */}
            {modules.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Course Modules ({modules.length})</h3>
                    {modules.map((module, index) => (
                        <div
                            key={module.id}
                            style={{
                                padding: "15px",
                                background: "#f5f5f5",
                                marginBottom: "10px",
                                borderRadius: "4px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    <strong>{module.title}</strong>
                                    <span style={{ marginLeft: "10px", color: "gray" }}>
                                        ({module.lessons.length} lessons)
                                    </span>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => editModule(index)}
                                        style={{ marginRight: "8px" }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteModule(index)}
                                        style={{ color: "red" }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={uploading || modules.length === 0}
                style={{
                    marginTop: "30px",
                    padding: "15px 30px",
                    background: uploading || modules.length === 0 ? "#ccc" : "#2479daff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: uploading || modules.length === 0 ? "not-allowed" : "pointer",
                    fontSize: "16px",
                    width: "100%",
                }}
            >
                {uploading ? "⏳ Uploading Course..." : "Upload Course"}
            </button>
        </form>
    )
}
