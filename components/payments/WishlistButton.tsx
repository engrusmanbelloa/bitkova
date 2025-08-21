import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import { useState, useEffect } from "react"
import { useAuthReady } from "@/hooks/useAuthReady"
import { addToWishlistDb, removeFromWishlistDb } from "@/lib/firebase/queries/Wishlist"
import { useUserStore } from "@/lib/store/useUserStore"
import { toast } from "sonner"

export default function WishlistButton({ courseId }: { courseId: string }) {
    // const [inWishlist, setInWishlist] = useState(isInWishlist)
    const { addToWishlist, removeFromWishlist, isInWishlist } = useUserStore()
    const { user, firebaseUser, authReady, isLoadingUserDoc } = useAuthReady()
    const [loading, setLoading] = useState(false)

    const isWishlisted = isInWishlist(courseId)

    const toggleWishlist = async () => {
        setLoading(true)
        try {
            if (user && isWishlisted) {
                await removeFromWishlistDb(user.id, courseId)
                removeFromWishlist(courseId)
                toast.success("Removed from wishlist")
            } else if (user && !isWishlisted) {
                await addToWishlistDb(user.id, courseId)
                addToWishlist(courseId)
                toast.success("Added to wishlist")
            }
        } catch (err) {
            toast.error("Failed to update wishlist")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (isLoadingUserDoc || loading || !authReady) return
    }, [])

    return (
        <button onClick={toggleWishlist} disabled={loading}>
            {isWishlisted ? <BookmarkIcon style={{ color: "#1976d2" }} /> : <BookmarkBorderIcon />}
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
    )
}
