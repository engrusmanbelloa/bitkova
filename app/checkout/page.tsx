import Checkout from "@/components/payments/Checkout"
import { useFetchCourses } from "@/hooks/courses/useFetchCourse"
import { getCartCourses } from "@/lib/firebase/queries/getCartCourses"

export default async function CheckoutPage() {
    //  const courses = useFetchCourses()

    return <Checkout />
}
