// app/pay/page.tsx
"use client"
import UnifiedCheckout from "@/components/payments/UnifiedCheckout"
import { useUserStore } from "@/lib/store/useUserStore"
import { useAuthReady } from "@/hooks/useAuthReady"
import { useFetchCourses } from "@/hooks/courses/useFetchCourse"
import { enrollCourses } from "@/lib/firebase/uploads/enrollCourses"
import { removeFromCartDb } from "@/lib/firebase/queries/cart"
import { EnrolledCourse } from "@/types/userType"

export default function AsyncCourseCheckoutPage() {
    const { cart, removeFromCart, addToEnrolledCourses } = useUserStore()
    const { user } = useAuthReady()
    const { data: courses, isLoading } = useFetchCourses()

    const cartCourses = (courses ?? []).filter((course) => cart.includes(course.id))

    const handlePaymentSuccess = async (reference: string) => {
        if (!user) throw new Error("User not authenticated")

        const courseIds = cartCourses.map((c) => c.id)
        const newEnrollments: EnrolledCourse[] = cartCourses.map((course) => ({
            userId: user.id,
            courseId: course.id,
            completedLessons: 0,
            progress: 0,
            status: "in progress",
            enrolledAt: new Date(),
        }))

        await enrollCourses(user.id, courseIds)
        newEnrollments.forEach(addToEnrolledCourses)
        courseIds.forEach((id) => {
            removeFromCart(id)
            removeFromCartDb(user.id, id)
        })
    }

    if (isLoading) return <div>Loading...</div>

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
            onSuccess={handlePaymentSuccess}
        />
    )
}
