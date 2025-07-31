"use client"
import React, { useState } from "react"
import styled from "styled-components"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { toast } from "sonner"
import { addToCart, removeFromCart } from "@/lib/firebase/queries/cart"
import { useUserStore } from "@/lib/store/useUserStore"

const Button = styled.button<{ $color?: string; $background?: string }>`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: ${(props) => props.$background || props.theme.palette.primary.main};
    color: ${(props) => props.$color || props.theme.palette.common.white};
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        background: ${(props) => props.theme.palette.primary.main};
    }
`
const BottomBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

interface Props {
    courseId: string
}

export default function CartButton({ courseId }: Props) {
    const [loading, setLoading] = useState(false)
    const { addToCart, removeFromCart, isInCart } = useUserStore()
    const isInUserCart = isInCart(courseId)

    const handleToggle = () => {
        if (isInUserCart) {
            removeFromCart(courseId)
        } else {
            addToCart(courseId)
        }
    }
    // const handleCartToggle = async () => {
    //     setLoading(true)
    //     try {
    //         if (inCart) {
    //             await removeFromCart(userId, courseId)
    //             toast.success("Removed from cart")
    //         } else {
    //             await addToCart(userId, courseId)
    //             toast.success("Added to cart")
    //         }
    //         setInCart(!inCart)
    //     } catch (err) {
    //         toast.error("Failed to update cart")
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    return (
        // <button onClick={handleCartToggle} disabled={loading}>
        //     <ShoppingCartIcon />
        //     {inCart ? "Remove from Cart" : "Add to Cart"}
        // </button>
        <Button $background="#fdb913" onClick={handleToggle} disabled={loading}>
            <BottomBtn>
                <ShoppingCartIcon />
                {isInUserCart ? "Remove from Cart" : "Add to Cart"}
            </BottomBtn>
        </Button>
    )
}
