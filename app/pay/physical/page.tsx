import dynamic from "next/dynamic"

const ClassCheckout = dynamic(() => import("@/components/payments/ClassCheckout"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
})

export default function PhysicalClassPaymentPage() {
    return <ClassCheckout type="physical" />
}
