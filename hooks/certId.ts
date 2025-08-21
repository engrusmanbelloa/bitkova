import { customAlphabet } from "nanoid"

// Define the alphabet to use (a-z, A-Z, 0-9)
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
export const nanoid = customAlphabet(alphabet, 9)

// const certificateId = nanoid()
// console.log(certificateId)
