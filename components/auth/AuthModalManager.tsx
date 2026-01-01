import React from "react"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import ResetPsswd from "./ResetPsswd"

interface AuthModalManagerProps {
    activeModal: "signin" | "signup" | "reset" | null
    setActiveModal: (modal: "signin" | "signup" | "reset" | null) => void
    Transition: any // Or your specific Mui transition type
}

export default function AuthModalManager({
    activeModal,
    setActiveModal,
    Transition,
}: AuthModalManagerProps) {
    if (!activeModal) return null

    return (
        <>
            {/* Modal for signup  */}
            {activeModal === "signup" && (
                <SignUp
                    open={activeModal === "signup"}
                    Transition={Transition}
                    handleClose={() => setActiveModal(null)}
                    handleSignInOpen={() => setActiveModal("signin")}
                />
            )}
            {/* Modal for signin  */}
            {activeModal === "signin" && (
                <SignIn
                    open={activeModal === "signin"}
                    Transition={Transition}
                    handleClose={() => setActiveModal(null)}
                    handleSingUpOpen={() => setActiveModal("signup")}
                    handleForgotPasswordOpen={() => setActiveModal("reset")}
                />
            )}
            {/* Reset password modal  */}
            {activeModal === "reset" && (
                <ResetPsswd
                    open={activeModal === "reset"}
                    handleClose={() => setActiveModal(null)}
                    Transition={Transition}
                />
            )}
        </>
    )
}
