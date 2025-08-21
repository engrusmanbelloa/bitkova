import HomeComponent from "@/components/home/Home"

export default async function Home() {
    // useEffect(() => {
    //     setIsLoading(true)
    //     async function fetchCourses() {
    //         const response = await fetch("/api/courses/getCourses")
    //         const data = await response.json()
    //         setCourses(data)
    //         setCount(data.count)
    //         setIsLoading(false)
    //         console.log("courses found: ", courses)
    //     }
    //     fetchCourses()
    // }, [])
    const limit = 3

    // if (isLoading) {
    //   return <IsLoading />
    // }

    return (
        <>
            <HomeComponent />
        </>
    )
}
