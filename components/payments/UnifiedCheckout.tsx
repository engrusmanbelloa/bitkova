// components/payments/UnifiedCheckout.tsx
"use client"
import { usePaystackPayment } from "react-paystack"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"
import { useRouter } from "next/navigation"
import { useAuthReady } from "@/hooks/useAuthReady"
import { toast } from "sonner"
import { ClassType } from "@/types/classTypes"

const Container = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    margin: 10px auto;
    box-sizing: border-box;
    ${ipad((props: any) => `width: ${props.theme.widths.ipadWidth};`)}
    ${mobile(
        (props: any) =>
            `width: 100%; max-width: ${props.theme.widths.mobileWidth}; padding: 0 10px;`,
    )}
`
const Wrapper = styled.div`
    padding: 20px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: white;
`
const ItemCard = styled.div`
    padding: 20px;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    background: #fafafa;
`
const ItemTitle = styled.h3`
    margin: 0 0 12px 0;
    color: ${(props) => props.theme.palette.primary.main};
`
const ItemDetail = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
    color: ${(props) => props.theme.palette.common.black};
    font-size: 14px;
`
const PriceDisplay = styled.div`
    font-size: 32px;
    font-weight: 700;
    color: ${({ theme }) => theme.mobile.green};
    text-align: center;
    margin: 20px 0;
`
const PayButton = styled.button`
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 8px;
    background: ${(props) => props.theme.palette.primary.main};
    color: white;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`
const ErrorMessage = styled.div`
    padding: 16px;
    background: #fee;
    border: 1px solid #ef4444;
    border-radius: 8px;
    color: #991b1b;
    text-align: center;
`

interface CheckoutItem {
    id: string
    title: string
    price: number
    details?: Record<string, string> // Extra info to display
    image?: string
}

interface UnifiedCheckoutProps {
    items: CheckoutItem[]
    classType: ClassType
    className: string

    successMessage: string
    successRedirect: string

    metadata?: Record<string, any>
}

export default function UnifiedCheckout({
    items,
    classType,
    className,
    successMessage,
    successRedirect,
    metadata = {},
}: UnifiedCheckoutProps) {
    const router = useRouter()
    const { user, authReady } = useAuthReady()

    const totalAmount = items.reduce((sum, item) => sum + item.price, 0)

    const config = {
        reference: `BIT-${classType.toUpperCase()}-${Date.now()}-${user?.id || "guest"}`,
        email: user?.email || "",
        amount: totalAmount * 100, // Paystack expects kobo
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        metadata: {
            userId: user?.id,
            classType,
            itemIds: items.map((i) => i.id),
            ...metadata,
            custom_fields: [
                {
                    display_name: "Email",
                    value: user?.email || "",
                    variable_name: "user_email",
                },
                {
                    display_name: "Phone",
                    value: user?.phoneNumber || "N/A",
                    variable_name: "user_phone",
                },
                {
                    display_name: "Class Type",
                    value: classType,
                    variable_name: "class_type",
                },
                {
                    display_name: "Class Name",
                    value: className,
                    variable_name: "class_name",
                },
            ],
        },
    }

    const handleSuccess = async (reference: { reference: string }) => {
        try {
            toast.success(successMessage ?? "Payment successful! Your access has been activated.")

            if (successRedirect) {
                router.push(successRedirect)
            }
        } catch (err) {
            console.error("Post-payment enrollment failed:", err)
            toast.error("Payment succeeded but enrollment failed. Please contact support.")
        }
    }

    const handleClose = () => {
        toast("Payment cancelled")
    }

    const initializePayment = usePaystackPayment(config)

    if (!authReady)
        return (
            <Container>
                <p>Loading...</p>
            </Container>
        )

    if (!user) {
        return (
            <Container>
                <Wrapper>
                    <ErrorMessage>Please log in to continue with payment</ErrorMessage>
                </Wrapper>
            </Container>
        )
    }

    return (
        <Container>
            <Wrapper>
                <h2>Complete Your Enrollment</h2>

                {items.map((item) => (
                    <ItemCard key={item.id}>
                        <ItemTitle>{item.title}</ItemTitle>

                        {item.details &&
                            Object.entries(item.details).map(([key, value]) => (
                                <ItemDetail key={key}>
                                    <strong>{key}:</strong>
                                    <span>{value}</span>
                                </ItemDetail>
                            ))}

                        <ItemDetail>
                            <strong>Price:</strong>
                            <span style={{ color: "#10b981", fontWeight: 600 }}>
                                ₦ {item.price.toLocaleString()}
                            </span>
                        </ItemDetail>
                    </ItemCard>
                ))}

                <PriceDisplay>Total: ₦ {totalAmount.toLocaleString()}</PriceDisplay>

                <PayButton
                    onClick={() => {
                        initializePayment({
                            onSuccess: handleSuccess,
                            onClose: handleClose,
                            ...config,
                        })
                    }}
                >
                    Pay ₦ {totalAmount.toLocaleString()}
                </PayButton>

                <p style={{ fontSize: 12, color: "#666", textAlign: "center", margin: 0 }}>
                    Secure payment powered by Paystack
                </p>
            </Wrapper>
        </Container>
    )
}
