// app/pay/page.tsx
"use client"
import dynamic from "next/dynamic"
// import UnifiedCheckout from "@/components/payments/UnifiedCheckout"
import { useUserStore } from "@/lib/store/useUserStore"
import { useAuthReady } from "@/hooks/useAuthReady"
import { useFetchCourses } from "@/hooks/courses/useFetchCourse"
import IsLoading from "@/components/IsLoading"
import AuthMessage from "@/components/AuthMessage"

const UnifiedCheckout = dynamic(() => import("@/components/payments/UnifiedCheckout"), {
    ssr: false,
})
export default function AsyncCourseCheckoutPage() {
    const successMessage = "Payment successful! Courses added."
    const { cart, removeFromCart, addToEnrolledCourses } = useUserStore()
    const { user } = useAuthReady()
    const { data: courses, isLoading } = useFetchCourses()

    const cartCourses = (courses ?? []).filter((course) => cart.includes(course.id))

    if (isLoading) return <IsLoading />
    if (!user) return <AuthMessage message="Authentication required" />

    const checkoutItems = cartCourses.map((course) => ({
        id: course.id,
        title: course.title,
        price: course.price,
        image: course.image,
        details: {
            Duration: `${course.duration.hours}h ${course.duration.minutes}m`,
            Modules: `${course.modules?.length || 0} modules`,
        },
    }))

    return (
        <UnifiedCheckout
            items={checkoutItems}
            classType="async_course"
            className="async_course"
            successMessage={successMessage}
            successRedirect="/success"
        />
    )
}
