"use client"
import dynamic from "next/dynamic"
import React from "react"

// Dynamically import the Checkout component
const Checkout = dynamic(() => import("./Checkout"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
})

export default function CheckoutWrapper() {
    return <Checkout />
}
