import Cart from "@/components/payments/Cart"
import { useFetchCourses } from "@/hooks/courses/useFetchCourse"
import { getCartCourses } from "@/lib/firebase/queries/getCartCourses"

export default async function Checkout() {
    //  const courses = useFetchCourses()

    return <Cart />
}
