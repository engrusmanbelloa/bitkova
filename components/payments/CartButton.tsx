"use client"
import React, { useState, useEffect } from "react"
import { useAuthReady } from "@/hooks/useAuthReady"
import styled from "styled-components"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { toast } from "sonner"
import { addToCartDb, removeFromCartDb } from "@/lib/firebase/queries/cart"
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
    const { user, firebaseUser, authReady, isLoadingUserDoc } = useAuthReady()
    const [loading, setLoading] = useState(false)
    const { addToCart, removeFromCart, isInCart, isEnrolled } = useUserStore()
    const isInUserCart = isInCart(courseId)
    const isUserEnrolled = isEnrolled(courseId)

    const handleCartToggle = async () => {
        setLoading(true)
        // try {
        //     if (user && isInUserCart) {
        //         if (isUserEnrolled) {
        //             toast.error("You are already enrolled in this course!")
        //             return // Exit the function
        //         }
        //         await removeFromCartDb(user.id, courseId)
        //         removeFromCart(courseId)
        //         toast.success("Removed from wishlist")
        //     } else if (user && !isInUserCart) {
        //         await addToCartDb(user.id, courseId)
        //         addToCart(courseId)
        //         toast.success("Added to wishlist")
        //     }
        // } catch (err) {
        //     toast.error("Failed to update wishlist")
        // } finally {
        //     setLoading(false)
        // }
        setLoading(true)
        try {
            if (user) {
                // If the user is already enrolled, show an error and do nothing else
                if (isUserEnrolled) {
                    toast.error("You are already enrolled in this course!")
                    return // Exit the function
                }

                // If not enrolled, proceed with adding/removing from cart
                if (isInUserCart) {
                    await removeFromCartDb(user.id, courseId)
                    removeFromCart(courseId)
                    toast.success("Removed from cart")
                } else {
                    await addToCartDb(user.id, courseId)
                    addToCart(courseId)
                    toast.success("Added to cart")
                }
            } else {
                toast.error("Please log in to add courses to your cart.")
            }
        } catch (err) {
            toast.error("Failed to update cart")
        } finally {
            setLoading(false)
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
        <Button $background="#fdb913" onClick={handleCartToggle} disabled={loading}>
            <BottomBtn>
                <ShoppingCartIcon />
                {isInUserCart ? "Remove from Cart" : "Add to Cart"}
            </BottomBtn>
        </Button>
    )
}
