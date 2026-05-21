// hooks/search/useSearch.ts
"use client"

// export interface SearchResult {
//     id: string
//     title: string
//     subtitle: string
//     type: "course" | "physical_class" | "telegram_class"
//     image?: string
//     price?: number
//     href: string
// }

// const fetchSearchData = async (): Promise<SearchResult[]> => {
//     const [coursesSnap, physicalSnap, telegramSnap] = await Promise.all([
//         getDocs(collection(db!, "courses")),
//         getDocs(collection(db!, "physicalClasses")),
//         getDocs(collection(db!, "telegramClasses")),
//     ])

//     const courses: SearchResult[] = coursesSnap.docs.map((doc) => {
//         const d = doc.data()
//         return {
//             id: doc.id,
//             title: d.title ?? "",
//             subtitle: d.category ?? "Course",
//             type: "course",
//             image: d.image,
//             price: d.price,
//             href: `/courses/${doc.id}`,
//         }
//     })

//     const physical: SearchResult[] = physicalSnap.docs.map((doc) => {
//         const d = doc.data()
//         return {
//             id: doc.id,
//             title: d.name ?? "",
//             subtitle: `Physical · ${d.location ?? ""}`,
//             type: "physical_class",
//             price: d.price,
//             href: `/pay/physical/${doc.id}`,
//         }
//     })

//     const telegram: SearchResult[] = telegramSnap.docs.map((doc) => {
//         const d = doc.data()
//         return {
//             id: doc.id,
//             title: d.name ?? "",
//             subtitle: "Telegram Online Class",
//             type: "telegram_class",
//             price: d.price,
//             href: `/pay/telegram/${doc.id}`,
//         }
//     })

//     return [...courses, ...physical, ...telegram]
// }

// export function useSearch() {
//     const [query, setQuery] = useState("")
//     const [isOpen, setIsOpen] = useState(false)
//     const inputRef = useRef<HTMLInputElement>(null)

//     const { data: allItems = [] } = useQuery({
//         queryKey: ["searchIndex"],
//         queryFn: fetchSearchData,
//         staleTime: 10 * 60 * 1000,
//     })

//     const results =
//         query.trim().length < 2
//             ? []
//             : allItems
//                   .filter(
//                       (item) =>
//                           item.title.toLowerCase().includes(query.toLowerCase()) ||
//                           item.subtitle.toLowerCase().includes(query.toLowerCase()),
//                   )
//                   .slice(0, 8)

//     useEffect(() => {
//         const handleKey = (e: KeyboardEvent) => {
//             if (e.key === "Escape") setIsOpen(false)
//             if ((e.metaKey || e.ctrlKey) && e.key === "k") {
//                 e.preventDefault()
//                 inputRef.current?.focus()
//                 setIsOpen(true)
//             }
//         }
//         window.addEventListener("keydown", handleKey)
//         return () => window.removeEventListener("keydown", handleKey)
//     }, [])

//     return {
//         query,
//         setQuery,
//         results,
//         isOpen,
//         setIsOpen,
//         inputRef,
//         hasQuery: query.trim().length >= 2,
//     }
// }

// hooks/search/useSearch.ts
import { useState, useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase/client"

export interface SearchResult {
    id: string
    title: string
    subtitle: string
    type: "course" | "physical_class" | "telegram_class"
    image?: string
    price?: number
    href: string
}

const fetchSearchData = async (): Promise<SearchResult[]> => {
    // 1. fetch active cohort first
    const cohortSnap = await getDocs(
        query(collection(db!, "cohorts"), where("status", "==", "active")),
    )

    const activeCohortId = cohortSnap.empty ? null : cohortSnap.docs[0].id

    // 2. fetch courses (all, not cohort-scoped)
    const coursesSnap = await getDocs(collection(db!, "courses"))

    const courses: SearchResult[] = coursesSnap.docs.map((doc) => {
        const d = doc.data()
        return {
            id: doc.id,
            title: d.title ?? "",
            subtitle: d.category ?? "Course",
            type: "course",
            image: d.image,
            price: d.price,
            href: `/courses/${doc.id}`,
        }
    })

    if (!activeCohortId) return courses

    // 3. fetch only classes under the active cohort
    const [physicalSnap, telegramSnap] = await Promise.all([
        getDocs(query(collection(db!, "physicalClasses"), where("cohortId", "==", activeCohortId))),
        getDocs(query(collection(db!, "telegramClasses"), where("cohortId", "==", activeCohortId))),
    ])

    const physical: SearchResult[] = physicalSnap.docs.map((doc) => {
        const d = doc.data()
        return {
            id: doc.id,
            title: d.name ?? "",
            subtitle: `Physical · ${d.location ?? ""}`,
            type: "physical_class",
            price: d.price,
            href: "/our-hub#physical-classes",
        }
    })

    const telegram: SearchResult[] = telegramSnap.docs.map((doc) => {
        const d = doc.data()
        return {
            id: doc.id,
            title: d.name ?? "",
            subtitle: "Telegram Online Class",
            type: "telegram_class",
            price: d.price,
            href: "/our-hub#telegram-class",
        }
    })

    return [...courses, ...physical, ...telegram]
}

export function useSearch() {
    const [query, setQuery] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const { data: allItems = [] } = useQuery({
        queryKey: ["searchIndex"],
        queryFn: fetchSearchData,
        staleTime: 10 * 60 * 1000,
    })

    const results =
        query.trim().length < 2
            ? []
            : allItems
                  .filter(
                      (item) =>
                          item.title.toLowerCase().includes(query.toLowerCase()) ||
                          item.subtitle.toLowerCase().includes(query.toLowerCase()),
                  )
                  .slice(0, 8)

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false)
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                inputRef.current?.focus()
                setIsOpen(true)
            }
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [])

    return {
        query,
        setQuery,
        results,
        isOpen,
        setIsOpen,
        inputRef,
        hasQuery: query.trim().length >= 2,
    }
}
