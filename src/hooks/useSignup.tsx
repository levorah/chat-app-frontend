import { useState } from "react"
import { SignupDto } from "../interface/signup.interface"
import toast from "react-hot-toast"

const useSignup = () => {
    const [loading, setLoading] = useState(false)

    const signup = async ({ fullname, username, password, confirmPassword, gender }: SignupDto) => {

        const success = handleInputErrrors({ fullname, username, password, confirmPassword, gender })
        if (!success) return
        try {
            console.log(`${import.meta.env.VITE_BACKEND_URL}/auth/signup}`,'inside signup page')
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullname, username, password, gender })
            })

            const data = await res.json()
            if (data.error)
                throw new Error(data.error)


        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, signup }
}

export default useSignup

function handleInputErrrors({ fullname, username, password, confirmPassword, gender }: SignupDto) {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all fields')
        return false
    }

    if (password !== confirmPassword) {
        toast.error('Password do not match')
        return false
    }

    if (password.length < 6) {
        toast.error('Password must be atleast 6 characters')
        return false
    }
    return true
}
