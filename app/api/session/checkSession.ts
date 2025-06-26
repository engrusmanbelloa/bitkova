export async function checkSessionValid() {
    const res = await fetch("/api/check-session")
    const json = await res.json()
    return json.valid
}
