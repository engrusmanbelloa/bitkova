import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import { useState } from "react"
import { addToWishlist, removeFromWishlist } from "@/lib/firebase/queries/Wishlist"
import { useUserStore } from "@/lib/store/useUserStore"
import { toast } from "sonner"

interface Props {
    userId: string
    courseId: string
    isInWishlist: boolean
}

export default function WishlistButton({ courseId }: { courseId: string }) {
    // const [inWishlist, setInWishlist] = useState(isInWishlist)
    const { addToWishlist, removeFromWishlist, isInWishlist } = useUserStore()
    const [loading, setLoading] = useState(false)

    const isWishlisted = isInWishlist(courseId)

    const toggleWishlist = async () => {
        setLoading(true)
        try {
            if (isWishlisted) {
                removeFromWishlist(courseId)
                toast.success("Removed from wishlist")
            } else {
                addToWishlist(courseId)
                toast.success("Added to wishlist")
            }
        } catch (err) {
            toast.error("Failed to update wishlist")
        } finally {
            setLoading(false)
        }
    }

    return (
        <button onClick={toggleWishlist} disabled={loading}>
            {isWishlisted ? <BookmarkIcon style={{ color: "#1976d2" }} /> : <BookmarkBorderIcon />}
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
    )
}
