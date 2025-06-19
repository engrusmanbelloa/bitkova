export const formatPrice = (price: number): string => {
    return price > 0 ? `₦${price.toLocaleString("en-US")}` : "Free"
}
