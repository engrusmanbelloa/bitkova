export async function checkSessionValid() {
    const res = await fetch("/api/auth/session-check")
    const json = await res.json()
    // console.log("Session: ", res)
    return json.valid
}
